import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styles from './hero.module.scss'

function Hero({ image, text, buttons, hasBackground }) {
	return (
		<div className={`hero ${styles.heroStyle} ${hasBackground ? styles.heroBg : null}`}>
			{
				image && (
					<Img
						fixed={image}
						alt=''
						draggable={false}
						className={styles.image}
					/>
				)
			}
			{
				text &&
				<div className={styles.heroText}>{text}</div>
			}
			{buttons && buttons.map((button, i) => (
				<div className={styles.buttons} key={i}>
					{button}
				</div>
			))}
		</div>
	)
}

Hero.defaultProps = {
	hasBackground: true
}

Hero.propTypes = {
	image: PropTypes.object,
	text: PropTypes.node,
	buttons: PropTypes.arrayOf(PropTypes.node),
	hasBackground: PropTypes.bool
}

export default Hero
