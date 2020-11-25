import React, { useState } from 'react'

import { Link, useStaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import patronButton from '../../images/patron_button.png'
import styles from './header.module.scss'

function Header() {
	const data = useStaticQuery(
		graphql`
			query {
				allItem {
					nodes {
						name
					}
				}
				allCommand {
					nodes {
						name
					}
				}
			}
		`
	)
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
					<Link to={'/'} className='navbar-item' aria-label='Home Page'>
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
						{
							!!data.allCommand.nodes.length &&
							<Link to={'/commands'} className='navbar-item'>
								Commands
							</Link>
						}
						{
							!!data.allItem.nodes.length &&
							<div className='navbar-item has-dropdown is-hoverable'>
								<Link to={'/items'} className='navbar-link'>
									Items
									<FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
								</Link>
								<div className='navbar-dropdown'>
									<Link to={'/items/category/ammo'} className='navbar-item'>
										Ammunition
									</Link>
									<Link to={'/items/category/material'} className='navbar-item'>
										Materials
									</Link>
									<Link to={'/items/category/melee'} className='navbar-item'>
										Melee Weapons
									</Link>
									<Link to={'/items/category/ranged'} className='navbar-item'>
										Ranged Weapons
									</Link>
									<Link to={'/items/category/item'} className='navbar-item'>
										Usable Items
									</Link>
									<Link to={'/items/category/storage'} className='navbar-item'>
										Storage Containers
									</Link>
								</div>
							</div>
						}
						<Link to={'/faq'} className='navbar-item'>
							FAQ
						</Link>
						<Link to={'/guides'} className='navbar-item'>
							Guides
						</Link>
						<Link to={'/about'} className='navbar-item'>
							About
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
