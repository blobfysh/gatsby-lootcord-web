import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Twemoji from '../components/twemoji'
import CardList from '../components/card-list/card-list'

function sortUsers(a, b) {
	const nameA = a.name.toLowerCase()
	const nameB = b.name.toLowerCase()

	if (nameA < nameB) return -1
	if (nameA > nameB) return 1

	return 0
}

function About({ data }) {
	const devs = data.markdownRemark.frontmatter.developers.sort(sortUsers)
	const artists = data.markdownRemark.frontmatter.artists.sort(sortUsers)
	const mods = data.markdownRemark.frontmatter.moderators.sort(sortUsers)

	return (
		<Layout>
			<SEO title='About' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>{data.markdownRemark.frontmatter.title}</h1>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
				/>
				<h1 className='title is-uppercase has-text-centered'>Who's Responsible?!</h1>
				<CardList title='Developer' users={devs} />
				<CardList title='Artists' users={artists} />
				<CardList title='Moderators' users={mods} />

				{
					!!data.allPatron.nodes.length &&
					<CardList
						title={(
							<React.Fragment>
								<Twemoji emoji='💖' />
								Lovely Supporters
							</React.Fragment>
						)}
						users={data.allPatron.nodes}
					/>
				}
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
            html
            frontmatter {
                title
				developers {
					name
					socials {
						steam
						github
						spotify
					}
                    image {
                        publicURL
                        extension
                        childImageSharp {
                            fixed(height: 128, width: 128) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
                artists {
					name
					socials {
						youtube
						twitter
						instagram
					}
                    image {
						publicURL
						extension
                        childImageSharp {
                            fixed(height: 128, width: 128) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
				}
				moderators {
					name
					socials {
						youtube
						twitter
						steam
						spotify
					}
                    image {
						publicURL
						extension
                        childImageSharp {
                            fixed(height: 128, width: 128) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
			}
		}
		allPatron(sort: {fields: user___tag, order: ASC}) {
			nodes {
				user {
					tag
					avatar {
						publicURL
						extension
						childImageSharp {
							fixed(height: 128, width: 128) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
		}
	}
`

export default About
