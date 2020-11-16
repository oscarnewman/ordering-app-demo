import marbleClient from '@/api/client'
import {
	getAllSubcategoryIds,
	getSubcategoryData,
	loadNormalizedMenu,
} from '@/api/menu'
import FixedTopbar from '@/components/FixedTopbar'
import ModifierSetSelection from '@/components/ModifierSetSelection'
import { ArrowRightIcon } from '@/components/ui/icons'
import Stack from '@/components/ui/Stack'
import BaseLayout from '@/layout/BaseLayout'
import Padding from '@/layout/Padding'
import { Modifier } from '@/types'
import { formatMinorAmmount } from '@/util/currency'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export default function Subcategory({ subcategory }) {
	const router = useRouter()

	if (!subcategory) return <div>Not here...</div>

	const hasItems = subcategory.items && subcategory.items.length > 0

	const [itemId, setItemId] = useState(
		hasItems ? subcategory.items[0].id : null
	)

	const item = useMemo(
		() => (itemId ? subcategory.items.find(({ id }) => id === itemId) : null),
		[itemId]
	)

	const modifierSets = useMemo(() => item.modifierSets, [item, subcategory])

	const modifiers = useMemo(
		() =>
			modifierSets
				.flatMap(({ modifiers }) => modifiers)
				.reuce((all, current) => ({ ...all, [current.id]: current })),
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
	}, [item, selectedModifiers])

	const handleModifierSelection = (modiferSetId: string) => (
		modifierIds: string[]
	) => {
		setSelectedModifiers({ ...selectedModifiers, [modiferSetId]: modifierIds })
	}

	return (
		<BaseLayout noPadding>
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
