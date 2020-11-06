import React, { useState } from 'react'

import { Link } from 'gatsby'
import lightThemeLogo from '../../images/lootcordlogodark.png'
import darkThemeLogo from '../../images/lootcordlogowhite.png'
import patronButton from '../../images/patron_button.png'
import styles from './header.module.scss'

function Header({ theme, toggleTheme }) {
	const [menuActive, setMenuActive] = useState(false)

	const toggleMenu = () => {
		if (menuActive) {
			setMenuActive(false)
		}
		else {
			setMenuActive(true)
		}
	}

	return (
		<nav
			className={`navbar is-transparent ${styles.navStyles}`}
			role='navigation'
			aria-label='main navigation'
		>
			<div className='container'>
				<div className='navbar-brand'>
					<Link to={'/'} className='navbar-item'>
						<img
							src={theme === 'dark' ? darkThemeLogo : lightThemeLogo}
							alt='Lootcord Icon'
							draggable='false'
						/>
					</Link>
					<button
						className={`navbar-burger burger ${menuActive ? 'is-active' : ''} ${styles.navBurger}`}
						aria-label='menu'
						aria-expanded='false'
						data-target='navbar-menu'
						onClick={toggleMenu}
					>
						<span aria-hidden='true' />
						<span aria-hidden='true' />
						<span aria-hidden='true' />
					</button>
				</div>
				<div id='navbar-menu' className={`navbar-menu ${menuActive ? 'is-active' : ''} ${styles.navMenu}`}>
					<div className='navbar-start has-text-weight-semibold'>
						<Link to={'/'} className='navbar-item'>
							Commands
						</Link>
						<Link to={'/'} className='navbar-item'>
							FAQ
						</Link>
						<Link to={'/'} className='navbar-item'>
							Black Market
						</Link>
					</div>
					<div className='navbar-end'>
						<div className='navbar-item'>
							<div className='field is-grouped is-grouped-multiline'>
								<p className='control'>
									<button className={`button is-primary ${styles.controlButton}`} onClick={toggleTheme}>
										<strong>Toggle theme</strong>
									</button>
								</p>
								<p className='control'>
									<a
										href='https://www.patreon.com/bePatron?u=14199989'
										target='_blank'
										rel='noopener noreferrer'
										className='is-flex'
									>
										<img
											src={patronButton}
											alt='Become a Patron'
											draggable='false'
											width='148'
											height='36'
											className={styles.patronButton}
										/>
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header
