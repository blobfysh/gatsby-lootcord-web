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
		try {
			const fileNode = await createRemoteFileNode({
				url: `${node.user.avatarURL}`,
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
		catch (err) {
			console.error(err)
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
		try {
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
		catch (err) {
			// continue
		}
	}

	if (data) {
		// Create LeaderboardUser nodes using leaderboard data
		let type
		let user
		for (type in data) {
			for (user in data[type]) {
				const lbData = {
					user,
					value: data[type][user].data.toString(),

					// TODO fix the lootcord api to NOT return formatted data so I dont have to do this...
					rawValue: parseInt(data[type][user].data.toString().replace(/,/g, '')),
					avatar: data[type][user].avatar
				}

				try {
					await axios.get(lbData.avatar)
				}
				catch (err) {
					// avatar must have been changed recently and needs to be cached again...

					// use default avatar as placeholder
					lbData.avatar = 'https://cdn.discordapp.com/embed/avatars/0.png'
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
					value: lbData.value,
					rawValue: lbData.rawValue
				}

				createNode(userNode)
			}
		}
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
			rawValue: Int
		}
	`

	createTypes(typeDefs)
}
