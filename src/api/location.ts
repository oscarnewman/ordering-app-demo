import { LocationSettings } from '@/types/LocationSettings'
import ssgClient from './client'
import { getMenu } from './menu'

/**
 * Gets location settings for a specific menu ID
 * @param menuId The menu ID to get location settings for
 */
export async function getLocationSettings(menuId: string) {
	const { locationId } = await getMenu(menuId)

	const { data } = await ssgClient.get<LocationSettings>(
		`/locations/${locationId}/formatted-settings`
	)
	return data
}
