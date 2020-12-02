import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
	return (
		<html {...props.htmlAttributes}>
			<head>
				<meta charSet='utf-8' />
				<meta httpEquiv='x-ua-compatible' content='ie=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, shrink-to-fit=no'
				/>
				{props.headComponents}
			</head>
			<body {...props.bodyAttributes} className='theme-dark'>
				<script dangerouslySetInnerHTML={{ __html: `
					(function() {
						var savedTheme;
						try {
							savedTheme = localStorage.getItem('theme');
						}
						catch (err) {
						}

						if (savedTheme) {
							window.theme = savedTheme
							document.body.className = 'theme-' + savedTheme;
						}
						else {
							window.theme = 'dark';
						}

						window.toggleTheme = function() {
							if (window.theme === 'dark') {
								window.theme = 'light';
							}
							else {
								window.theme = 'dark';
							}

							window.onThemeChange();
							document.body.className = 'theme-' + window.theme;
							localStorage.setItem('theme', window.theme);
						}

						window.onThemeChange = function() {}

						window.fetch('/api/me').then(res => res.json()).then(data => {
							window.user = data;
							window.onUserChange();
						}).catch(err => {
							window.user = {}
						})

						window.onUserChange = function() {}
					})();
					` }}
				/>
				{props.preBodyComponents}
				<noscript>This app works best with JavaScript enabled.</noscript>
				<div
					key={'body'}
					id='___gatsby'
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
				{props.postBodyComponents}
			</body>
		</html>
	)
}

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array
}
