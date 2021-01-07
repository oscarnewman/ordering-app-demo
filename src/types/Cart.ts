export interface CartUpdate {
	itemId: string
	modifierSets: { [key: string]: string[] }
	totalAmount: number
}
