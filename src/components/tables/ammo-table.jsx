import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function AmmoTable({ items, baseMinDamage, baseMaxDamage }) {
	return (
		<table className={styles.table}>
			<tr>
				<th>Ammunition</th>
				<th>Damage</th>
			</tr>
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
					<td>{`${baseMinDamage + ammo.damage} - ${baseMaxDamage + ammo.damage}`}</td>
				</tr>
			))}
		</table>
	)
}

AmmoTable.propTypes = {
	items: PropTypes.array,
	baseMinDamage: PropTypes.number,
	baseMaxDamage: PropTypes.number
}

export default AmmoTable
