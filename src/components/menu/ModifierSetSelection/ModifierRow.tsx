import { Modifier } from '@/types/Menu'
import { formatMinorAmmount } from '@/utilities/currency'
import classNames from 'classnames'
import { PlusIcon } from '../../ui/icons'

interface Props {
	/** The modifier object */
	modifier: Modifier

	/** Whehter this row is selected */
	selected?: boolean

	/** Callback when this row is clicked */
	onClick: (string) => void
}

/**
 * A single row representing one modifier of a ModifierSet
 */
const ModifierRow = ({ modifier, selected = false, onClick }: Props) => {
	return (
		<button
			className="py-3 flex justify-between items-center focus:outline-none"
			onClick={() => onClick(modifier.id)}
		>
			<div className="flex items-center">
				<div className="relative mr-4">
					<div
						className={classNames('w-4 h-4 rounded-full border z-10', {
							'bg-gray-200 border-gray-200': !selected,
							'bg-theme-secondary border-theme-secondary': selected,
						})}
					/>
					<div
						className={classNames(
							'absolute w-6 h-6 -top-1 -left-1 z-0 rounded-full transition-transform transform duration-150',
							{
								'scale-75': !selected,
								'bg-theme-secondary opacity-25 scale-100': selected,
							}
						)}
					/>
				</div>
				<p
					className={classNames({
						'text-theme-primary': selected,
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
