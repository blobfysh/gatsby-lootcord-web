import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function CraftTable({ items }) {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Material</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{items.map(material => (
					<tr key={material.item.name}>
						<td>
							<div className={styles.itemCell}>
								<div className={styles.ammoImage}>
									{
										material.item.image.extension !== 'gif' ?
											<Img
												fluid={material.item.image.childImageSharp.fluid}
												alt=''
												draggable={false}
											/> :
											<img
												src={material.item.image.publicURL}
												alt=''
												draggable='false'
											/>
									}
								</div>
								<Link to={`/item/${material.item.name}`}>
									{material.item.name}
								</Link>
							</div>
						</td>
						<td>{material.amount}x</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

CraftTable.propTypes = {
	items: PropTypes.array
}

export default CraftTable
