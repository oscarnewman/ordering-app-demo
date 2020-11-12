import { Category } from '@/types'
import classNames from 'classnames'
import { useState } from 'react'

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

	return (
		<a
			onClick={handleClick}
			href={`#${category.name}`}
			className={classNames(
				'cursor-pointer whitespace-no-wrap px-2 py-2 rounded text-sm',
				{ 'text-gray-600': !active, 'text-white bg-gray-900': active }
			)}
		>
			{category.name}
		</a>
	)
}
