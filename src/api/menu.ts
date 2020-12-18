import { denormalize } from 'normalizr'
import { marbleClient } from './client'
import { marbleSchema } from './schema'

let menu = null
const menuById: any = {}

export async function getMenu(menuId: string) {
	const { data } = await marbleClient.get(`/menus/${menuId}`)
	return data
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

export async function loadNormalizedMenu(menuId: string) {
	const result = await marbleClient.get(`/menus/${menuId}/formatted`)
	menu = result.data
	storeNoramlizedMenu(menu)
}

export function getMenuResource(resourceType: string, resourceId: string) {
	return menuById[resourceType][resourceId]
}

export function getHomepageData() {
	const result = [...menu.categories]
	return result.map(category => {
		if (category.useSubcategories)
			category.subcategories = category.subcategories.map(id => {
				const subcategory = menuById.subcategories[id]
				const preselectedItem = menuById.items[subcategory.preselectedItems[0]]
				if (preselectedItem) {
					subcategory.amount = preselectedItem.amount
				}
				return subcategory
			})
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
	const subcategories = menu.categories.reduce(
		(ids, category) => [...ids, ...category.subcategories],
		[]
	)
	return subcategories
}
export function getItemData(itemId) {
	return hydrate('items', itemId)
}
