import { Category } from '@/types'
import classNames from 'classnames'

interface Props {
	category: Category
	active?: boolean
	onClick: () => void
}

export default function CategoryTab({ category, active }: Props) {
	const handleClick = e => {
		e.preventDefault()
		document
			.querySelector(`#${category.id}`)
			.scrollIntoView({ behavior: 'smooth' })
	}
	return (
		<a
			onClick={handleClick}
			href={`#${category.name}`}
			className={classNames('whitespace-no-wrap px-2 py-2 rounded text-sm', {
				'text-white bg-gray-900': active,
				'text-gray-600': !active,
			})}
		>
			{category.name}
		</a>
	)
}
