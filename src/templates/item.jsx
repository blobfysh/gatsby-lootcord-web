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
			buy
			maxDamage
			minDamage
			damage
			description
			ammo {
				damage
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
				xp
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
	}
`

export default Item
