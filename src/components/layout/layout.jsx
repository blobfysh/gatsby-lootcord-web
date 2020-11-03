// import fonts
import 'fontsource-open-sans'
import 'fontsource-open-sans/800.css'
import 'fontsource-arimo'

// prismjs code styling
import 'prismjs/themes/prism.css'

// import global css
import '../../styles/main.scss'

import React from 'react'

import Header from '../header/header'
import styles from './layout.module.scss'

function Layout({ children }) {
	return (
		<div className={`${styles.layout} container`}>
			<Header />
			{children}
		</div>
	)
}

export default Layout
