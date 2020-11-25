import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'

function Privacy({ data }) {
	return (
		<Layout>
			<SEO title='Privacy Policy' />
			<section className='section container hideHeaders'>
				<h1 className='title is-uppercase has-text-centered'>{data.markdownRemark.frontmatter.title}</h1>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
				/>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		markdownRemark(fileAbsolutePath: { regex: "/legal/privacy/" }) {
			html
			frontmatter {
				title
			}
		}
	}
`

export default Privacy
