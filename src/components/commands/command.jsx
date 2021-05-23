import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faPatreon } from '@fortawesome/free-brands-svg-icons'
import styles from './command.module.scss'

function Command({ name, description, usage, patronOnly }) {
	const [selected, setSelected] = useState(false)

	const handleClick = () => {
		if (selected === true) {
			setSelected(false)
		}
		else {
			setSelected(true)
		}
	}

	return (
		<div className={styles.commandWrap}>
			<button
				className={`${styles.cmdButton} ${selected ? styles.buttonSelected : ''}`}
				onClick={handleClick}
			>
				<div className={styles.cmdName}>
					<p className={styles.cmdTitle}>
						{
							patronOnly &&
							<FontAwesomeIcon className={styles.patreonIcon} icon={faPatreon} />
						}
						{name}
					</p>
					<p>{description}</p>
				</div>
				<FontAwesomeIcon className={styles.fontIcon} icon={faCaretDown} />
			</button>
			<div className={`${!selected ? styles.hideUsage : ''} ${styles.infoWrap}`}>
				<div className={`${styles.cmdInfo}`}>
					{
						patronOnly &&
						<p className='py-2'>
							<span>Become a <a
								href='https://www.patreon.com/bePatron?u=14199989'
								target='_blank'
								rel='noopener noreferrer'
								className='link'
							>
								patron
							</a> to get access to this command!
							</span>
						</p>
					}
					<div className='mb-2'>
						<span className={styles.cmdInfoHeading}>Usage</span>
						<p><code>{usage}</code></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Command
