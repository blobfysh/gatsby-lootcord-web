import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './switch.module.scss'

function Switch({ checked, onChange, text }) {
	const [isChecked, setChecked] = useState(false)
	const [hasOutline, setOutline] = useState(false)

	const handleChange = e => {
		onChange(e.target.checked)
		setChecked(e.target.checked)
	}

	useEffect(() => {
		setChecked(checked)
	}, [checked])

	return (
		<label className={styles.switchWrap}>
			{
				text &&
				<span className={styles.switchText}>{text}</span>
			}
			<div className={styles.switch}>
				<div
					className={`${styles.switchHandle} ${isChecked ? styles.isChecked : ''} ${hasOutline ? styles.inputOutline : ''}`}
				/>
				<input
					role='switch'
					type='checkbox'
					defaultChecked={isChecked}
					onChange={handleChange}
					onFocus={() => { setOutline(true) }}
					onBlur={() => { setOutline(false) }}
					className={styles.switchInput}
				/>
			</div>
		</label>
	)
}

Switch.defaultProps = {
	checked: false,
	// eslint-disable-next-line no-empty-function
	onChange: () => {}
}

Switch.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	text: PropTypes.string
}

export default Switch
