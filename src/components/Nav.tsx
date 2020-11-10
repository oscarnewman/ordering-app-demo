import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeftIcon, ShoppingBagIcon } from './icons'

interface Props {
	back?: boolean
	menuId?: string
}
const Nav = ({ menuId, back }: Props) => {
	return (
		<nav className="flex justify-between items-center py-4">
			{back ? (
				<Link href={`/${menuId}` || '/'}>
					<button className="flex items-center font-medium">
						<ArrowLeftIcon className="w-6 mr-2" /> Menu
					</button>
				</Link>
			) : (
				<p className="font-bold">Sharky&apos;s Westlake</p>
			)}
			<ShoppingBagIcon className="w-6" />
		</nav>
	)
}

export default Nav
