import { useLayoutEffect, useState } from 'react'

function useTheme() {
	const [theme, setTheme] = useState(null)

	// sets theme on component mount
	// useLayoutEffect updates before browser paints whereas useEffect runs after component is rendered
	useLayoutEffect(() => {
		setTheme(window.theme)

		window.onThemeChange = () => {
			setTheme(window.theme)
		}
	}, [])

	return theme
}

export default useTheme
