import { Subcategory } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import BaseThumbnail from './BaseThumbnail'

type Props = {
	/** The menu subcategory to display */
	subcategory: Subcategory

	/** The current menu id */
	menuId: string
}

/**
 * Display a marble subcategory thumbnail
 */
function SubcategoryThumbnail({ subcategory, menuId }: Props) {
	return (
		<BaseThumbnail
			title={subcategory.name}
			subtitle={
				subcategory.amount
					? formatMinorAmmount(subcategory.amount)
					: subcategory.items.length === 1
					? `${subcategory.items.length} Item`
					: `${subcategory.items.length} Items`
			}
			stacked={!subcategory.amount}
			image={subcategory.image}
			href={`${menuId}/subcategory/${subcategory.id}`}
		/>
	)
}

export default SubcategoryThumbnail
