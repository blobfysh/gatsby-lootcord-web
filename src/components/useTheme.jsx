import { useLayoutEffect, useState } from 'react'

function useTheme() {
	const [theme, setTheme] = useState('dark')
	const [transitionsEnabled, setTransitions] = useState(false)

	// sets theme on component mount
	// useLayoutEffect updates before browser paints whereas useEffect runs after component is rendered
	useLayoutEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		let mounted = true

		if (savedTheme) {
			setTheme(savedTheme)
		}

		setTimeout(() => {
			// make sure component is mounted before setting state
			if (mounted) setTransitions(true)
		}, 500)

		return () => {
			mounted = false
		}
	}, [])

	// listen for theme changes
	useLayoutEffect(() => {
		document.body.className = `theme-${theme}`
		localStorage.setItem('theme', theme)
	}, [theme])

	return [theme, setTheme, transitionsEnabled]
}

export default useTheme
