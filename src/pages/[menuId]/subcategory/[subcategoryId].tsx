import marbleClient from '@/api/client'
import {
	getAllSubcategoryIds,
	getSubcategoryData,
	loadNormalizedMenu,
} from '@/api/menu'
import ModifierSetSelection from '@/components/ModifierSetSelection'
import Nav from '@/components/Nav'
import Stack from '@/components/Stack'
import BaseLayout from '@/layout/BaseLayout'
import Padding from '@/layout/Padding'
import { formatMinorAmmount } from '@/util/currency'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export default function Subcategory({ subcategory }) {
	const router = useRouter()

	if (!subcategory) {
		return 'uh oh 404'
	}

	const [itemId, setItemId] = useState(subcategory.items[0].id)

	const item = useMemo(
		() => subcategory.items.find(({ id }) => id === itemId),
		[itemId]
	)

	const modifierSets = useMemo(() => {
		return item.modifierSets || []
	}, [item, subcategory])

	return (
		<BaseLayout noPadding>
			<div className="px-4 content-lg:px-0">
				<Nav back menuId={router.query.menuId as string} />
			</div>
			{router.isFallback ? (
				'Loading Item...'
			) : (
				<Stack space={8}>
					<div className="relative w-full pb-2/3 shadow-xl rounded-none content-lg:rounded overflow-hidden block">
						<Image
							src={subcategory.image}
							layout="fill"
							priority
							sizes="100%, 50%, 25%"
							className="object-cover object-center"
						/>
					</div>
					<Padding>
						<Stack space={4}>
							<Stack space={2}>
								<h1 className="font-bold text-lg">{subcategory.name}</h1>
								<p className="text-gray-700">{subcategory.description}</p>
							</Stack>
							<label className="block mt-4">
								<span className="text-gray-700">Type</span>
								<select
									className="form-select mt-1 block w-full"
									value={itemId}
									onChange={e => setItemId(e.target.value)}
								>
									{subcategory.items.map(item => (
										<option key={item.id} value={item.id}>
											{item.name} ({formatMinorAmmount(item.amount)})
										</option>
									))}
								</select>
							</label>
							<Stack space={12}>
								{modifierSets.map(modifierSet => (
									<ModifierSetSelection
										modifierSet={modifierSet}
										key={modifierSet.id}
									/>
								))}
							</Stack>
						</Stack>
					</Padding>
				</Stack>
			)}
		</BaseLayout>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { menuId, subcategoryId } = context.params

	await loadNormalizedMenu(menuId as string)
	const subcategory = getSubcategoryData(subcategoryId)

	return {
		props: {
			subcategory,
		},
		revalidate: 60,
	}
}

export async function getStaticPaths() {
	// const menus = await marbleClient.get('/menus')
	// const menuId = menus.data.results[0].id
	// await loadNormalizedMenu(menuId)
	// const subcategories = getAllSubcategoryIds()
	// const paths = subcategories.map(subcategoryId => ({
	// 	params: { menuId, subcategoryId },
	// }))

	return {
		paths: [],
		fallback: true,
	}
}
