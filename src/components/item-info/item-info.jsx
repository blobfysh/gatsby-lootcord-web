import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import lootcoinImg from '../../images/LCNcolor.png'
import scrapImg from '../../images/scrap.png'
import AmmoTable from '../tables/ammo-table'
import CraftTable from '../tables/craft-table'
import ItemTable from '../tables/item-table'
import CrateTable from '../tables/crate-table'
import styles from './item-info.module.scss'

function getCategoryDisplay(category) {
	switch (category) {
		case 'Ammo': return 'Ammunition'
		case 'Banner': return 'Banner'
		case 'Material': return 'Material'
		case 'Melee': return 'Melee Weapon'
		case 'Ranged': return 'Ranged Weapon'
		case 'Item': return 'Usable Item'
		case 'Storage': return 'Storage Container'
		default: return ''
	}
}

function formatNumber(number) {
	return number.toLocaleString('en-US')
}

function formatCooldown(ms) {
	let remaining = ms
	const finalStr = []

	const rawDays = remaining / (1000 * 60 * 60 * 24)
	const days = Math.floor(rawDays)
	remaining %= 1000 * 60 * 60 * 24

	const rawHours = remaining / (1000 * 60 * 60)
	const hours = Math.floor(rawHours)
	remaining %= 1000 * 60 * 60

	const rawMinutes = remaining / (1000 * 60)
	const minutes = Math.floor(rawMinutes)
	remaining %= 1000 * 60

	const seconds = Math.floor(remaining / 1000)

	if (days > 0) {
		finalStr.push(days === 1 ? `${days} day` : `${days} days`)
	}
	if (hours > 0) {
		if (days > 0) {
			finalStr.push(`${rawHours.toFixed(1)} hours`)
			return finalStr.join(' ')
		}
		finalStr.push(hours === 1 ? `${hours} hour` : `${hours} hours`)
	}
	if (minutes > 0) {
		if (hours > 0 || days > 0) {
			finalStr.push(`${rawMinutes.toFixed(1)} minutes`)
			return finalStr.join(' ')
		}
		finalStr.push(minutes === 1 ? `${minutes} minute` : `${minutes} minutes`)
	}

	if (seconds !== 0) finalStr.push(seconds === 1 ? `${seconds} second` : `${seconds} seconds`)
	return finalStr.join(' ')
}

function ItemInfo({ item, ammoFor, usedToCraft, recyclesFrom, obtainedFrom }) {
	return (
		<div className={styles.itemInfoWrap}>
			<div className={`content ${styles.itemInfo}`}>
				<span>{item.name}</span>
				{
					item.image &&
					<div className={styles.imageContainer}>
						{
							item.image.extension !== 'gif' ?
								<Img
									fluid={item.image.childImageSharp.fluid}
									alt=''
									className={styles.image}
								/> :
								<img
									src={item.image.publicURL}
									alt=''
									className={styles.image}
								/>
						}
					</div>
				}
				{
					item.description &&
					<ReactMarkdown>{item.description}</ReactMarkdown>
				}
				<div className={styles.content}>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Type</strong>
						</div>
						<span>{getCategoryDisplay(item.category)}</span>
					</div>
					<div className={styles.contentRow}>
						<div className={styles.infoTag}>
							<strong>Tier</strong>
						</div>
						<span className={`${styles.tier} ${styles[`tier${item.tier}`]}`}>{item.tier === 0 ? 'None' : item.tier}</span>
					</div>
					{
						item.buy &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Buy Price</strong>
							</div>
							<span>
								<img
									src={lootcoinImg}
									alt=''
									draggable='false'
									className={styles.lootcoinIcon}
								/>
								{formatNumber(item.buy)}
							</span>
						</div>
					}
					{
						item.sell &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Sell Price</strong>
							</div>
							<span>
								<img
									src={lootcoinImg}
									alt=''
									draggable='false'
									className={styles.lootcoinIcon}
								/>
								{formatNumber(parseInt(item.sell))} Lootcoin (
								<img
									src={scrapImg}
									alt=''
									draggable='false'
									className={styles.lootcoinIcon}
								/>
								{formatNumber(Math.floor(parseInt(item.sell) * 1.5))} Scrap)
							</span>
						</div>
					}
					{
						item.minDamage &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Damage</strong>
							</div>
							<span>
								{`${item.minDamage} - ${item.maxDamage}`}
							</span>
						</div>
					}
					{
						item.category === 'Ammo' &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Damage</strong>
							</div>
							<span>
								{item.damage}
							</span>
						</div>
					}
					{
						item.cooldown &&
						<div className={styles.contentRow}>
							<div className={styles.infoTag}>
								<strong>Cooldown</strong>
							</div>
							<span>
								{formatCooldown(item.cooldown * 1000)}
							</span>
						</div>
					}
				</div>
			</div>
			<Tabs className={styles.itemDesc}>
				<TabList className={styles.tabs}>
					{
						!!ammoFor.length &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Ammo For</Tab>
					}
					{
						!!item.ammo.length &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Ammo Used</Tab>
					}
					{
						item.craftedWith &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Crafted With</Tab>
					}
					{
						item.recyclesTo &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Recycles To</Tab>
					}
					{
						!!usedToCraft.length &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Is Used To Craft</Tab>
					}
					{
						!!recyclesFrom.length &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Recycled From</Tab>
					}
					{
						item.possibleItems &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Possible Items</Tab>
					}
					{
						!!obtainedFrom.length &&
						<Tab className={styles.tab} selectedClassName={styles.tabSelected}>Obtained From</Tab>
					}
				</TabList>
				{
					!!ammoFor.length &&
					<TabPanel className={styles.contentSection}>
						<ItemTable
							items={ammoFor}
							header='Weapon'
						/>
					</TabPanel>
				}
				{
					!!item.ammo.length &&
					<TabPanel className={styles.contentSection}>
						<AmmoTable
							items={item.ammo}
							baseMaxDamage={parseInt(item.maxDamage)}
							baseMinDamage={parseInt(item.minDamage)}
						/>
					</TabPanel>
				}
				{
					item.craftedWith &&
					<TabPanel className={styles.contentSection}>
						<CraftTable
							items={item.craftedWith.materials}
						/>
					</TabPanel>
				}
				{
					item.recyclesTo &&
					<TabPanel className={styles.contentSection}>
						<CraftTable
							items={item.recyclesTo.materials}
						/>
					</TabPanel>
				}
				{
					!!usedToCraft.length &&
					<TabPanel className={styles.contentSection}>
						<ItemTable
							items={usedToCraft}
							header='Item'
						/>
					</TabPanel>
				}
				{
					!!recyclesFrom.length &&
					<TabPanel className={styles.contentSection}>
						<ItemTable
							items={recyclesFrom}
							header='Item'
						/>
					</TabPanel>
				}
				{
					item.possibleItems &&
					<TabPanel className={styles.contentSection}>
						<CrateTable
							items={item.possibleItems}
						/>
					</TabPanel>
				}
				{
					!!obtainedFrom.length &&
					<TabPanel className={styles.contentSection}>
						<ItemTable
							items={obtainedFrom}
							header='Item'
						/>
					</TabPanel>
				}
			</Tabs>
		</div>
	)
}

ItemInfo.propTypes = {
	item: PropTypes.object
}

export default ItemInfo
