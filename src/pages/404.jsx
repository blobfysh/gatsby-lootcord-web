import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Hero from '../components/hero/hero'
import Twemoji from '../components/twemoji'

function HeroText() {
	return (
		<div>
			<Twemoji emoji='😢' />
			<span>That page doesn't exist</span>
		</div>
	)
}

function HeroButtons() {
	return [
		<React.Fragment>
			<Link to='/' className='button is-primary is-large'>
				Get me out of here!
			</Link>
		</React.Fragment>
	]
}

function NotFoundPage() {
	return (
		<Layout>
			<SEO />
			<Hero
				text={HeroText()}
				buttons={HeroButtons()}
				hasBackground={false}
			/>
		</Layout>
	)
}

export default NotFoundPage
