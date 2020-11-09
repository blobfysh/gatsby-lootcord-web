import React, { useState } from 'react'

import { Link } from 'gatsby'
import patronButton from '../../images/patron_button.png'
import styles from './header.module.scss'

function Header() {
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
			className={`navbar ${styles.navStyles}`}
			role='navigation'
			aria-label='main navigation'
		>
			<div className='container'>
				<div className='navbar-brand'>
					<Link to={'/'} className='navbar-item'>
						<div
							className={styles.logoStyle}
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
