import { Item } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import BaseThumbnail from './BaseThumbnail'

type Props = {
	/** The menu item to display */
	item: Item

	/** The current menu id */
	menuId: string
}

/**
 * Display a marble menu item thumbnail
 */
function ItemThumbnail({ item, menuId }: Props) {
	return (
		<BaseThumbnail
			title={item.name}
			subtitle={formatMinorAmmount(item.amount)}
			image={item.image}
			href={`/${menuId}/item/${item.id}`}
		/>
	)
}

export default ItemThumbnail
