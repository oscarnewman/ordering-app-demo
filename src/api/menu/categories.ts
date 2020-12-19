import { denormalize } from '@oscarnewman/normalizr'
import { Category } from '../../types/Menu'
import { marbleSchema } from './../schema'
import { menu, menuById } from './index'

/**
 * Returns a list of categories for the current menu
 */
export function getCategories() {
	const categoryIds = menu.categories.map(({ id }) => id)

	const denormalizedCategories: { categories: Category[] } = denormalize(
		{ categories: categoryIds },
		marbleSchema,
		menuById
	)

	return denormalizedCategories.categories
}
