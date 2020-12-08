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

export interface LocationSettings {
	assets: {
		logo: string
		welcomeBackground: string
	}
	theme: {
		primaryColor: string
		secondaryColor: string
		tertiaryColor: string
		borderStyle: 'rounded' | 'square'
	}
	general: {
		name: string
		timeout: number
		localTimezone: string
		displayDineInTakeOut: boolean
		dineInMessage: string
		takeoutMessage: string
		displayTableNumber: boolean
		displayCommentsButton: boolean
		isFundraiserActive: boolean
		loyaltyEnabled: boolean
		welcomeLoginEnabled: boolean
		openingMessage: string
		disclaimer: string
		customerAuthTypes: string[]
	}
	payments: {
		card: {
			enabled: boolean
			tipping: {
				enabled: boolean
				options: {
					low: number
					mid: number
					high: number
					preselected?: number
					type: 'percent' | 'fixed'
				}
			}
		}
		cash: {
			enabled: boolean
			tipping: {
				enabled: boolean
				options: {
					low: number
					mid: number
					high: number
					preselected?: number
					type: 'percent' | 'fixed'
				}
			}
		}
		giftCard: {
			enabled: boolean
		}
	}
	loyalty: {
		modeType: string
		pointsUnlockCurrency: {
			conversionThreshold: number
			currencyEarned: number
			spend: number
			earn: number
			currencyName: string
		}
	}
}
