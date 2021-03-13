import React from 'react'
import PropTypes from 'prop-types'
import styles from './banner.module.scss'

function Banner({ text }) {
	return (
		<div className={`${styles.banner} has-text-centered has-text-weight-semibold`}>
			<span>{text}</span>
		</div>
	)
}

Banner.propTypes = {
	text: PropTypes.node
}

export default Banner
