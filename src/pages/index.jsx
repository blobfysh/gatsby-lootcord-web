import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import HomePost from '../components/home-post/home-post'
import SlideIn from '../components/slide-in/slide-in'
import Hero from '../components/hero/hero'
import Leaderboard from '../components/leaderboard/leaderboard'

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
				{data.allMarkdownRemark.nodes.map((node, i) => (
					<SlideIn slideInRight={!!(i % 2)} key={node.id}>
						<HomePost
							title={node.frontmatter.title}
							image={node.frontmatter.image.childImageSharp.fluid}
							text={node.html}
							index={i}
						/>
					</SlideIn>
				))}
				<Leaderboard title='Top Looters'/>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/home-posts/" } }
			sort: { fields: frontmatter___order, order: ASC }
		) {
			nodes {
				id
				html
				frontmatter {
					title
					image {
						childImageSharp {
							fluid(maxWidth: 500) {
								...GatsbyImageSharpFluid
							}
						}
					}
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
