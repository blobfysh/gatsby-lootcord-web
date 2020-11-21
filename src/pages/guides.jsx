import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import GuidePost from '../components/guide-post/guide-post'

function Guides({ data }) {
	return (
		<Layout>
			<SEO title='Guides' />
			<section className='section container'>
				<h1 className='title is-uppercase has-text-centered'>Guides</h1>
				{data.allMarkdownRemark.nodes.map(node => (
					<GuidePost
						title={node.frontmatter.title}
						date={node.frontmatter.date}
						preview={node.frontmatter.preview}
						slug={`/guides${node.fields.slug}`}
						key={node.fields.slug}
					/>
				))}
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

export default Guides
