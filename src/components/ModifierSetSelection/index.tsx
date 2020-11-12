import { ModifierSet } from '@/types'
import { useCallback, useState } from 'react'
import Stack from '../Stack'
import ModifierRow from './ModifierRow'

interface Props {
	modifierSet: ModifierSet
}

const ModifierSetSelection = ({ modifierSet }: Props) => {
	const [selected, setSelected] = useState(modifierSet.preselectedModifiers)

	const handleClick = modifierId => {
		console.log(modifierSet.min, modifierSet.max, selected)
		if (modifierSet.max === 1 && modifierSet.min === 1) {
			setSelected([modifierId])
		} else if (
			selected.includes(modifierId) &&
			selected.length > modifierSet.min
		) {
			// remove
			setSelected(selected.filter(id => id !== modifierId))
		} else if (
			!selected.includes(modifierId) &&
			(!modifierSet.max || selected.length < modifierSet.max)
		) {
			// add
			setSelected([...selected, modifierId])
		}
	}

	const isSelected = useCallback(id => selected.includes(id), [selected])

	return (
		<Stack space={4}>
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
	)
}

export default ModifierSetSelection