/* eslint-disable react-hooks/rules-of-hooks */
import marbleClient from '@/api/client'
import {
	getAllSubcategoryIds,
	getSubcategoryData,
	loadNormalizedMenu,
} from '@/api/menu'
import FixedTopbar from '@/components/FixedTopbar'
import BaseLayout from '@/components/layout/BaseLayout'
import Padding from '@/components/layout/LayoutPadding'
import ModifierSetSelection from '@/components/ModifierSetSelection'
import { ArrowRightIcon } from '@/components/ui/icons'
import Stack from '@/components/ui/Stack'
import { formatMinorAmmount } from '@/utilities/currency'
import { generateBaseStaticProps } from '@/utilities/ssg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export default function Subcategory({ subcategory, settings }) {
	const router = useRouter()

	if (!subcategory) return <div>Not here...</div>

	const hasItems = subcategory.items && subcategory.items.length > 0

	const [itemId, setItemId] = useState(
		hasItems ? subcategory.items[0].id : null
	)

	const item = useMemo(
		() => (itemId ? subcategory.items.find(({ id }) => id === itemId) : null),
		[itemId, subcategory.items]
	)

	const modifierSets = useMemo(() => item.modifierSets, [item])

	const modifiers = useMemo(
		() =>
			modifierSets
				.flatMap(({ modifiers }) => modifiers)
				.reduce((all, current) => ({ ...all, [current.id]: current }), {}),
		[modifierSets]
	)

	const [selectedModifiers, setSelectedModifiers] = useState({})
	const total = useMemo(() => {
		if (!item) return null
		const itemPrice = item.amount

		const modifierPrice = Object.keys(selectedModifiers).reduce(
			(total, modifierSetId) => {
				const selections = selectedModifiers[modifierSetId].map(
					id => modifiers[id]
				)
				const price = selections.reduce(
					(total, modifier) => total + modifier.amount,
					0
				)
				return total + price
			},
			0
		)

		return itemPrice + modifierPrice
	}, [item, modifiers, selectedModifiers])

	const handleModifierSelection = (modiferSetId: string) => (
		modifierIds: string[]
	) => {
		setSelectedModifiers({ ...selectedModifiers, [modiferSetId]: modifierIds })
	}

	return (
		<BaseLayout noPadding locationSettings={settings}>
			<FixedTopbar back menuId={router.query.menuId as string} />
			{router.isFallback ? (
				'Loading Item...'
			) : (
				<Stack space={8}>
					<div className="relative w-full pb-2/3 shadow-xl rounded-none content-lg:rounded overflow-hidden block">
						{subcategory.image && (
							<Image
								src={subcategory.image}
								layout="fill"
								priority
								sizes="100%, 50%, 25%"
								className="object-cover object-center"
							/>
						)}
					</div>
					<Padding>
						<Stack space={8}>
							<Stack space={2}>
								<h1 className="font-bold text-lg">{subcategory.name}</h1>
								<p className="text-gray-700">{subcategory.description}</p>
							</Stack>
							<label className="block mt-4">
								<span className="text-gray-700">Type</span>
								<select
									className="mt-1 block w-full border-gray-200 rounded"
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
							<Stack space={4}>
								{modifierSets.map(modifierSet => (
									<ModifierSetSelection
										modifierSet={modifierSet}
										key={modifierSet.id}
										onSelect={handleModifierSelection(modifierSet.id)}
									/>
								))}
							</Stack>
						</Stack>
					</Padding>
					<div className="pb-8 sticky bottom-0 flex justify-stretch items-center">
						<button className="bg-indigo-700 w-full text-white font-medium shadow-xl rounded px-4 py-2 flex justify-between">
							<div className="flex items-center">
								Add to Cart
								<div className="text-indigo-200 font-normal ml-3">
									{formatMinorAmmount(total)}
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
export const getStaticProps = generateBaseStaticProps(
	async (context, menuId) => {
		await loadNormalizedMenu(menuId)
		const { subcategoryId } = context.params
		return {
			subcategory: getSubcategoryData(subcategoryId),
		}
	}
)

export async function getStaticPaths() {
	const menus = await marbleClient.get('/menus')
	const menuId = menus.data.results[0].id
	await loadNormalizedMenu(menuId)
	const subcategories = getAllSubcategoryIds()
	const paths = subcategories.map(subcategoryId => ({
		params: { menuId, subcategoryId },
	}))

	return {
		paths,
		fallback: true,
	}
}
