// import global css
import '../../styles/main.scss'

// prismjs code styling
import 'prismjs/themes/prism.css'

import React from 'react'
import ThemeContext from '../../context/ThemeContext'

import useTheme from '../useTheme'
import Header from '../header/header'
import Footer from '../footer/footer'
import styles from './layout.module.scss'

function Layout({ children }) {
	const theme = useTheme()

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
