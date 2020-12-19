import { CartUpdate } from '@/types/Cart'
import { Subcategory } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import { useMemo, useState } from 'react'
import LayoutPadding from '../../layout/LayoutPadding'
import { ArrowRightIcon } from '../../ui/icons'
import Stack from '../../ui/Stack'
import ItemDetailsHeader from '../ItemDetailsHeader'
import ItemOrderOptions from '../ItemOrderOptions'
import VariantSelector from '../VariantSelector'

type Props = {
	subcategory: Subcategory
}

function SubcategoryItemsAsVariants({ subcategory }: Props) {
	const [itemId, setItemId] = useState(subcategory.items[0].id)

	const item = useMemo(
		() => subcategory.items.find(({ id }) => id === itemId),
		[itemId, subcategory.items]
	)

	const [cartUpdate, setCartUpdate] = useState<CartUpdate>({
		itemId: item.id,
		modifierSets: {},
		totalAmount: item.amount,
	})

	return (
		<Stack space={8} className="h-full">
			<ItemDetailsHeader menuItem={subcategory} />
			<LayoutPadding className="h-full">
				<Stack space={8}>
					<VariantSelector
						items={subcategory.items}
						onSelect={setItemId}
						defaultSelection={subcategory.preselectedItems?.[0].id}
					/>
					<ItemOrderOptions item={item} updateItemSelection={setCartUpdate} />
				</Stack>
				<div className="py-8 sticky bottom-0 flex justify-stretch items-center">
					<button
						className={
							'bg-theme-secondary w-full text-white font-medium shadow-xl rounded px-4 py-2 flex justify-between ' +
							'ring-2 ring-offset-2 ring-transparent focus:ring-theme-secondary focus:outline-none'
						}
					>
						<div className="flex items-center">
							Add to Order
							<div className="text-theme-tertiary opacity-80 font-normal ml-3">
								{formatMinorAmmount(cartUpdate.totalAmount)}
							</div>
						</div>
						<ArrowRightIcon className="w-6 text-white" />
					</button>
				</div>
			</LayoutPadding>
		</Stack>
	)
}

export default SubcategoryItemsAsVariants
