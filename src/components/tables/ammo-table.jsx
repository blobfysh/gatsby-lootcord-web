import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'
import Twemoji from '../twemoji'

function AmmoTable({ items, baseMinDamage, baseMaxDamage, bleedDamage }) {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Ammunition</th>
					<th>Damage</th>
				</tr>
			</thead>
			<tbody>
				{items.map(ammo => (
					<tr key={ammo.item.name}>
						<td>
							<div className={styles.itemCell}>
								<div className={styles.ammoImage}>
									{
										ammo.item.image.extension !== 'gif' ?
											<Img
												fluid={ammo.item.image.childImageSharp.fluid}
												alt=''
												draggable={false}
											/> :
											<img
												src={ammo.item.image.publicURL}
												alt=''
												draggable='false'
											/>
									}
								</div>
								<Link to={`/item/${ammo.item.name}`}>
									{ammo.item.name}
								</Link>
							</div>
						</td>
						<td>
							{
								ammo.item.bleedDamage ?
									<span>
										{`${baseMinDamage + ammo.damage} - ${baseMaxDamage + ammo.damage} + `}
										<Twemoji emoji='🩸' className={styles.emoji} />
										{`${ammo.item.bleedDamage} bleed`}
									</span> : ammo.item.burnDamage ?
										<span>
											{`${baseMinDamage + ammo.damage} - ${baseMaxDamage + ammo.damage} + `}
											<Twemoji emoji='🔥' className={styles.emoji} />
											{`${ammo.item.burnDamage} burn`}
										</span> :
										`${baseMinDamage + ammo.damage} - ${baseMaxDamage + ammo.damage}`
							}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

AmmoTable.propTypes = {
	items: PropTypes.array,
	baseMinDamage: PropTypes.number,
	baseMaxDamage: PropTypes.number
}

export default AmmoTable
