module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.example.com',
		title: 'Lootcord',
		description: 'A Rust themed fighting and looting bot for Discord.',
		author: 'blobfysh'
	},
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blog',
				path: `${__dirname}/content/blog`
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 600
						}
					},
					'gatsby-remark-autolink-headers',
					'gatsby-remark-prismjs'
				]
			}
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Lootcord',
				short_name: 'Lootcord',
				start_url: '/',
				background_color: '#cd412b',
				theme_color: '#cd412b',
				display: 'minimal-ui',
				icon: 'src/images/icon.png'
			}
		}
	]
}
