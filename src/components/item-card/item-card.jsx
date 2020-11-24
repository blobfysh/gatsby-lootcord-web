import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './item-card.module.scss'

function ItemCard({ name, image }) {
	if (!image) {
		return null
	}

	return (
		<div className={styles.itemCard}>
			<Link to={`/item/${name}`} className={`${styles.innerCard}`}>
				<div className={styles.imageContainer}>
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
				<span className={styles.name}>{name.split('_').join(' ')}</span>
			</Link>
		</div>
	)
}

ItemCard.propTypes = {
	name: PropTypes.string,
	image: PropTypes.object
}

export default ItemCard
