import React, { useContext } from 'react'

import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import Switch from '../switch/switch'
import styles from './footer.module.scss'

function Footer() {
	const theme = useContext(ThemeContext)

	return (
		<footer className={styles.footerStyles}>
			<div className={`container ${styles.listContainer}`}>
				<div>
					<div>
						<ul className={styles.footerList}>
							<li>
								<Link className='link' to={'/rules'}>
									Rules
								</Link>
							</li>
							<li>
								<Link className='link' to={'/about'}>
									About
								</Link>
							</li>
							<li>
								<Link className='link' to={'/'}>
									Guides
								</Link>
							</li>
							<li>
								<Link className='link' to={'/terms'}>
									Terms
								</Link>
							</li>
							<li>
								<Link className='link' to={'/privacy'}>
									Privacy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<ul className={styles.footerList}>
							<li>
								{theme !== null ? (
									<Switch
										checked={theme !== 'dark'}
										onChange={() => { window.toggleTheme() }}
										text='Light Theme'
									/>
								) : (
									<div style={{ height: '24px' }} />
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.copyList}>
					<span>
						© Copyright 2020 Blobfysh
						<br />
						Lootcord is not affiliated with Facepunch
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
