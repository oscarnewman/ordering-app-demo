import { Category } from '@/types'
import { useEffect, useRef, useState } from 'react'
import CategoryTab from './CategoryTab'
import Stack from '../ui/Stack'

interface Props {
	categories: Category[]
}
export default function CategoryTabs({ categories }: Props) {
	const [activeTab, setActiveTab] = useState(0)

	useEffect(() => {
		const elementToScrollTo = ref.current.children[0].children[activeTab]
		const offsetLeft = elementToScrollTo.offsetLeft
		const totalWidth = ref.current.offsetWidth
		const elemWidth = elementToScrollTo.offsetWidth
		const scrollLeft = offsetLeft - totalWidth / 2 + elemWidth / 2
		ref.current.scroll({
			left: scrollLeft,
			behavior: 'smooth',
		})
	}, [activeTab])

	const ref = useRef(null)

	return (
		<div className="overflow-x-scroll pb-4" id="tabs" ref={ref}>
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
