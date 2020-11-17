import React from 'react'

import Twemoji from '../twemoji'
import styles from './filter-tag.module.scss'

function FilterTag({ setCategory, label, emoji, category, isSelected }) {
	return (
		<button
			className={`${styles.tagButton} ${isSelected ? styles.selected : ''}`}
			onClick={() => { setCategory(category) }}
		>
			<Twemoji emoji={emoji} className={styles.emoji} />
			<strong>{label}</strong>
		</button>
	)
}

export default FilterTag
