import { authenticateMenuRetrieval } from '@/api/auth'
import axios from 'axios'

let ACCESS_TOKEN = null

/**
 * These are headers common to every request we'll make
 */
export const baseHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'X-Marble-Audience': 'thunderbolt',
	'X-Marble-Client': 'mobile',
}

/**
 * This function creates a custom instance of axios so we can make a request to the Marble server.
 */
export const marbleClient = axios.create({
	baseURL: process.env.MARBLE_API_URL,
	headers: baseHeaders,
})

/**
 * This make sure we have an access token before making any request
 * by authenticating with our secret device code from .env
 */
marbleClient.interceptors.request.use(async config => {
	if (!ACCESS_TOKEN) {
		const token = await authenticateMenuRetrieval()
		ACCESS_TOKEN = token
	}
	config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
	return config
})

export default marbleClient
