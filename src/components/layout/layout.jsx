// import global css
import '../../styles/main.scss'

// prismjs code styling
import 'prismjs/themes/prism.css'

import React, { useState, useLayoutEffect } from 'react'
import ThemeContext from '../../context/ThemeContext'

import Header from '../header/header'
import Footer from '../footer/footer'
import styles from './layout.module.scss'

function Layout({ children }) {
	const [theme, setTheme] = useState(null)

	// sets theme on component mount
	// useLayoutEffect updates before browser paints whereas useEffect runs after component is rendered
	useLayoutEffect(() => {
		setTheme(window.theme)

		window.onThemeChange = () => {
			setTheme(window.theme)
		}
	}, [])

	return (
		<div className={styles.contentFull}>
			<ThemeContext.Provider value={theme}>
				<Header />
				<div className={styles.contentBody}>
					{children}
				</div>
				<Footer />
			</ThemeContext.Provider>
		</div>
	)
}

export default Layout
