import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'

export default function BlogPost({ data }) {
	const post = data.markdownRemark
	return (
		<Layout>
			<SEO title={post.frontmatter.title} description={post.excerpt} />
			<div>
				<h1 className='title is-2 has-text-centered'>
					{post.frontmatter.title}
				</h1>
				<h2 className='subtitle is-4 has-text-centered'>
					{post.frontmatter.date}
				</h2>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			excerpt
			frontmatter {
				title
				date(formatString: "DD MMMM, YYYY")
				image {
					childImageSharp {
						fluid(maxHeight: 400, maxWidth: 600) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`
