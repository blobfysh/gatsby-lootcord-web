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
					<span className='blurple has-text-weight-bold'>
						{
							patronOnly &&
							<FontAwesomeIcon className={styles.patreonIcon} icon={faPatreon} />
						}
						{name}
					</span>
					<span><span className={styles.dash}> - </span>{description}</span>
				</div>
				<FontAwesomeIcon className={styles.fontIcon} icon={faCaretDown} />
			</button>
			<div className={`${!selected ? styles.hideUsage : ''} ${styles.infoWrap}`}>
				<div className={`${styles.cmdInfo}`}>
					{
						patronOnly &&
						<div>
							<span>Become a <a
								href='https://www.patreon.com/bePatron?u=14199989'
								target='_blank'
								rel='noopener noreferrer'
							>
								patron
							</a> to get access to this command!
							</span>
						</div>
					}
					<span>Usage: <code className='language-text'>{usage}</code></span>
				</div>
			</div>
		</div>
	)
}

export default Command
