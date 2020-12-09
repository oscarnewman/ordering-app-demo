import Padding from '@/components/layout/LayoutPadding'
import Nav from '@/components/Nav'
import { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	menuId?: string
	back?: boolean
}

function FixedTopbar({ children, ...navProps }: Props) {
	return (
		<div className="sticky top-0 z-10 w-full max-w-lg border-b" id="#fixed-nav">
			<Padding>
				<Nav {...navProps} />
				{children}
			</Padding>
		</div>
	)
}

export default FixedTopbar
