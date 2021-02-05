import React, { useState } from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Input from '../components/input/input'
import ItemCardList from '../components/item-card-list/item-card-list'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Enemies({ data }) {
	const [search, setSearch] = useState('')

	const handleInput = e => {
		setSearch(e.target.value)
	}

	if (!data.allMonster.nodes.length) {
		return (
			<Layout>
				<SEO title='Enemy Spawns' />
				<section className='section container'>
					<h1 className='title is-uppercase has-text-centered'>
						Failed to fetch enemies :(
					</h1>
				</section>
			</Layout>
		)
	}

	const filteredEnemies = data.allMonster.nodes.filter(enemy => enemy.name.includes(search.toLowerCase()))

	return (
		<Layout>
			<SEO title='Enemy Spawns' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>
					Enemies
				</h1>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
				/>
				<div className='columns'>
					<div className='column'>
						<Input
							placeHolder='Search enemies...'
							onChange={handleInput}
							icon={faSearch}
						/>
					</div>
				</div>
				<ItemCardList items={filteredEnemies} enemies />
				{
					!filteredEnemies.length &&
					<h2 className='title is-5 has-text-centered'>No enemies found!</h2>
				}
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMonster(sort: { fields: name, order: ASC } ) {
			nodes {
				name: rawName
				image {
					extension
					publicURL
					childImageSharp {
						fluid(maxWidth: 128) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
		markdownRemark(fileAbsolutePath: { regex: "/enemies/" }) {
            html
		}
	}
`

export default Enemies
