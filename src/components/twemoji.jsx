import React from 'react'
import twemoji from 'twemoji'

function Twemoji({ emoji, className }) {
	return (
		<div
			className={className}
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
