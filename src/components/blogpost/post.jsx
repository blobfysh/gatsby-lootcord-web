import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './post.module.scss'

import SlideIn from '../slide-in/slide-in'

function Post({ title, date, image, excerpt, slug }) {
	return (
		<SlideIn>
			<Link to={slug}>
				<div className={styles.postContainer}>
					<div className={styles.image}>
						<Img fixed={image} alt='' />
					</div>
					<div>
						<h4 className='title is-4'>{title}</h4>
						<h5 className='subtitle is-6'>{date}</h5>
						<p>{excerpt}</p>
					</div>
				</div>
			</Link>
		</SlideIn>
	)
}

export default Post
