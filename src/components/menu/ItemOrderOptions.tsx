import ModifierSetSelection from '@/components/menu/ModifierSetSelection'
import Stack from '@/components/ui/Stack'
import { CartUpdate } from '@/types/Cart'
import { Item, Modifier } from '@/types/Menu'
import { useEffect, useMemo, useState } from 'react'

type Props = {
	/** The item to display options for */
	item: Item

	/** Callback when the item selection changes */
	updateItemSelection: (update: CartUpdate) => void
}

/**
 * Displays any item-specific options for the detail page, like modifiers
 */
function ItemOrderOptions({ item, updateItemSelection }: Props) {
	// Collect all possible modifiers across every modifier set
	const allModifiers: { [key: string]: Modifier } = useMemo(
		() =>
			item.modifierSets
				.flatMap(({ modifiers }) => modifiers)
				.reduce((all, current) => ({ ...all, [current.id]: current }), {}),
		[item.modifierSets]
	)

	const [selectedModifiers, setSelectedModifiers] = useState<{
		[key: string]: string[]
	}>({})

	// Calculate the total cost of item + modifiers
	const total = useMemo(
		() =>
			Object.keys(selectedModifiers)
				.flatMap(modifierSetId => [...selectedModifiers[modifierSetId]]) // Get list of ALL selected mod. IDs
				.map(modifierId => allModifiers[modifierId].amount) // Turn each into its own cost
				.reduce((total, current) => total + current, item.amount), // Sum it up (+ item.amount)
		[allModifiers, item.amount, selectedModifiers]
	)

	useEffect(() => {
		updateItemSelection({
			itemId: item.id,
			modifierSets: selectedModifiers,
			totalAmount: total,
		})
	}, [item.id, total, selectedModifiers, updateItemSelection])

	// Curried callback per modifer set ID
	const handleModifierSelection = (modiferSetId: string) => (
		modifierIds: string[]
	) => {
		setSelectedModifiers({
			...selectedModifiers,
			[modiferSetId]: modifierIds,
		})
	}

	return (
		<Stack space={4}>
			{item.modifierSets
				.filter(modifierSet => modifierSet.modifiers.length > 0)
				.map(modifierSet => (
					<ModifierSetSelection
						modifierSet={modifierSet}
						key={modifierSet.id}
						onSelect={handleModifierSelection(modifierSet.id)}
					/>
				))}
		</Stack>
	)
}

export default ItemOrderOptions
