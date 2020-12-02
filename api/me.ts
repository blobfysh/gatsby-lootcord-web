import { NowRequest, NowResponse } from '@vercel/node'
import { verify } from 'jsonwebtoken'

async function Route(req: NowRequest, res: NowResponse) {
	if (req.method !== 'GET') {
		return res.status(400).send('Invalid Request')
	}

	const accessToken = req.cookies.jwt

	if (!accessToken) {
		return res.status(200).send({})
	}

	let payload
	try {
		payload = verify(accessToken, process.env.JWT_SECRET || 'test')
	}
	catch (err) {
		return res.status(200).send({})
	}

	res.status(200).send(payload)
}

export default Route
