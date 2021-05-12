import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import scrapImg from '../../images/scrap.png'
import CrateTable from '../tables/crate-table'
import ItemTable from '../tables/item-table'
import styles from '../item-info/item-info.module.scss'
import formatNumber from '../../utils/formatNumber'
import formatCooldown from '../../utils/formatCooldown'
import Twemoji from '../twemoji'

function EnemyInfo({ enemy }) {
	return (
		<div className={styles.itemInfoWrap}>
			<div className={`content ${styles.itemInfo}`}>
				<span>{enemy.name}</span>
				{
					enemy.image &&
					<div className={styles.wideImage}>
						{
							enemy.image.extension !== 'gif' ?
								<Img
									fluid={enemy.image.childImageSharp.fluid}
									alt=''
									className={styles.image}
								/> :
								<img
									src={enemy.image.publicURL}
									alt=''
									className={styles.image}
								/>
						}
					</div>
				}
				<div className={styles.content}>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Health</strong>
						</div>
						<span>
							<Twemoji emoji='❤️' className={styles.emoji} />
							{` ${enemy.health} HP`}
						</span>
					</div>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Scrap</strong>
						</div>
						<span>
							<img
								src={scrapImg}
								alt=''
								draggable='false'
								className={styles.scrapIcon}
							/>
							{formatNumber(enemy.minMoney)} - {formatNumber(enemy.maxMoney)}
						</span>
					</div>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Damage</strong>
						</div>
						<span>
							{`${enemy.minDamage} - ${enemy.maxDamage}`}
						</span>
					</div>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Kill EXP</strong>
						</div>
						<span>
							{`${enemy.xp} XP`}
						</span>
					</div>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Stays For</strong>
						</div>
						<span>
							{formatCooldown(enemy.staysFor * 1000)}
						</span>
					</div>
					{
						enemy.special &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Special</strong>
							</div>
							<span>
								<ReactMarkdown>{enemy.special}</ReactMarkdown>
							</span>
						</div>
					}
				</div>
			</div>
			<Tabs className={styles.itemDesc}>
				<TabList className={styles.tabs}>
					<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Main Loot</Tab>
					<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Extras Loot</Tab>
					<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Weapon Used</Tab>
				</TabList>
				<TabPanel className={styles.contentSection}>
					<CrateTable
						items={enemy.loot.main}
					/>
				</TabPanel>
				<TabPanel className={styles.contentSection}>
					<CrateTable
						items={enemy.loot.extras}
					/>
				</TabPanel>
				<TabPanel className={styles.contentSection}>
					<ItemTable
						items={[enemy.weapon]}
						header='Weapon'
					/>
				</TabPanel>
			</Tabs>
		</div>
	)
}

EnemyInfo.propTypes = {
	enemy: PropTypes.object
}

export default EnemyInfo
