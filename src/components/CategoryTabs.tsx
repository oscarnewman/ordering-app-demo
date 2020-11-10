import { Category } from '@/types'
import { useState } from 'react'
import CategoryTab from './CategoryTab'
import Stack from './Stack'

interface Props {
	categories: Category[]
}
export default function CategoryTabs({ categories }: Props) {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className="overflow-x-scroll pb-4">
			<Stack row space={2}>
				{categories.map((category, index) => (
					<CategoryTab
						key={category.id}
						category={category}
						active={activeTab === index}
						onClick={() => setActiveTab(index)}
					/>
				))}
			</Stack>
		</div>
	)
}
