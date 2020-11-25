import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import ItemCardList from '../components/item-card-list/item-card-list'

function getCategoryDisplay(category) {
	switch (category) {
		case 'Ammo': return 'Ammunition'
		case 'Banner': return 'Banners'
		case 'Material': return 'Materials'
		case 'Melee': return 'Melee Weapons'
		case 'Ranged': return 'Ranged Weapons'
		case 'Item': return 'Usable Items'
		case 'Storage': return 'Storage Containers'
		default: return ''
	}
}
function Category({ data, pageContext }) {
	return (
		<Layout>
			<SEO title={getCategoryDisplay(pageContext.category)} />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>
					{getCategoryDisplay(pageContext.category)}
				</h1>
				<ItemCardList items={data.allItem.nodes} />
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($category: String!) {
		allItem(filter: { category: { eq: $category } }, sort: { fields: name, order: ASC } ) {
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

export default Category
