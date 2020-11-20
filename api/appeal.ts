import { NowRequest, NowResponse } from '@vercel/node'
import { serialize } from 'cookie'
import { WebhookClient, MessageEmbed } from 'discord.js'

const webhookClient = new WebhookClient(process.env.WEBHOOK_ID as string, process.env.WEBHOOK_TOKEN as string)

async function Route(req: NowRequest, res: NowResponse) {
	if (req.method !== 'POST') {
		return res.redirect('/404')
	}

	const cookie = req.cookies.appealed

	if (cookie) {
		return res.status(429).send('Too many requests')
	}

	try {
		const embed = new MessageEmbed()
			.setTitle('A ban appeal has arrived!')
			.setColor(13451563)
			.addField('User', `${req.body.tag.slice(0, 100)} (ID: ${req.body.id.slice(0, 30)})`)
			.addField('Content', req.body.info.slice(0, 1024))

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
