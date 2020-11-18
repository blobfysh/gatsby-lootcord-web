import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './input.module.scss'

function Input({ placeHolder, onChange, className }) {
	return (
		<div className={`control has-icons-left ${className}`}>
			<input
				className={`input ${styles.input}`}
				type='text'
				placeholder={placeHolder}
				onChange={onChange}
			/>
			<span className='icon is-left'>
				<FontAwesomeIcon icon={faSearch} />
			</span>
		</div>
	)
}

export default Input
