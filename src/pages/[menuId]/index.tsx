import marbleClient from '@/api/client'
import CategoryTabs from '@/components/CategoryTabs'
import Nav from '@/components/Nav'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export default function Index({ menu }) {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading menu...</div>
	}
	return (
		<div>
			<Nav />
			<CategoryTabs categories={menu.categories} />
		</div>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { menuId } = context.params

	const result = await marbleClient.get(`/menus/${menuId}/formatted`)
	const menu = result.data

	return {
		props: {
			menu,
		},
		revalidate: 60,
	}
}

export async function getStaticPaths() {
	const menus = await marbleClient.get('/menus')
	const paths = menus.data.results.map((result) => ({
		params: {
			menuId: result.id,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}
