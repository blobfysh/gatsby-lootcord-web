import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import ItemInfo from '../components/item-info/item-info'

function Item({ data }) {
	return (
		<Layout>
			<SEO title={data.item.name} />
			<section className='section container'>
				<ItemInfo
					item={data.item}
					ammoFor={data.ammoFor.nodes}
					usedToCraft={data.usedToCraft.nodes}
					recyclesFrom={data.recyclesFrom.nodes}
					obtainedFrom={data.obtainedFrom.nodes}
					obtainedFromMonsters={[
						...data.obtainedFromEnemiesMain.nodes,
						...data.obtainedFromEnemiesExtras.nodes.filter(node => !data.obtainedFromEnemiesMain.nodes.some(mainNode => mainNode.name === node.name))
					]}
				/>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($item: String!) {
		item(name: { eq: $item }) {
			name
			category
			tier
			sell
			buy {
				price
				currency
			}
			maxDamage
			minDamage
			bleedDamage
			burnDamage
			damage
			description
			cooldown
			ammo {
				damage
				item {
					name
					bleedDamage
					burnDamage
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
			craftedWith {
				materials {
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
			recyclesTo {
				materials {
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
			possibleItems {
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
		ammoFor: allItem(filter: {ammo: {elemMatch: {item: {name: {eq: $item}}}}}) {
			nodes {
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
		usedToCraft: allItem(filter: {craftedWith: {materials: {elemMatch: {item: {name: {eq: $item}}}}}}) {
			nodes {
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
		recyclesFrom: allItem(filter: {recyclesTo: {materials: {elemMatch: {item: {name: {eq: $item}}}}}}) {
			nodes {
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
		obtainedFrom: allItem(filter: {possibleItems: {elemMatch: {item: {name: {eq: $item}}}}}) {
			nodes {
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
		obtainedFromEnemiesMain: allMonster(filter: {loot: {main: {elemMatch: {item: {name: {eq: $item}}}}}}) {
			nodes {
				name: rawName
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
		obtainedFromEnemiesExtras: allMonster(filter: {loot: {extras: {elemMatch: {item: {name: {eq: $item}}}}}}) {
			nodes {
				name: rawName
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
`

export default Item
