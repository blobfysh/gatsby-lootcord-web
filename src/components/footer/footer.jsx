import React, { useContext } from 'react'

import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import Switch from '../switch/switch'
import styles from './footer.module.scss'

function Footer() {
	const [theme, setTheme] = useContext(ThemeContext)

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		}
		else {
			setTheme('light')
		}
	}

	return (
		<footer className={styles.footerStyles}>
			<div className={`container ${styles.listContainer}`}>
				<div>
					<div>
						<span>Links</span>
						<ul className={styles.footerList}>
							<li>
								<Link className='link' to={'/'}>
                                    Rules
								</Link>
							</li>
							<li>
								<Link className='link' to={'/'}>
                                    About
								</Link>
							</li>
							<li>
								<Link className='link' to={'/'}>
                                    Guides
								</Link>
							</li>
							<li>
								<Link className='link' to={'/'}>
                                    Terms
								</Link>
							</li>
							<li>
								<Link className='link' to={'/'}>
                                    Privacy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<span>Extras</span>
						<ul className={styles.footerList}>
							<li>
								<Switch
									checked={theme !== 'dark'}
									onChange={toggleTheme}
									text='Light Theme'
								/>
							</li>
						</ul>
					</div>
				</div>
				<ul className={styles.copyList}>
					<span>
						© Copyright 2020 Blobfysh
						<br />
						Lootcord is not affiliated with Facepunch
					</span>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
