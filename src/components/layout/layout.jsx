/* import fonts
import 'fontsource-open-sans'
import 'fontsource-open-sans/800.css'
import 'fontsource-arimo'
*/

// import global css
import '../../styles/main.scss'

// prismjs code styling
import 'prismjs/themes/prism.css'

import React, { useState, useEffect } from 'react'

import Header from '../header/header'
import styles from './layout.module.scss'

function Layout({ children }) {
	const [theme, setTheme] = useState(typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light')

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		}
		else {
			setTheme('light')
		}
	}

	useEffect(() => {
		document.body.className = `theme-${theme}`

		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', theme)
		}
	})

	return (
		<div className={`${styles.layout} container`}>
			<Header toggleTheme={toggleTheme} />
			{children}
		</div>
	)
}

export default Layout
