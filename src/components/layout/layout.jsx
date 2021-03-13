// import global css
import '../../styles/main.scss'

import React, { useState, useLayoutEffect, useEffect } from 'react'
import ThemeContext from '../../context/ThemeContext'
import UserContext, { defaultUser } from '../../context/UserContext'

import Header from '../header/header'
import Footer from '../footer/footer'
import Banner from '../banner/banner'
import Twemoji from '../twemoji'
import styles from './layout.module.scss'

function BannerText() {
	return (
		<a
			href='https://discord.com/oauth2/authorize?client_id=755926417954308106&permissions=388160&scope=bot%20applications.commands'
			target='_blank'
			rel='noopener noreferrer'
		>
			<Twemoji emoji='🎉' className={styles.emoji} />{' '}
			<u>Check out Lootcord Monthly, a new version of Lootcord that gets wiped every month.</u>
		</a>
	)
}

function Layout({ children }) {
	const [theme, setTheme] = useState(null)
	const [user, setUser] = useState(null)

	// sets theme on component mount
	// useLayoutEffect updates before browser paints whereas useEffect runs after component is rendered
	useLayoutEffect(() => {
		setTheme(window.theme)

		window.onThemeChange = () => {
			setTheme(window.theme)
		}

		// set logged in user
		if (window.user && Object.keys(window.user).length) {
			setUser({
				data: window.user,
				isLoggedIn: true
			})
		}
		else if (window.user) {
			setUser(defaultUser)
		}

		window.onUserChange = () => {
			if (Object.keys(window.user).length) {
				setUser({
					data: window.user,
					isLoggedIn: true
				})
			}
			else {
				setUser(defaultUser)
			}
		}
	}, [])

	useEffect(() => {
		const abortController = new AbortController()

		async function fetchUser() {
			try {
				const res = await fetch('/api/me', { signal: abortController.signal })
				const data = await res.json()

				if (Object.keys(data).length) {
					setUser({
						data,
						isLoggedIn: true
					})
					window.user = data
				}
				else {
					setUser(defaultUser)
					window.user = data
				}
			}
			catch (err) {
				// fetch aborted due to component unmount, continue
			}
		}

		fetchUser()

		return () => {
			abortController.abort()
		}
	}, [])

	return (
		<div className={styles.contentFull}>
			<ThemeContext.Provider value={theme}>
				<UserContext.Provider value={user}>
					<Banner
						text={BannerText()}
					/>
					<Header />
					<div className={styles.contentBody}>
						{children}
					</div>
					<Footer />
				</UserContext.Provider>
			</ThemeContext.Provider>
		</div>
	)
}

export default Layout
