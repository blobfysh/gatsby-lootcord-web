import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function ItemTable({ items, header }) {
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
								<div className={styles.ammoImage}>
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
								<Link to={`/item/${item.name}`}>
									{item.name}
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
