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
	amount: number
	name: string
	description: string
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
	subcategories: Subcategory[]
}

export interface Discount {}

export interface Menu {
	categories: Category[]
	subcategories: Subcategory[]
	items: Item[]
	modifier: Modifier[]
	modifierSets: ModifierSet[]
	discounts: Discount[]
}

type KeyedItems<T> = { [key: string]: T }
export interface NormalizedMenu {
	categories: KeyedItems<Category>
	subcategories: KeyedItems<Subcategory>
	items: KeyedItems<Item>
	modifier: KeyedItems<Modifier>
	modifierSets: KeyedItems<ModifierSet>
	discounts: KeyedItems<Discount>
}

export interface MenuStub {
	id: string
	locationId: string
	brandLevelId: string
	name: string
	type: string
	brandId: string
}
