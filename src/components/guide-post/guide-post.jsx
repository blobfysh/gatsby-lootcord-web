import React from 'react'

import { Link } from 'gatsby'
import styles from './guide-post.module.scss'

function Post({ title, date, preview, slug }) {
	return (
		<Link to={slug}>
			<div className={styles.guideWrap}>
				<h2 className={`title is-3 ${styles.title}`}>{title}</h2>
				<h3 className='subtitle is-7'>Updated {date}</h3>
				<p>{preview}</p>
			</div>
		</Link>
	)
}

export default Post
