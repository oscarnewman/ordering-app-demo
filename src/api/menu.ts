import { marbleClient } from './client'

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

export function getSubcategoryData(subcategoryId) {
	const subcategory = { ...menuById.subcategories[subcategoryId] }
	subcategory.items = subcategory.items.map(itemId => {
		const item = menuById.items[itemId]
		return item
	})
	return subcategory
}
