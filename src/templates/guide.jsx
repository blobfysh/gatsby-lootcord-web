import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'

function Guide({ data }) {
	const post = data.markdownRemark
	return (
		<Layout>
			<SEO title={post.frontmatter.title} description={post.frontmatter.preview} />
			<section className='section container'>
				<h1 className='title is-2 is-uppercase has-text-centered'>
					{post.frontmatter.title}
				</h1>
				<h2 className='subtitle is-6 has-text-centered'>
					Last updated: {post.frontmatter.date}
				</h2>
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
				<p className='pt-6 has-text-centered'>
					Notice something wrong? <a
						href={`https://github.com/blobfysh/gatsby-lootcord-web/blob/master/content/guides${post.fields.slug}index.md`}
						target='_blank'
						rel='noopener noreferrer'
					>
						Edit this page on GitHub
					</a>
				</p>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
            html
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
`

export default Guide
