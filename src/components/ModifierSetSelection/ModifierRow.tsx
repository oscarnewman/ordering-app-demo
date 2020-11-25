import { Modifier } from '@/types'
import { formatMinorAmmount } from '@/util/currency'
import classNames from 'classnames'
import { PlusIcon } from '../ui/icons/Icon'

interface Props {
	modifier: Modifier
	selected?: boolean
	onClick: (string) => void
}
const ModifierRow = ({ modifier, selected = false, onClick }: Props) => {
	return (
		<button
			className="py-2 flex justify-between items-center focus:outline-none"
			onClick={() => onClick(modifier.id)}
		>
			<div className="flex items-center">
				<div
					className={classNames('w-5 h-5 rounded-full border-4 mr-2', {
						'bg-gray-400 border-white': !selected,
						'bg-indigo-600 border-indigo-200': selected,
					})}
				/>
				<p
					className={classNames({
						'text-indigo-800': selected,
						'text-gray-500': !selected,
					})}
				>
					{modifier.name}
				</p>
			</div>
			{modifier.amount > 0 && (
				<p className="flex items-center text-gray-700">
					<PlusIcon className="w-4 text-gray-700" />
					{formatMinorAmmount(modifier.amount)}
				</p>
			)}
		</button>
	)
}

export default ModifierRow
