import React from 'react'

import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import styles from './guide-post.module.scss'

function Post({ title, date, preview, slug }) {
	return (
		<Link to={slug}>
			<div className={styles.guideWrap}>
				<h2 className={`title is-3 ${styles.title}`}>{title}</h2>
				<h3 className='subtitle is-7'>Updated {date}</h3>
				<p>{preview}</p>
				<div className={`${styles.readButton}`}>
					<span className={styles.btnText}>Read more</span>
					<FontAwesomeIcon
						className={`icon ${styles.icon}`}
						icon={faLongArrowAltRight}
						size='lg'
					/>
				</div>
			</div>
		</Link>
	)
}

export default Post
