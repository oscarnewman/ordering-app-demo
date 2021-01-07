import { getItem } from '@/api/menu/items'
import BaseLayout from '@/components/layout/BaseLayout'
import ItemDetailsHeader from '@/components/menu/ItemDetailsHeader'
import ItemOrderOptions from '@/components/menu/ItemOrderOptions'
import { ArrowRightIcon } from '@/components/ui/icons'
import Nav from '@/components/ui/Nav'
import Stack from '@/components/ui/Stack'
import { CartUpdate } from '@/types/Cart'
import { formatMinorAmmount } from '@/utilities/currency'
import { generateBaseStaticProps } from '@/utilities/ssg'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Item({ item, settings }) {
	const router = useRouter()

	const [cartUpdate, setCartUpdate] = useState<CartUpdate>({
		itemId: item?.id,
		modifierSets: {},
		totalAmount: item?.amount,
	})

	return (
		<BaseLayout noPadding locationSettings={settings}>
			<div className="px-4 content-lg:px-0">
				<Nav back menuId={router.query.menuId as string} />
			</div>
			{router.isFallback ? (
				'Loading Item...'
			) : (
				<Stack space={8}>
					<ItemDetailsHeader menuItem={item} />
					<ItemOrderOptions item={item} updateItemSelection={setCartUpdate} />
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
				</Stack>
			)}
		</BaseLayout>
	)
}

export const getStaticProps = generateBaseStaticProps(function (context) {
	const itemId = context.params.itemId as string

	return {
		item: getItem(itemId),
	}
})

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	}
}
