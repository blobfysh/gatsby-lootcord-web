import React from 'react'

import Img from 'gatsby-image'
import styles from './home-post.module.scss'

function HomePost({ title, image, text, index }) {
	return (
		<div className={`${styles.post} ${index % 2 ? styles.reverseWrap : styles.wrap}`}>
			<div className={styles.content}>
				<h1 className={`title is-2 ${styles.title}`}>{title}</h1>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: text }}
				></div>
			</div>
			<div className={styles.image}>
				<Img fluid={image} alt='' />
			</div>
		</div>
	)
}

export default HomePost
