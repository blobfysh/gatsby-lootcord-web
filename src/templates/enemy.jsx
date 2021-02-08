import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import EnemyInfo from '../components/enemy-info/enemy-info'

function Enemy({ data }) {
	return (
		<Layout>
			<SEO title={data.monster.name} />
			<section className='section container'>
				<EnemyInfo
					enemy={data.monster}
				/>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($enemy: String!) {
		monster(rawName: { eq: $enemy }) {
			name
			special
			minDamage
			maxDamage
			minMoney
			maxMoney
			weapon {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 175) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
			ammo {
				name
			}
			staysFor
			xp
			health
			loot {
				main {
					rate
					amount
					item {
						name
						image {
							extension
							publicURL
							childImageSharp {
								fluid(maxHeight: 175) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
				extras {
					rate
					amount
					item {
						name
						image {
							extension
							publicURL
							childImageSharp {
								fluid(maxHeight: 175) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
			image {
				extension
				publicURL
				childImageSharp {
					fluid(maxHeight: 175) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	}
`

export default Enemy
