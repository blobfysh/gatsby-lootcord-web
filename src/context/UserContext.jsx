import React from 'react'

export const defaultUser = {
	data: {},
	isLoggedIn: false
}

const UserContext = React.createContext(defaultUser)

export default UserContext
