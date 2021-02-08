import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function ItemTable({ items, header, enemy = false }) {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>{header}</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<tr key={item.name}>
						<td className={styles.itemCell}>
							<div className={styles.itemCell}>
								<div className={enemy ? styles.enemyImage : styles.ammoImage}>
									{
										item.image.extension !== 'gif' ?
											<Img
												fluid={item.image.childImageSharp.fluid}
												alt=''
												draggable={false}
											/> :
											<img
												src={item.image.publicURL}
												alt=''
												draggable='false'
											/>
									}
								</div>
								<Link to={enemy ? `/enemy/${item.name}` : `/item/${item.name}`}>
									{enemy ? item.name.split('_').map(part => part[0].toUpperCase() + part.slice(1)).join(' ') : item.name}
								</Link>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

ItemTable.propTypes = {
	items: PropTypes.array
}

export default ItemTable
