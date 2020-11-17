import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'

function Faq({ data }) {
	return (
		<Layout>
			<SEO title='Frequently Asked Questions' />
			<section className='section container'>
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
		markdownRemark(fileAbsolutePath: { regex: "/faq/" }) {
			html
		}
	}
`

export default Faq
