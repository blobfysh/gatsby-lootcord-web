import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faYoutube, faGithub, faSteam, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import styles from './user-card.module.scss'

function Social({ type, link }) {
	let icon

	switch (type) {
		case 'twitter': icon = faTwitter; break
		case 'youtube': icon = faYoutube; break
		case 'steam': icon = faSteam; break
		case 'github': icon = faGithub; break
		case 'instagram': icon = faInstagram; break
		case 'spotify': icon = faSpotify; break
		default:
	}

	return (
		<a
			href={link}
			target='_blank'
			rel='noopener noreferrer'
		>
			<FontAwesomeIcon icon={icon} className={styles.icon} />
		</a>
	)
}

function UserCard({ name, image, socials }) {
	const socialsArr = socials && Object.keys(socials).filter(social => socials[social])

	return (
		<div className={styles.userCard}>
			<div className={styles.imageContainer}>
				{
					image.extension !== 'gif' ?
						<Img
							fixed={image.childImageSharp.fixed}
							alt=''
							draggable={false}
							className={styles.image}
						/> :
						<img
							src={image.publicURL}
							alt=''
							draggable='false'
							className={styles.image}
						/>
				}
			</div>
			<span className={styles.name}>{name}</span>
			{
				socialsArr &&
				<div className={styles.socialsWrap}>
					{socialsArr.map(type => <Social key={type} type={type} link={socials[type]} />)}
				</div>
			}
		</div>
	)
}

UserCard.defaultProps = {
	socials: null
}

UserCard.propTypes = {
	name: PropTypes.string,
	image: PropTypes.object,
	socials: PropTypes.object
}

export default UserCard
