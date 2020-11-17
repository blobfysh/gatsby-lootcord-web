import React from 'react'

import styles from './command-filters.module.scss'
import FilterTag from './filter-tag'

function CommandFilters({ category, setCategory }) {
	return (
		<div className={styles.filtersWrap}>
			<strong>Categories:</strong>
			<div className={styles.categoryTags}>
				<FilterTag
					setCategory={setCategory}
					label='Item Usage'
					category='items'
					emoji='⚔️'
					isSelected={category === 'items'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Free Loot'
					category='rewards'
					emoji='🎉'
					isSelected={category === 'rewards'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Gambling'
					category='games'
					emoji='🎲'
					isSelected={category === 'games'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Information/Stats'
					category='info'
					emoji='📋'
					isSelected={category === 'info'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Blackmarket'
					category='blackmarket'
					emoji='💰'
					isSelected={category === 'blackmarket'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Settings'
					category='utilities'
					emoji='⚙️'
					isSelected={category === 'utilities'}
				/>
				<FilterTag
					setCategory={setCategory}
					label='Other'
					category='other'
					emoji='📈'
					isSelected={category === 'other'}
				/>
			</div>
		</div>
	)
}

export default CommandFilters
