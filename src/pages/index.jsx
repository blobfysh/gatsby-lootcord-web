import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import HomePost from '../components/home-post/home-post'
import SlideIn from '../components/slide-in/slide-in'
import Hero from '../components/hero/hero'
import Leaderboard from '../components/leaderboard/leaderboard'

function HeroText() {
	return <div>A <span style={{ color: '#cd412b' }}>Rust</span> themed fighting and looting bot for <span className='blurple'>Discord</span></div>
}

function HeroButtons() {
	return [
		<React.Fragment>
			<a
				href='https://discord.com/oauth2/authorize?client_id=493316754689359874&permissions=388160&scope=bot%20applications.commands'
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
			<svg viewBox='0 0 1219 132' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
				<path fill='var(--nav-bg-color)' d='M 0 0 C 221 0 221 25 442 25 L 442 75 L 442 0 L 0 0 Z' stroke-width='0'></path>
				<path fill='var(--nav-bg-color)' d='M 441 25 C 641 25 641 1 841 1 L 841 1 L 841 0 L 441 0 Z' stroke-width='0'></path>
				<path fill='var(--nav-bg-color)' d='M 840 1 C 1029.5 1 1029.5 25 1219 25 L 1219 75 L 1219 0 L 840 0 Z' stroke-width='0'></path>
			</svg>
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
		file(relativePath: { eq: "lootcord_scarecrow.png" }) {
			childImageSharp {
				fixed(height: 300, width: 300) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`

export default Home
