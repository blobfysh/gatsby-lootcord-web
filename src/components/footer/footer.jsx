import React from 'react'

import { Link } from 'gatsby'
import styles from './footer.module.scss'

function Footer() {
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
								<Link className='link' to={'/'}>
									Rules
								</Link>
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
