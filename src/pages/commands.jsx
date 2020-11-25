import React, { useState } from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Command from '../components/commands/command'
import CommandFilters from '../components/commands/command-filters'
import Input from '../components/input/input'
import Twemoji from '../components/twemoji'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Commands({ data }) {
	const [category, setCategory] = useState('items')
	const [search, setSearch] = useState('')

	const handleInput = e => {
		setCategory(null)

		setSearch(e.target.value)
	}

	const filteredCommands = data.allCommand.nodes.filter(node => node.category === category || (category === null && (node.name.includes(search) || node.description.toLowerCase().includes(search))))

	return (
		<Layout>
			<SEO title='Commands' />
			<section className='section container'>
				<div className='columns is-desktop'>
					<div className='column is-one-third-desktop'>
						<CommandFilters
							category={category}
							setCategory={setCategory}
						/>
					</div>
					<div className='column is-two-thirds-desktop'>
						<Input
							placeHolder='Search commands...'
							onChange={handleInput}
							icon={faSearch}
							className='mb-2'
						/>
						{
							filteredCommands.map(node => (
								<Command
									name={node.name}
									description={node.description}
									usage={node.usage}
									patronOnly={node.patronOnly}
									key={node.name}
								/>
							))
						}
						{
							!data.allCommand.nodes.length &&
							<h1 className='title is-3 has-text-centered'>
								<div style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}>
									<Twemoji emoji='😳' />
								</div>
								Commands are not available at this time. Notify blobfysh#4679 on Discord if you see him!
							</h1>
						}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
        allCommand(
			sort: { fields: name, order: ASC }
		) {
            nodes {
                category
                usage
                patronOnly
                name
                description
            }
        }
	}
`

export default Commands
