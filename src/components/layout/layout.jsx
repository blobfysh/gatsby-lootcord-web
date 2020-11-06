// import global css
import '../../styles/main.scss'

// prismjs code styling
import 'prismjs/themes/prism.css'

import React, { useState, useLayoutEffect } from 'react'

import Header from '../header/header'
import Footer from '../footer/footer'
import styles from './layout.module.scss'

function Layout({ children }) {
	const [theme, setTheme] = useState('light')
	const [transitionsEnabled, setTransitions] = useState(false)

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

	setTimeout(() => {
		setTransitions(true)
	}, 500)

	return (
		<div className={`${styles.contentFull} ${transitionsEnabled ? '' : 'noTransitions'}`}>
			<Header theme={theme} toggleTheme={toggleTheme} />
			<section className={`section ${styles.contentBody}`}>
				<div className='container'>
					{children}
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Layout
