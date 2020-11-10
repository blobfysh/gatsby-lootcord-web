import React from 'react'
import twemoji from 'twemoji'

function Twemoji({ emoji }) {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: twemoji.parse(emoji, {
					folder: 'svg',
					ext: '.svg'
				})
			}}
		/>
	)
}

export default Twemoji
