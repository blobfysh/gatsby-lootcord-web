import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './slide-in.module.scss'

function SlideIn({ children, slideInRight }) {
	const postDiv = useRef(null)
	const [isVisible, setVisible] = useState(false)

	useEffect(() => {
		const topOfElement = postDiv.current.getBoundingClientRect().top

		function onScroll() {
			const scrollPos = window.scrollY + window.innerHeight

			if (topOfElement < scrollPos) {
				setVisible(true)
			}
		}

		if (topOfElement < window.innerHeight) setVisible(true)

		window.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<div
			ref={postDiv}
			className={`${styles.slideDiv} ${slideInRight ? styles.slideDivRight : styles.slideDivLeft} ${isVisible ? styles.slideIn : null}`}
		>
			{children}
		</div>
	)
}

SlideIn.defaultProps = {
	slideInRight: false
}

SlideIn.propTypes = {
	slideInRight: PropTypes.bool
}

export default SlideIn
