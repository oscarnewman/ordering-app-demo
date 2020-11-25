import marbleClient from './client'
import { getMenu } from './menu'

export async function getLocationSettings(menuId: string) {
	const { locationId } = await getMenu(menuId)

	const { data } = await marbleClient.get(
		`/locations/${locationId}/formatted-settings`
	)
	return data
}
