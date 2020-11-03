const path = require('path')
const axios = require('axios')
const {
	createFilePath,
	createRemoteFileNode
} = require('gatsby-source-filesystem')

exports.onCreateNode = async ({
	node,
	getNode,
	actions,
	store,
	cache,
	createNodeId
}) => {
	const { createNodeField, createNode } = actions

	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode })
		createNodeField({
			node,
			name: 'slug',
			value: slug
		})
	}
	else if (node.internal.type === 'LeaderboardUser') {
		// Create image file nodes using avatar urls, optimizes images
		const fileNode = await createRemoteFileNode({
			url: node.user.avatarURL,
			parentNodeId: node.id,
			createNode,
			createNodeId,
			cache,
			store
		})

		if (fileNode) {
			node.user.avatar___NODE = fileNode.id
		}
	}
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const result = await graphql(`
		query {
			allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`)

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: `/blog${node.fields.slug}`,
			component: path.resolve('./src/templates/blog-post.jsx'),
			context: {
				// Data passed to context is available
				// in page queries as GraphQL variables.
				slug: node.fields.slug
			}
		})
	})
}

exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest
}) => {
	const { createNode } = actions
	let data

	if (process.env.LOOTCORD_API) {
		const res = await axios(
			{
				method: 'POST',
				headers: {
					'Authorization': process.env.LOOTCORD_API_AUTH,
					'Content-Type': 'application/json'
				},
				url: `${process.env.LOOTCORD_API}/api/leaderboard`
			},
			{
				timeout: 5000
			}
		)

		data = res.data
	}

	if (data) {
		// Create LeaderboardUser nodes using leaderboard data
		Object.keys(data).forEach(type => {
			Object.keys(data[type]).forEach(user => {
				const lbData = {
					user,
					value: data[type][user].data.toString(),
					avatar: data[type][user].avatar
				}

				const nodeContent = JSON.stringify(lbData)

				const userNode = {
					id: createNodeId(`${type}-${user}`),
					parent: null,
					children: [],
					internal: {
						type: 'LeaderboardUser',
						contentDigest: createContentDigest(nodeContent)
					},
					lbType: type,
					user: {
						tag: user,
						avatarURL: lbData.avatar
					},
					value: lbData.value
				}

				createNode(userNode)
			})
		})
	}
}

// graphql schema definitions to prevent errors when no LeaderboardUser nodes are created (this can happen if there's no response from the lootcord api)
exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions
	const typeDefs = `
		type User {
			tag: String!
			avatarURL: String!
			avatar: File @link(from: "avatar___NODE")
		}
		type LeaderboardUser implements Node {
			lbType: String!
			user: User
			value: String!
		}
	`

	createTypes(typeDefs)
}
