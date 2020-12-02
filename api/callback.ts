import { NowRequest, NowResponse } from '@vercel/node'
import axios from 'axios'
import { stringify } from 'query-string'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

async function Route(req: NowRequest, res: NowResponse) {
	if (req.method !== 'GET') {
		return res.status(400).send('Invalid Request')
	}
	else if (!req.query.code) {
		return res.status(400).send('Invalid Request - Missing code')
	}

	const body = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: 'authorization_code',
		code: req.query.code,
		redirect_uri: process.env.REDIRECT_URI,
		scope: 'identify'
	}

	let accessTokenRes
	try {
		accessTokenRes = await axios.post('https://discord.com/api/oauth2/token', stringify(body), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}
	catch (err) {
		return res.status(400).send('Unable to retrieve access_token')
	}

	if (accessTokenRes.data.scope !== 'identify') {
		return res.status(401).send(`Invalid scope provided: ${accessTokenRes.data.scope} Expected: identify`)
	}

	let user
	try {
		user = await axios.get('https://discordapp.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${accessTokenRes.data.access_token}`
			}
		})
	}
	catch (err) {
		return res.status(400).send('Unable to retrieve user data')
	}

	const payload = {
		id: user.data.id,
		username: user.data.username,
		discriminator: user.data.discriminator,
		avatar: user.data.avatar ? getAvatarURL(user.data.id, user.data.avatar) : 'https://cdn.discordapp.com/embed/avatars/0.png'
	}

	const accessToken = sign(payload, process.env.JWT_SECRET || 'test', {
		algorithm: 'HS256',
		expiresIn: 60 * 60 * 2
	})
	// create jwt access token that expires after 2 hours

	res.setHeader('Set-Cookie', serialize('jwt', accessToken, {
		secure: true,
		httpOnly: true
	}))

	res.redirect('/')
}

function getAvatarURL(userId: string, hash: string) {
	let extension = 'png'

	if (hash.startsWith('a_')) {
		extension = 'gif'
	}

	return `https://cdn.discordapp.com/avatars/${userId}/${hash}.${extension}`
}

export default Route
