import { NowRequest, NowResponse } from '@vercel/node'

function Route(req: NowRequest, res: NowResponse) {
	const date = new Date().toString()
	res.status(200).send(date)
}

export default Route
