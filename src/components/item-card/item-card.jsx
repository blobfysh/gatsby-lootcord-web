import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './item-card.module.scss'

function ItemCard({ name, image, enemy }) {
	if (!image) {
		return null
	}

	return (
		<div className={`${styles.itemCard} ${enemy && styles.enemyCard}`}>
			<Link to={enemy ? `/enemy/${name}` : `/item/${name}`} className={`${styles.innerCard}`}>
				<div className={enemy ? styles.enemyImage : styles.imageContainer}>
					{
						image.extension !== 'gif' ?
							<Img
								fluid={image.childImageSharp.fluid}
								alt=''
								draggable={false}
							/> :
							<img
								src={image.publicURL}
								alt=''
								draggable='false'
							/>
					}
				</div>
				<span className={styles.name}>{enemy ? name.split('_').map(part => part[0].toUpperCase() + part.slice(1)).join(' ') : name.split('_').join(' ')}</span>
			</Link>
		</div>
	)
}

ItemCard.propTypes = {
	name: PropTypes.string,
	image: PropTypes.object
}

export default ItemCard
