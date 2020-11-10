import axios from 'axios'

/**
 * This function creates a custom instance of axios so we can make a request to the Marble server.
 */
export const marbleClient = axios.create({
	baseURL: process.env.MARBLE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Marble-Audience': 'thunderbolt',
		'X-Marble-Client': 'mobile',
		Authorization: `Bearer ${process.env.MARBLE_ACCESS_TOKEN}`,
	},
})

export default marbleClient
