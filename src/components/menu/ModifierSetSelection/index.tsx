import { ModifierSet } from '@/types/Menu'
import { useCallback, useEffect, useState } from 'react'
import Stack from '../../ui/Stack'
import ModifierRow from './ModifierRow'

interface Props {
	/** The modifier set to display */
	modifierSet: ModifierSet

	/** Callback when a new set of modifiers are selected */
	onSelect: (modifierIds: string[]) => void
}

/**
 * A radio-style group to display a modifier set on an item
 */
const ModifierSetSelection = ({ modifierSet, onSelect }: Props) => {
	const [selected, setSelected] = useState(modifierSet.preselectedModifiers)
	const isSelected = useCallback(id => selected.includes(id), [selected])

	const handleClick = modifierId => {
		// This works like a regular single-select radio group
		if (modifierSet.max === 1 && modifierSet.min === 1) {
			setSelected([modifierId])
		}

		// Removing a modifier
		else if (isSelected(modifierId) && selected.length > modifierSet.min) {
			setSelected(selected.filter(id => id !== modifierId))
		}

		// Adding a new modifier
		else if (
			!isSelected(modifierId) &&
			(!modifierSet.max || selected.length < modifierSet.max)
		) {
			setSelected([...selected, modifierId])
		}
	}

	// Trigger onSelect callback
	useEffect(() => {
		onSelect(selected)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	return (
		<Stack space={4}>
			<Stack space={1}>
				<h3 className="font-bold">{modifierSet.name}</h3>
				<Stack divider>
					{modifierSet.modifiers.map(modifier => (
						<ModifierRow
							key={modifier.id}
							modifier={modifier}
							onClick={handleClick}
							selected={isSelected(modifier.id)}
						/>
					))}
				</Stack>
			</Stack>
		</Stack>
	)
}

export default ModifierSetSelection
