import Padding from '@/layout/LayoutPadding'
import Nav from '@/components/Nav'
import { HasChildren } from '@/util/children'

type Props = HasChildren & {
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
