export interface Modifier {
	id: string
	name: string
	amount: number
	image: string
	isRemoval: string
}
export interface ModifierSet {
	id: string
	modifiers: Modifier[]
	name: string
	isBase: boolean
	max: number
	min: number
	preselectedModifiers: string[]
}

export interface Item {
	allergens: string
	amount: number
	description: string
	id: string
	image: string
	isAlcohol: boolean
	isCold: boolean
	isGlutenFree: boolean
	isUpsell: boolean
	isVegetarian: boolean
	maxQuantity?: number
	modifierSets: ModifierSet[]
	name: string
	upsellCategories: string[]
	variationGroups: any[]
}
export interface Subcategory {
	id: string
	name: string
	image: string
	items: Item[]
	maxQuantity?: number
	preselectedItems: string[]
}
export interface Category {
	id: string
	name: string
	useSubcategories: boolean
	image: string
}
