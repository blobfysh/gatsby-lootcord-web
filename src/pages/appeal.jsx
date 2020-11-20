import React from 'react'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import AppealForm from '../components/appeal-form/appeal-form'

function Appeal() {
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

export default Appeal
