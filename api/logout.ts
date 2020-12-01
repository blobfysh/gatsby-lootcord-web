import { NowRequest, NowResponse } from '@vercel/node'
import { serialize } from 'cookie'

async function Route(req: NowRequest, res: NowResponse) {
	if (req.method !== 'POST') {
		return res.status(400).send('Invalid Request')
	}

	// expire jwt cookie
	res.setHeader('Set-Cookie', serialize('jwt', '', {
		expires: new Date(0)
	}))

	res.status(200).send('Success')
}

export default Route
