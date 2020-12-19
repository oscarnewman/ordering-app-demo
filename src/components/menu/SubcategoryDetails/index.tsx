import { Subcategory } from '@/types/Menu'
import { useMemo } from 'react'
import SubcategoryItems from './SubcategoryItems'
import SubcategoryItemsAsVariants from './SubcategoryItemsAsVariants'

type Props = {
	/** The subcategory to display */
	subcategory: Subcategory
}

/**
 * Displays the correct subcategory page type depending on whether items
 * displayed as variants (determiend by whether the subcategory has the `amount` key)
 */
function SubcategoryDetails({ subcategory }: Props) {
	const displayItemsAsVariants = useMemo(
		() =>
			Object.prototype.hasOwnProperty.call(subcategory, 'amount') &&
			subcategory.amount !== undefined &&
			subcategory.amount !== null,
		[subcategory]
	)

	if (displayItemsAsVariants)
		return <SubcategoryItemsAsVariants subcategory={subcategory} />

	return <SubcategoryItems subcategory={subcategory} />
}

export default SubcategoryDetails
