import Padding from '@/layout/Padding'
import Nav from '@/components/Nav'
import { ReactNode } from 'react'

interface Props {
	children?: ReactNode
	menuId?: string
	back?: boolean
}
function FixedTopbar({ children, ...navProps }: Props) {
	return (
		<div
			className="sticky top-0 w-full max-w-lg bg-white z-10 border-b"
			id="#fixed-nav"
		>
			<Padding>
				<Nav {...navProps} />
				{children}
			</Padding>
		</div>
	)
}

export default FixedTopbar
