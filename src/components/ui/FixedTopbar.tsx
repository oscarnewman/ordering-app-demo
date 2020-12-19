import Padding from '@/components/layout/LayoutPadding'
import Nav from '@/components/ui/Nav'
import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { ReactNode } from 'react'
import BaseLayout from '../layout/BaseLayout'

type Props = StyleProps & {
	children?: ReactNode
	menuId?: string
	back?: boolean
	noBorder?: boolean
}

function FixedTopbar({
	children,
	className,
	style,
	noBorder,
	...navProps
}: Props) {
	return (
		<div
			className={cx('sticky bg-white top-0 z-10 w-full', className)}
			style={style}
		>
			<BaseLayout className={cx({ 'border-b': !noBorder })}>
				<Nav {...navProps} />
				{children && children}
			</BaseLayout>
		</div>
	)
}

export default FixedTopbar
