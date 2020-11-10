import { StyleProps } from '@/util/styleProps'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	space?: number | string
	divider?: boolean
	row?: boolean
}
const Stack = ({
	children,
	space = '0',
	divider = false,
	row = false,
	className,
	style,
}: Props & StyleProps) => {
	return (
		<div
			className={classNames(
				'flex',
				{ 'flex-col': !row, 'flex-row': row, 'divide-y': divider },
				`space-${row ? 'x' : 'y'}-${space}`,
				className
			)}
			style={style}
		>
			{children}
		</div>
	)
}

export default Stack