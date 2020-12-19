import { useMenuId } from '@/hooks/useMenuId'
import { CartUpdate } from '@/types/Cart'
import { Subcategory } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import { useMemo, useState } from 'react'
import LayoutPadding from '../../layout/LayoutPadding'
import { ArrowRightIcon } from '../../ui/icons'
import Stack from '../../ui/Stack'
import ItemDetailsHeader from '../ItemDetailsHeader'
import ItemOrderOptions from '../ItemOrderOptions'
import ItemThumbnail from '../thumbnail/ItemThumbnail'
import VariantSelector from '../VariantSelector'

type Props = {
	subcategory: Subcategory
}

function SubcategoryItems({ subcategory }: Props) {
	const menuId = useMenuId()

	return (
		<LayoutPadding>
			<Stack space={8} className="h-full">
				<h2>{subcategory.name}</h2>
				<div className="grid grid-cols-2">
					{subcategory.items.map(item => (
						<ItemThumbnail key={item.id} item={item} menuId={menuId} />
					))}
				</div>
			</Stack>
		</LayoutPadding>
	)
}

export default SubcategoryItems
