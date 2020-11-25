import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './table.module.scss'

function CrateTable({ items }) {
	return (
		<table className={styles.table}>
			<tr>
				<th>Item</th>
				<th>Amount</th>
				<th>XP</th>
			</tr>
			{items.sort((a, b) => b.xp - a.xp).map(possibleItem => (
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
					<td>{possibleItem.xp}</td>
				</tr>
			))}
		</table>
	)
}

CrateTable.propTypes = {
	items: PropTypes.array
}

export default CrateTable
