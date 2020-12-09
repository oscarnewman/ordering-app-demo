import { cx } from '@/utilities/classes'
import { forwardRef, RefObject } from 'react'

type Props = {
	name: string
	active?: boolean
	animating: boolean
	onClick: () => void
}

function Tab(
	{ name, onClick, active = false, animating }: Props,
	ref: RefObject<any>
) {
	const showActiveState = active && !animating
	return (
		<button
			ref={ref}
			onClick={onClick}
			className={cx(
				'cursor-pointer whitespace-no-wrap px-4 py-2 text-sm flex-shrink-0 focus:outline-none',
				'font-medium border-b tab',
				{
					'text-gray-400': !active,
					'text-theme-primary': active,
					'border-transparent': !showActiveState,
					'border-theme-primary': showActiveState,
				}
			)}
		>
			{name}
			<style jsx>{`
				.tab {
					border-bottom-width: var(--border-width);
				}
			`}</style>
		</button>
	)
}

export default forwardRef(Tab)
