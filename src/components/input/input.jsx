import React from 'react'

import styles from './input.module.scss'

function Input({ placeHolder, onChange, className }) {
	return (
		<div className={className}>
			<input
				className={`input ${styles.input}`}
				type='text'
				placeholder={placeHolder}
				onChange={onChange}
			/>
		</div>
	)
}

export default Input
