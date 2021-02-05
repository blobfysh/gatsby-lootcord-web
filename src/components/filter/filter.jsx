import React from 'react'
import PropTypes from 'prop-types'
import styles from './filter.module.scss'

function Filter({ data, onChange, className }) {
	return (
		<div className={`select ${styles.select} ${className}`}>
			<select onChange={onChange} className={styles.select}>
				{data.map(opt => (
					<option key={opt.value} value={opt.value}>{opt.display}</option>
				))}
			</select>
		</div>
	)
}

Filter.defaultProps = {
	data: [],
	// eslint-disable-next-line no-empty-function
	onChange: () => {},
	className: ''
}

Filter.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		display: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	})).isRequired,
	onChange: PropTypes.func,
	className: PropTypes.string
}

export default Filter
