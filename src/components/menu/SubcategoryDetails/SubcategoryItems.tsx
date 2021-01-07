import { useMenuId } from '@/hooks/useMenuId'
import { Subcategory } from '@/types/Menu'
import LayoutPadding from '../../layout/LayoutPadding'
import Stack from '../../ui/Stack'
import ItemThumbnail from '../thumbnail/ItemThumbnail'

type Props = {
	/** The subcategory to display */
	subcategory: Subcategory
}

/**
 * Renders the items of a subcategory in a grid
 */
function SubcategoryItems({ subcategory }: Props) {
	const menuId = useMenuId()

	return (
		<LayoutPadding>
			<Stack space={4} className="h-full">
				<h2 className="font-bold text-lg">{subcategory.name}</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-10">
					{subcategory.items.map(item => (
						<ItemThumbnail key={item.id} item={item} menuId={menuId} />
					))}
				</div>
			</Stack>
		</LayoutPadding>
	)
}

export default SubcategoryItems
