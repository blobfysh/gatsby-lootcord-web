import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './leaderboard.module.scss'

function ValueDisplay({ value, type }) {
	if (type === 'money') return <span><strong>{value} Scrap</strong></span>
	else if (type === 'level') return <span><strong>Level {value}</strong></span>
	else if (value === '1') return <span><strong>{value} Kill</strong></span>
	return <span><strong>{value} Kills</strong></span>
}

function FirstPlacePlayer({ avatar, name, value, type }) {
	return (
		<div className={`${styles.lbPlayer} ${styles.lbFirst}`}>
			<div className={styles.playerIcon}>
				{
					avatar && avatar.extension !== 'gif' ?
						<Img fluid={avatar.childImageSharp.fluid} alt='' /> :
						<div style={{ height: '128px' }}>
							<img src={avatar?.publicURL} alt='' />
						</div>
				}
			</div>
			<div className={styles.values}>
				<div className={styles.name}>
					<span><strong>{name}</strong></span>
				</div>
				<div className={styles.value}>
					<ValueDisplay value={value} type={type} />
				</div>
			</div>
		</div>
	)
}

function Player({ avatar, name, value, type }) {
	return (
		<div className={styles.lbPlayer}>
			<div className={styles.playerIcon}>
				{
					avatar && avatar.extension !== 'gif' ?
						<Img fluid={avatar.childImageSharp.fluid} alt='' /> :
						<div style={{ height: '80px' }}>
							<img src={avatar?.publicURL} alt='' />
						</div>
				}
			</div>
			<div className={styles.values}>
				<div className={styles.name}>
					<span>{name}</span>
				</div>
				<div className={styles.value}>
					<ValueDisplay value={value} type={type} />
				</div>
			</div>
		</div>
	)
}

function Leaderboard({ title }) {
	const data = useStaticQuery(
		graphql`
			query {
				money: allLeaderboardUser(
					limit: 3,
					filter: { lbType: { eq: "money" }},
					sort: { fields: rawValue, order: DESC }
				) {
					nodes {
						id
						value
						lbType
						user {
							avatar {
								childImageSharp {
									fluid(maxWidth: 200) {
										...GatsbyImageSharpFluid
									}
								}
								publicURL
								extension
							}
							tag
						}
					}
				}
				level: allLeaderboardUser(
					limit: 3,
					filter: { lbType: { eq: "level" }},
					sort: { fields: rawValue, order: DESC }
				) {
					nodes {
						id
						value
						lbType
						user {
							avatar {
								childImageSharp {
									fluid(maxWidth: 200) {
										...GatsbyImageSharpFluid
									}
								}
								publicURL
								extension
							}
							tag
						}
					}
				}
				kills: allLeaderboardUser(
					limit: 3,
					filter: { lbType: { eq: "kills" }},
					sort: { fields: rawValue, order: DESC }
				) {
					nodes {
						id
						value
						lbType
						user {
							avatar {
								childImageSharp {
									fluid(maxWidth: 200) {
										...GatsbyImageSharpFluid
									}
								}
								publicURL
								extension
							}
							tag
						}
					}
				}
			}
		`
	)

	// don't render anything if leaderboard was not fetched
	if (!data.money.nodes.length) {
		return null
	}

	return (
		<div>
			<h1 className={`title is-1 ${styles.title}`}>{title}</h1>
			<div className={styles.lbSection}>
				<h2 className='subtitle is-2 has-text-centered'>Scrap</h2>
				{data.money.nodes.map((node, i) => {
					if (i === 0) {
						return <FirstPlacePlayer
							key={node.id}
							avatar={node.user.avatar}
							name={node.user.tag}
							value={node.value}
							type={node.lbType}
						/>
					}

					return <Player
						key={node.id}
						avatar={node.user.avatar}
						name={node.user.tag}
						value={node.value}
						type={node.lbType}
					/>
				})}
			</div>
			<div className={styles.lbSection}>
				<h2 className='subtitle is-2 has-text-centered'>Level</h2>
				{data.level.nodes.map((node, i) => {
					if (i === 0) {
						return <FirstPlacePlayer
							key={node.id}
							avatar={node.user.avatar}
							name={node.user.tag}
							value={node.value}
							type={node.lbType}
						/>
					}

					return <Player
						key={node.id}
						avatar={node.user.avatar}
						name={node.user.tag}
						value={node.value}
						type={node.lbType}
					/>
				})}
			</div>
			<div className={styles.lbSection}>
				<h2 className='subtitle is-2 has-text-centered'>Kills</h2>
				{data.kills.nodes.map((node, i) => {
					if (i === 0) {
						return <FirstPlacePlayer
							key={node.id}
							avatar={node.user.avatar}
							name={node.user.tag}
							value={node.value}
							type={node.lbType}
						/>
					}

					return <Player
						key={node.id}
						avatar={node.user.avatar}
						name={node.user.tag}
						value={node.value}
						type={node.lbType}
					/>
				})}
			</div>
		</div>
	)
}

export default Leaderboard
