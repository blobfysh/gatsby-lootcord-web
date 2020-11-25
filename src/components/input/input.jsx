import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './input.module.scss'

function Input({ placeHolder, onChange, className, refVal, icon, iconIsRight }) {
	return (
		<div className={`control ${icon && (iconIsRight ? 'has-icons-right' : 'has-icons-left')}`}>
			<input
				className={`input ${styles.input} ${className}`}
				type='text'
				placeholder={placeHolder}
				onChange={onChange}
				ref={refVal || null}
			/>
			{
				icon &&
				<span className={`icon ${iconIsRight ? 'is-right' : 'is-left'}`}>
					<FontAwesomeIcon icon={icon} />
				</span>
			}
		</div>
	)
}

Input.defaultProps = {
	placeHolder: '',
	// eslint-disable-next-line no-empty-function
	onChange: () => {},
	className: '',
	refVal: null,
	icon: null,
	iconIsRight: false
}

Input.propTypes = {
	placeHolder: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	refVal: PropTypes.object,
	icon: PropTypes.object,
	iconIsRight: PropTypes.bool
}

export default Input
