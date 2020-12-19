/* eslint-disable react-hooks/rules-of-hooks */
import { getMenus, loadNormalizedMenu } from '@/api/menu'
import ItemOrderOptions from '@/components/menu/ItemOrderOptions'
import { getAllSubcategoryIds, getSubcategory } from '@/api/menu/subcategories'
import BaseLayout from '@/components/layout/BaseLayout'
import LayoutPadding from '@/components/layout/LayoutPadding'
import ItemDetailsHeader from '@/components/menu/ItemDetailsHeader'
import VariantSelector from '@/components/menu/VariantSelector'
import FixedTopbar from '@/components/ui/FixedTopbar'
import { ArrowRightIcon } from '@/components/ui/icons'
import Stack from '@/components/ui/Stack'
import { LocationSettingsProvider } from '@/contexts/locationSettings'
import { CartUpdate } from '@/types/Cart'
import { LocationSettings } from '@/types/LocationSettings'
import { Subcategory } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import { generateBaseStaticProps } from '@/utilities/ssg'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

interface Props {
	subcategory: Subcategory
	settings: LocationSettings
}

export default function SubcategoryPage({ subcategory, settings }: Props) {
	const router = useRouter()

	if (!subcategory) return <div>Not here...</div>

	const hasItems = subcategory?.items?.length > 0

	const [itemId, setItemId] = useState(
		hasItems ? subcategory.items[0].id : null
	)

	const item = useMemo(
		() => (itemId ? subcategory.items.find(({ id }) => id === itemId) : null),
		[itemId, subcategory.items]
	)

	const [cartUpdate, setCartUpdate] = useState<CartUpdate>({
		itemId: item.id,
		modifierSets: {},
		totalAmount: item.amount,
	})

	return (
		<LocationSettingsProvider settings={settings}>
			<Stack space={6}>
				<FixedTopbar back menuId={router.query.menuId as string} />
				<BaseLayout noPadding>
					{!subcategory ? (
						router.isFallback ? (
							'Loading Item...'
						) : (
							<Error statusCode={404} />
						)
					) : (
						<Stack space={8}>
							<ItemDetailsHeader menuItem={subcategory} />
							<LayoutPadding>
								<Stack space={8}>
									<VariantSelector
										items={subcategory.items}
										onSelect={setItemId}
										defaultSelection={subcategory.preselectedItems?.[0]}
									/>
									<ItemOrderOptions
										item={item}
										updateItemSelection={setCartUpdate}
									/>
								</Stack>
							</LayoutPadding>
							<LayoutPadding className="pb-8 sticky bottom-0 flex justify-stretch items-center">
								<button className="bg-theme-secondary w-full text-white font-medium shadow-xl rounded px-4 py-2 flex justify-between">
									<div className="flex items-center">
										Add to Order
										<div className="text-theme-tertiary opacity-80 font-normal ml-3">
											{formatMinorAmmount(cartUpdate.totalAmount)}
										</div>
									</div>
									<ArrowRightIcon className="w-6 text-white" />
								</button>
							</LayoutPadding>
						</Stack>
					)}
				</BaseLayout>
			</Stack>
		</LocationSettingsProvider>
	)
}
export const getStaticProps = generateBaseStaticProps(async function (context) {
	const subcategoryId = context.params.subcategoryId as string
	return {
		subcategory: getSubcategory(subcategoryId),
	}
})

export async function getStaticPaths() {
	const menus = await getMenus()
	const { id } = menus[0]

	await loadNormalizedMenu(id)
	const subcategories = getAllSubcategoryIds()
	const paths = subcategories.map(subcategoryId => ({
		params: { menuId: id, subcategoryId },
	}))

	return {
		paths,
		fallback: true,
	}
}
