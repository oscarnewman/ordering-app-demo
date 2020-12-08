import Axios from 'axios'
import { baseHeaders } from './client'

/**
 * Authenticates a device code against the API and returns the
 * generated access token.
 *
 * This will only ever be called at build-time, so we can let errors
 * bubble up.
 */
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
