import React from 'react'
import Img from 'gatsby-image'
import styles from './hero.module.scss'

function Hero({ image, text, buttons }) {
	return (
		<div className={`hero ${styles.heroStyle}`}>
			{
				image && (
					<Img
						fixed={image}
						alt=''
						draggable='false'
						className={styles.image}
					/>
				)
			}
			{
				text &&
				<div className={styles.heroText}>{text}</div>
			}
			{buttons && buttons.map(button => (
				<div className={styles.buttons}>
					{button}
				</div>
			))}
		</div>
	)
}

export default Hero
