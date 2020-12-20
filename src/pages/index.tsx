import ssgClient from '@/api/client'
import { getMenus } from '@/api/menu'
import BaseLayout from '@/components/layout/BaseLayout'
import Link from 'next/link'

type Props = {
	/** A list of menu objects, which at least have an ID and name */
	menus: { id: string; name: string }[]
}

/**
 * A catch-all landing page for development so preview links don't 404 (since we only have 1 menu and no QR yet).
 */
function Index({ menus }: Props) {
	return (
		<BaseLayout>
			<div className="prose md:prose-lg pt-24 pb-4">
				<h1>Welcome to Marble.</h1>
				<p className="lead">Let&apos;s get you some food.</p>

				<h2>Available Menus</h2>
			</div>
			{menus.map(menu => (
				<Link key={menu.id} href={`/${menu.id}`}>
					<a>
						<div className="bg-indigo-50 border border-indigo-100 rounded text-indigo-900 p-4">
							<p className="text-xl font-bold">{menu.name}</p>
						</div>
					</a>
				</Link>
			))}
		</BaseLayout>
	)
}

export async function getStaticProps() {
	return {
		props: {
			menus: await getMenus(),
		},
	}
}

export default Index
