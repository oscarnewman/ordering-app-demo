import { schema } from 'normalizr'

const category = new schema.Entity('categories')
const modifier = new schema.Entity('modifiers')
const modifierSet = new schema.Entity('modifierSets', {
	modifiers: [modifier],
})
const item = new schema.Entity('items', {
	modifierSets: [modifierSet],
})
const subcategory = new schema.Entity('subcategories', {
	items: [item],
})

const discount = new schema.Entity('discounts')

export const marbleSchema = {
	categories: [category],
	items: [item],
	subcategories: [subcategory],
	modifierSets: [modifierSet],
	modifers: [modifier],
	discounts: [discount],
}
