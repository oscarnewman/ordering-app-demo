import { Item } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import { useEffect, useState } from 'react'

type Props = {
	/** A list of items (variants) to dispaly */
	items: Item[]

	/** Initial selected item string (defaults to first item) */
	defaultSelection?: string

	/** Callback for when an item is selected */
	onSelect: (itemId: string) => void
}

function VariantSelector({ items, defaultSelection, onSelect }: Props) {
	const [selectedItemId, setSelectedItemId] = useState(
		defaultSelection || items[0].id
	)

	useEffect(() => {
		onSelect(selectedItemId)
	}, [selectedItemId, onSelect])

	return (
		<label className="block mt-4">
			<span className="text-gray-700">Type</span>
			<select
				className="mt-1 block w-full border-gray-200 rounded"
				value={selectedItemId}
				onChange={e => setSelectedItemId(e.target.value)}
			>
				{items.map(item => (
					<option key={item.id} value={item.id}>
						{item.name} ({formatMinorAmmount(item.amount)})
					</option>
				))}
			</select>
		</label>
	)
}

export default VariantSelector
