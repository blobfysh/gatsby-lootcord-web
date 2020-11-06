import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Post from '../components/post/post'

function Home({ data }) {
	return (
		<Layout>
			<SEO />
			<div>
				<h1 className='title'>Welcome to My Blog</h1>
				<h2 className='subtitle'>{data.allMarkdownRemark.totalCount} Posts</h2>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<Post
						title={node.frontmatter.title}
						slug={`/blog${node.fields.slug}`}
						image={node.frontmatter.image.childImageSharp.fixed}
						date={node.frontmatter.date}
						excerpt={node.excerpt}
						key={node.id}
					/>
				))}
			</div>
		</Layout>
	)
}

export const query = graphql`
	query {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/blog/" } }
			sort: { fields: frontmatter___date, order: DESC }
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
						image {
							childImageSharp {
								fixed(height: 100) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
					fields {
						slug
					}
					excerpt
				}
			}
		}
	}
`

export default Home
