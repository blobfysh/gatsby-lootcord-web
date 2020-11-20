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
	else if (node.internal.type === 'LeaderboardUser' || node.internal.type === 'Patron') {
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
			guides: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/guides/" } }) {
				nodes {
					fields {
						slug
					}
				}
			}
		}
	`)

	result.data.guides.nodes.forEach(node => {
		createPage({
			path: `/guides${node.fields.slug}`,
			component: path.resolve('./src/templates/guide.jsx'),
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
	let leaderboard
	let commands
	let patrons

	if (process.env.LOOTCORD_API) {
		try {
			const lbRes = await axios(
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

			leaderboard = lbRes.data
		}
		catch (err) {
			// continue
		}

		try {
			const commandsRes = await axios(
				{
					method: 'POST',
					headers: {
						'Authorization': process.env.LOOTCORD_API_AUTH,
						'Content-Type': 'application/json'
					},
					url: `${process.env.LOOTCORD_API}/api/commands`
				},
				{
					timeout: 5000
				}
			)

			commands = commandsRes.data
		}
		catch (err) {
			// continue
		}

		try {
			const patronsRes = await axios(
				{
					method: 'POST',
					headers: {
						'Authorization': process.env.LOOTCORD_API_AUTH,
						'Content-Type': 'application/json'
					},
					url: `${process.env.LOOTCORD_API}/api/patrons`
				},
				{
					timeout: 5000
				}
			)

			patrons = patronsRes.data
		}
		catch (err) {
			// continue
		}
	}

	if (leaderboard) {
		// Create LeaderboardUser nodes using leaderboard data
		let type
		let user
		for (type in leaderboard) {
			for (user in leaderboard[type]) {
				const lbData = {
					user,
					value: leaderboard[type][user].data.toString(),

					// TODO fix the lootcord api to NOT return formatted data so I dont have to do this...
					rawValue: parseInt(leaderboard[type][user].data.toString().replace(/,/g, '')),
					avatar: leaderboard[type][user].avatar
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

	if (commands) {
		let command
		for (command of commands.filter(cmd => cmd.category !== 'admin' && cmd.category !== 'moderation')) {
			const nodeContent = JSON.stringify(command)

			const cmdNode = {
				id: createNodeId(command.command),
				parent: null,
				children: [],
				internal: {
					type: 'Command',
					contentDigest: createContentDigest(nodeContent)
				},
				name: command.command,
				patronOnly: command.patronOnly,
				description: command.shortDesc,
				category: command.category,
				usage: command.usage
			}

			createNode(cmdNode)
		}
	}

	if (patrons) {
		let user
		for (user in patrons) {
			const patronData = {
				user,
				tier: patrons[user].tier,
				avatar: patrons[user].avatar
			}

			try {
				await axios.get(patronData.avatar)
			}
			catch (err) {
				// avatar must have been changed recently and needs to be cached again...

				// use default avatar as placeholder
				patronData.avatar = 'https://cdn.discordapp.com/embed/avatars/0.png'
			}

			const nodeContent = JSON.stringify(patronData)

			const patronNode = {
				id: createNodeId(`${user}-${patronData.tier}`),
				parent: null,
				children: [],
				internal: {
					type: 'Patron',
					contentDigest: createContentDigest(nodeContent)
				},
				user: {
					tag: user,
					avatarURL: patronData.avatar
				},
				tier: patronData.tier
			}

			createNode(patronNode)
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
		type Command implements Node {
			name: String!
			patronOnly: Boolean
			description: String!
			category: String!
			usage: String!
		}
		type Patron implements Node {
			user: User
			tier: Int
		}
	`

	createTypes(typeDefs)
}
