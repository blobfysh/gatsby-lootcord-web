import React from 'react'

import UserCard from '../user-card/user-card'
import styles from './user-card-list.module.scss'

function UserCardList({ title, users }) {
	return (
		<div>
			<h2 className={`subtitle is-3 ${styles.title}`}>{title}</h2>
			<div className={styles.list}>
				{
					users[0].name ?
						users.map((user, i) => (
							<UserCard
								key={user.name}
								name={user.name}
								image={user.image}
								socials={user.socials}
							/>
						)) :
						users.map(({ user }, i) => (
							<UserCard
								key={user.tag}
								name={user.tag}
								image={user.avatar}
							/>
						))
				}
			</div>
		</div>
	)
}

export default UserCardList
