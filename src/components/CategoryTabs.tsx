import { Category } from '@/types'
import CategoryTab from './CategoryTab'

interface Props {
	categories: Category[]
}
export default function CategoryTabs({ categories }: Props) {
	return (
		<div>
			{categories.map((category) => (
				<CategoryTab key={category.id} category={category} />
			))}
		</div>
	)
}
