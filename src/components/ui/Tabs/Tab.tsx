import { cx } from '@/util/classes'
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
				'border-b-4 font-medium',
				{
					'text-gray-400': !active,
					'text-theme-primary': active,
					'border-transparent': !showActiveState,
					'show-border': showActiveState,
				}
			)}
		>
			{name}
			<style jsx>{`
				.show-border {
					border-width-bottom: var(--border-width);
				}
			`}</style>
		</button>
	)
}

export default forwardRef(Tab)
