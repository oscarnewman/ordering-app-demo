import { Subcategory } from '../../types/Menu'
import { hydrate, menu } from './index'

/**
 * Returns all subcategory ids for a given menu
 */
export function getAllSubcategoryIds() {
	const subcategories: string[] = menu.categories.reduce(
		(ids, category) => [...ids, ...category.subcategories],
		[]
	)
	return subcategories
}

/**
 * Returns a specific subcategory given its is ID
 * @param subcategoryId The subcategory to retrieve's ID
 */
export function getSubcategory(subcategoryId: string) {
	return hydrate<Subcategory>('subcategories', subcategoryId)
}
