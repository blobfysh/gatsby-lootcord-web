import { NowRequest, NowResponse } from '@vercel/node'
import { serialize } from 'cookie'
import { verify } from 'jsonwebtoken'
import { WebhookClient, MessageEmbed } from 'discord.js'

const webhookClient = new WebhookClient(process.env.WEBHOOK_ID as string, process.env.WEBHOOK_TOKEN as string)

async function Route(req: NowRequest, res: NowResponse) {
	if (req.method !== 'POST') {
		return res.redirect('/404')
	}

	// verify user is logged in
	const accessToken = req.cookies.jwt

	if (!accessToken) {
		return res.status(401).send('Unauthorized')
	}

	let user
	try {
		user = verify(accessToken, process.env.JWT_SECRET || 'test') as any
	}
	catch (err) {
		return res.status(401).send('Unable to verify access token.')
	}

	// check if user sent appeal recently
	const cookie = req.cookies.appealed

	if (cookie) {
		return res.status(429).send('Too many requests')
	}

	try {
		const embed = new MessageEmbed()
			.setTitle('A ban appeal has arrived!')
			.setColor(13451563)
			.addField('User', `${user.username}#${user.discriminator} (ID: ${user.id})`)
			.addField('What were you banned for?', req.body.info.slice(0, 1024))
			.addField('Why should you be unbanned?', req.body.reason.slice(0, 1024))

		await webhookClient.send('', {
			embeds: [embed]
		})
	}
	catch (err) {
		console.log(err)
		return res.status(500).send('Failed to send appeal.')
	}

	// set cookie for 30 minutes
	res.setHeader('Set-Cookie', serialize('appealed', 'true', {
		expires: new Date(Date.now() + (30 * 60 * 1000))
	}))

	res.status(200).send('Success')
}

export default Route
