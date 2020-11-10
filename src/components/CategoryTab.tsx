import { Category } from '@/types'

interface Props {
	category: Category
	active?: boolean
}
export default function CategoryTab({ category, active }: Props) {
	return <button>{category.name}</button>
}
