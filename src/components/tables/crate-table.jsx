import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function CrateTable({ items }) {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Item</th>
					<th>Amount</th>
					<th>Chance</th>
				</tr>
			</thead>
			<tbody>
				{items.sort((a, b) => b.rate - a.rate).map(possibleItem => (
					<tr key={possibleItem.item.name}>
						<td>
							<div className={styles.itemCell}>
								<div className={styles.ammoImage}>
									{
										possibleItem.item.image.extension !== 'gif' ?
											<Img
												fluid={possibleItem.item.image.childImageSharp.fluid}
												alt=''
												draggable={false}
											/> :
											<img
												src={possibleItem.item.image.publicURL}
												alt=''
												draggable='false'
											/>
									}
								</div>
								<Link to={`/item/${possibleItem.item.name}`}>
									{possibleItem.item.name}
								</Link>
							</div>
						</td>
						<td>{possibleItem.amount}</td>
						<td>{possibleItem.rate}%</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

CrateTable.propTypes = {
	items: PropTypes.array
}

export default CrateTable
