import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Post from '../components/post/post'
import Hero from '../components/hero/hero'

function HeroText() {
	return <div>A <span className='rustyred'>Rust</span> themed fighting and looting bot for <span className='blurple'>Discord</span></div>
}

function HeroButtons() {
	return [
		<React.Fragment>
			<a
				href='https://discordapp.com/oauth2/authorize?client_id=493316754689359874&amp;permissions=388160&amp;scope=bot'
				target='_blank'
				rel='noopener noreferrer'
				className='button is-primary is-large'
			>
				Invite
			</a>
			<a
				href='https://discord.gg/apKSxuE'
				target='_blank'
				rel='noopener noreferrer'
				className='button is-dark is-large'
			>
				Discord Server
			</a>
		</React.Fragment>
	]
}

function Home({ data }) {
	return (
		<Layout>
			<SEO />
			<Hero
				text={HeroText()}
				image={data.file.childImageSharp.fixed}
				buttons={HeroButtons()}
			/>
			<section className='section container'>
				<h1 className='title'>Welcome to My Blog</h1>
				<h2 className='subtitle'>{data.allMarkdownRemark.totalCount} Posts</h2>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<Post
						title={node.frontmatter.title}
						slug={`/blog${node.fields.slug}`}
						image={node.frontmatter.image.childImageSharp.fixed}
						date={node.frontmatter.date}
						excerpt={node.excerpt}
						key={node.id}
					/>
				))}
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/blog/" } }
			sort: { fields: frontmatter___date, order: DESC }
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
						image {
							childImageSharp {
								fixed(height: 100) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
					fields {
						slug
					}
					excerpt
				}
			}
		}
		file(relativePath: { eq: "lootcord_icon_small.png" }) {
			childImageSharp {
				fixed(height: 300, width: 300) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`

export default Home
