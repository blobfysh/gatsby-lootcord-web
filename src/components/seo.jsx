import React from 'react'

import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, title }) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						image
					}
				}
			}
		`
	)

	const metaDescription = description || site.siteMetadata.description
	const metaTitle = title || site.siteMetadata.title

	return (
		<Helmet
			htmlAttributes={{ lang }}
			titleTemplate={title ? `%s • ${site.siteMetadata.title}` : null}
			title={metaTitle}
			meta={[
				{
					name: 'description',
					content: metaDescription
				},
				{
					property: 'og:title',
					content: metaTitle
				},
				{
					property: 'og:description',
					content: metaDescription
				},
				{
					property: 'og:image',
					content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					name: 'twitter:card',
					content: 'summary'
				},
				{
					name: 'twitter:creator',
					content: site.siteMetadata.author
				},
				{
					name: 'twitter:title',
					content: metaTitle
				},
				{
					name: 'twitter:description',
					content: metaDescription
				}
			].concat(meta)}
		/>
	)
}

SEO.defaultProps = {
	lang: 'en',
	meta: [],
	description: ''
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string
}

export default SEO
