import React, { useState } from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Input from '../components/input/input'
import Filter from '../components/filter/filter'
import ItemCardList from '../components/item-card-list/item-card-list'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import getCategoryDisplay from '../utils/getCategoryDisplay'

function Items({ data }) {
	const [category, setCategory] = useState('')
	const [search, setSearch] = useState('')

	const handleInput = e => {
		setSearch(e.target.value)
	}

	const handleFilter = e => {
		setCategory(e.target.value)
	}

	if (!data.allItem.nodes.length) {
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

	const filteredItems = data.allItem.nodes.filter(item => (category === '' || item.category === category) && item.name.includes(search.toLowerCase()))

	return (
		<Layout>
			<SEO title='Items' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>
					{category ? getCategoryDisplay(category) : 'Items'}
				</h1>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
				/>
				<div className='columns'>
					<div className='column is-two-thirds'>
						<Input
							placeHolder='Search items...'
							onChange={handleInput}
							icon={faSearch}
						/>
					</div>
					<div className='column'>
						<Filter
							onChange={handleFilter}
							data={[
								{
									display: 'All Items',
									value: ''
								},
								{
									display: 'Ranged Weapons',
									value: 'Ranged'
								},
								{
									display: 'Melee Weapons',
									value: 'Melee'
								},
								{
									display: 'Ammunition',
									value: 'Ammo'
								},
								{
									display: 'Usable Items',
									value: 'Item'
								},
								{
									display: 'Storage Containers',
									value: 'Storage'
								},
								{
									display: 'Materials',
									value: 'Material'
								},
								{
									display: 'Banners',
									value: 'Banner'
								}
							]}
						/>
					</div>
				</div>
				<ItemCardList items={filteredItems} />
				{
					!filteredItems.length &&
					<h2 className='title is-5 has-text-centered'>No items found!</h2>
				}
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		allItem(sort: { fields: name, order: ASC } ) {
			nodes {
				name
				category
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxWidth: 64) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
		markdownRemark(fileAbsolutePath: { regex: "/items/" }) {
            html
		}
	}
`

export default Items
