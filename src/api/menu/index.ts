import { Menu, MenuStub, NormalizedMenu } from '@/types/Menu'
import { denormalize } from '@oscarnewman/normalizr'
import { ssgClient } from '../client'
import { marbleSchema } from './../schema'

export let menu: Menu = null
export const menuById: NormalizedMenu = {
	categories: {},
	subcategories: {},
	items: {},
	modifier: {},
	modifierSets: {},
	discounts: {},
}

/**
 * Takes the default menu API response and stores it in a fully
 * normalized format in memory
 * @param menu The API response menu object
 */
function storeNoramlizedMenu(menu: Menu) {
	for (const resourceType of Object.keys(menu)) {
		menuById[resourceType] = {}
		const resources = menu[resourceType]

		for (const item of resources) {
			menuById[resourceType][item.id] = item
		}
	}
}

/**
 * Loads a list of all menus avaiable to the current client.
 */
export async function getMenus(): Promise<MenuStub[]> {
	const res = await ssgClient.get('/menus')
	return res.data.results
}

/**
 * Loads a menu given a menu ID
 * @param menuId The menu to get
 */
export async function getMenu(menuId: string): Promise<MenuStub> {
	const { data } = await ssgClient.get(`/menus/${menuId}`)
	return data
}

/**
 * Loads a menu's full item data given a menu ID
 * @param menuId The menu to load
 */
export async function loadNormalizedMenu(menuId: string) {
	const result = await ssgClient.get(`/menus/${menuId}/formatted`)
	menu = result.data
	storeNoramlizedMenu(menu)
}

/**
 * Once the normalized menu has been loaded, turns an item key
 * and ID into a full object from the menu
 * @param resource The resource key to load (i.e. 'items' or 'categories')
 * @param id The id of the item to load
 */
export function hydrate<T>(resource: string, id: string) {
	return denormalize({ [resource]: [id] }, marbleSchema, menuById)[
		resource
	][0] as T
}
