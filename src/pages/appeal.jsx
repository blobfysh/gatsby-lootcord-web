import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import AppealForm from '../components/appeal-form/appeal-form'

function Appeal({ data }) {
	return (
		<Layout>
			<SEO title='Rules' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>Appeal a Ban</h1>
				<AppealForm />
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/guides/" } }, sort: {order: DESC, fields: frontmatter___date}) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    preview
                    date(formatString: "MMMM DD, YYYY")
                }
            }
        }
	}
`

export default Appeal
