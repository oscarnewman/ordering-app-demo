import { denormalize } from 'normalizr'
import { marbleClient } from './client'
import { marbleSchema } from './schema'

let menu = null
const menuById: any = {}

export async function loadNormalizedMenu(menuId: string) {
	const result = await marbleClient.get(`/menus/${menuId}/formatted`)
	menu = result.data
	storeNoramlizedMenu(menu)
}

export function storeNoramlizedMenu(menu: object) {
	for (const resourceType of Object.keys(menu)) {
		menuById[resourceType] = {}
		const resources = menu[resourceType]

		for (const item of resources) {
			menuById[resourceType][item.id] = item
		}
	}
}

export function getMenuResource(resourceType: string, resourceId: string) {
	return menuById[resourceType][resourceId]
}

export function getHomepageData() {
	const result = [...menu.categories]
	return result.map(category => {
		if (category.useSubcategories)
			category.subcategories = category.subcategories.map(
				id => menuById.subcategories[id]
			)
		else category.items = category.items.map(id => menuById.items[id])

		return category
	})
}

function hydrate(resource, id) {
	return denormalize({ [resource]: [id] }, marbleSchema, menuById)[resource][0]
}

export function getSubcategoryData(subcategoryId) {
	return hydrate('subcategories', subcategoryId)
}

export function getAllSubcategoryIds() {
	return Object.keys(menuById.subcategories)
}
export function getItemData(itemId) {
	return hydrate('items', itemId)
}
