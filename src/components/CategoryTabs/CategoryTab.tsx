import { useLocationSettings } from '@/contexts/locationSettings'
import { Category } from '@/types/types'
import classNames from 'classnames'

interface Props {
	category: Category
	active?: boolean
	onClick: () => void
}

export default function CategoryTab({ category, onClick, active }: Props) {
	const handleClick = e => {
		e.preventDefault()

		const element = document.getElementById(category.id)
		const paddingHeight = document.getElementById('#fixed-nav').offsetHeight
		const amountToScroll = element.offsetTop - paddingHeight
		window.scroll({ top: amountToScroll, behavior: 'smooth' })
		onClick()
	}

	const theme = useLocationSettings()

	return (
		<a
			onClick={handleClick}
			href={`#${category.name}`}
			className={classNames(
				'cursor-pointer whitespace-no-wrap px-2 py-2 rounded text-sm flex-shrink-0',
				{
					'text-gray-600': !active,
					'active bg-theme-secondary text-white': active,
				}
			)}
		>
			{category.name}
		</a>
	)
}
