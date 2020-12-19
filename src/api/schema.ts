import {
	Category,
	Discount,
	Item,
	Modifier,
	ModifierSet,
	Subcategory,
} from '@/types/Menu'
import { schema } from '@oscarnewman/normalizr'

/**
 * Marble modifiers
 */
const modifier = new schema.Entity<Modifier>('modifiers')

/**
 * Marble modifier sets
 */
const modifierSet = new schema.Entity<ModifierSet>('modifierSets', {
	modifiers: [modifier],
})

/**
 * Marble menu items
 */
const item = new schema.Entity<Item>('items', {
	modifierSets: [modifierSet],
})

/**
 * Marble menu subcategories
 */
const subcategory = new schema.Entity<Subcategory>(
	'subcategories',
	{
		items: [item],
		preselectedItems: [item],
	},
	{
		// We want to bake the first preselected item's cost into the
		// subcategory, if it exists, so we don't need to include all
		// items unlcess it's strictly necessary
		denormalizeProcessStrategy(subcategory) {
			if (subcategory.preselectedItems?.length > 0) {
				const preselectedItem = subcategory.preselectedItems[0]
				if (preselectedItem?.amount) subcategory.amount = preselectedItem.amount
			}
			return subcategory
		},
	}
)

/**
 * Marble menu discounts
 */
const discount = new schema.Entity<Discount>('discounts')

/**
 * Marble menu categories
 */
const category = new schema.Entity<Category>('categories', {
	subcategories: [subcategory],
	items: [item],
})

/**
 * The total Marble menu schema
 */
export const marbleSchema = {
	categories: [category],
	items: [item],
	subcategories: [subcategory],
	modifierSets: [modifierSet],
	modifers: [modifier],
	discounts: [discount],
}
