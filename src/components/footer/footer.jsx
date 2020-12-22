import React, { useContext } from 'react'

import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'
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
								<Link className='link' to={'/appeal'}>
									Appeal
								</Link>
							</li>
							<li>
								<Link className='link' to={'/rules'}>
									Rules
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
									<label className={styles.switchWrap}>
										<span>Light Theme</span>
										<DragSwitch
											checked={theme !== 'dark'}
											onChange={() => {
												window.toggleTheme()
											}}
										/>
									</label>
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
