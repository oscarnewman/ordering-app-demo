import Axios from 'axios'
import { baseHeaders } from './client'

export async function authenticateMenuRetrieval() {
	const { data } = await Axios.post(
		`${process.env.MARBLE_API_URL}/auth/login`,
		{},
		{
			headers: {
				...baseHeaders,
				Authorization: `Device ${process.env.MARBLE_DEVICE_CODE}`,
			},
		}
	)
	const { token } = data.session

	return token
}
