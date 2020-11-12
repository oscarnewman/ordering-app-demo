import { Modifier } from '@/types'
import { formatMinorAmmount } from '@/util/currency'
import classNames from 'classnames'

interface Props {
	modifier: Modifier
	selected?: boolean
	onClick: (string) => void
}
const ModifierRow = ({ modifier, selected = false, onClick }: Props) => {
	return (
		<button
			className="py-2 flex justify-between items-center"
			onClick={() => onClick(modifier.id)}
		>
			<div className="flex items-center">
				<div
					className={classNames('w-5 h-5 rounded-full border-4 mr-2', {
						'bg-gray-400 border-white': !selected,
						'bg-indigo-600 border-indigo-200': selected,
					})}
				/>
				<p className={classNames({ 'text-indigo-800': selected })}>
					{modifier.name}
				</p>
			</div>
			<p>{formatMinorAmmount(modifier.amount)}</p>
		</button>
	)
}

export default ModifierRow