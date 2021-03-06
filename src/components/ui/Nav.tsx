import Link from 'next/link'
import Icon from './icons/Icon'
import Logo from './Logo'

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
						<Icon icon="arrow-left" className="w-6 mr-2" /> Menu
					</button>
				</Link>
			) : (
				<div className="w-44">
					<Logo />
				</div>
			)}
			<Icon icon="shopping-bag" className="w-6" />
		</nav>
	)
}

export default Nav
