import React from 'react'

import ItemCard from '../item-card/item-card'
import styles from './item-card-list.module.scss'

function ItemCardList({ items }) {
	return (
		<div className={styles.list}>
			{items.map(item => (
				<ItemCard
					key={item.name}
					name={item.name}
					image={item.image}
				/>
			))}
		</div>
	)
}

export default ItemCardList
