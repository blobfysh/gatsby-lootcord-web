import React from 'react'

import { useStaticQuery, Link, graphql } from 'gatsby'
import styles from './header.module.scss'

function Header({ toggleTheme }) {
	const data = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
					}
				}
			}
		`
	)
	return (
		<div className={styles.nav}>
			<div>
				<Link to={'/'} className='is-align-self-center'>
					<h3 className={'title is-5'}>
						{data.site.siteMetadata.title.toUpperCase()}
					</h3>
				</Link>
			</div>
			<div>
				<button className="button is-white" onClick={() => toggleTheme()}>Toggle theme</button>
			</div>
		</div>
	)
}

export default Header
