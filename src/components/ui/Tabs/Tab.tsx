import { cx } from '@/util/classes'

type Props = {
	name: string
	active?: boolean
	onClick: () => void
}

function Tab({ name, onClick, active = false }: Props) {
	return (
		<button
			onClick={onClick}
			className={cx(
				'cursor-pointer whitespace-no-wrap px-2 py-2 rounded text-sm flex-shrink-0',
				{
					'text-gray-600': !active,
					'active border-b-2 border-theme-secondary text-white': active,
				}
			)}
		>
			{name}
		</button>
	)
}

export default Tab
