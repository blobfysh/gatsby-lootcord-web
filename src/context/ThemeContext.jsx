import React from 'react'

const defaultTheme = [
	'dark',
	// eslint-disable-next-line no-empty-function
	() => {}
]

const ThemeContext = React.createContext(defaultTheme)

export default ThemeContext
