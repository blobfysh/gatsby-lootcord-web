// import global css
import '../../styles/main.scss'

// prismjs code styling
import 'prismjs/themes/prism.css'

import React, { useState, useLayoutEffect } from 'react'

import Header from '../header/header'
import styles from './layout.module.scss'

function Layout({ children }) {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		}
		else {
			setTheme('light')
		}
	}

	// sets theme on component mount
	// useLayoutEffect updates before browser paints whereas useEffect runs after component is rendered
	useLayoutEffect(() => {
		setTheme(localStorage.getItem('theme') || 'light')
	}, [])

	// listen for theme changes
	useLayoutEffect(() => {
		document.body.className = `theme-${theme}`
		localStorage.setItem('theme', theme)
	}, [theme])

	return (
		<div className={`${styles.layout} container`}>
			<Header toggleTheme={toggleTheme} />
			{children}
		</div>
	)
}

export default Layout
