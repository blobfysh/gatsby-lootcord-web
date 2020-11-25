import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import ItemCardList from '../components/item-card-list/item-card-list'

function Items({ data }) {
	if (!data.items.nodes.length) {
		return (
			<Layout>
				<SEO title='Items' />
				<section className='section container'>
					<h1 className='title is-uppercase has-text-centered'>
						Failed to fetch items :(
					</h1>
				</section>
			</Layout>
		)
	}

	return (
		<Layout>
			<SEO title='Items' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>
					All Items
				</h1>
				<h2 className='title mt-6 is-5 has-text-centered'>
					Ranged Weapons
				</h2>
				<ItemCardList items={data.ranged.nodes} />
				<h2 className='title mt-6 is-5 has-text-centered'>
					Melee Weapons
				</h2>
				<ItemCardList items={data.melee.nodes} />
				<h2 className='title mt-6 is-5 has-text-centered'>
					Ammunition
				</h2>
				<ItemCardList items={data.ammo.nodes} />
				<h2 className='title mt-6 is-5 has-text-centered'>
					Usable Items
				</h2>
				<ItemCardList items={data.items.nodes} />
				<h2 className='title mt-6 is-5 has-text-centered'>
					Storage Containers
				</h2>
				<ItemCardList items={data.storage.nodes} />
				<h2 className='title mt-6 is-5 has-text-centered'>
					Materials
				</h2>
				<ItemCardList items={data.materials.nodes} />
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		ranged: allItem(filter: { category: { eq: "Ranged" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
        }
        melee: allItem(filter: { category: { eq: "Melee" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
        }
        ammo: allItem(filter: { category: { eq: "Ammo" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
        }
        items: allItem(filter: { category: { eq: "Item" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
        }
        storage: allItem(filter: { category: { eq: "Storage" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
        }
        materials: allItem(filter: { category: { eq: "Material" } }, sort: { fields: name, order: ASC } ) {
			nodes {
				name
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxHeight: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`

export default Items
