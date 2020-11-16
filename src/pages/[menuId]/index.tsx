import marbleClient from '@/api/client'
import CategoryTabs from '@/components/CategoryTabs'
import Nav from '@/components/Nav'
import BaseLayout from '@/layout/BaseLayout'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Stack from '@/components/ui/Stack'
import { getHomepageData, loadNormalizedMenu } from '@/api/menu'
import Padding from '@/layout/Padding'
import { MenuItem } from '../../components/MenuItem'

export default function Index({ categories }) {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading menu...</div>
	}

	return (
		<BaseLayout noPadding>
			<div
				className="sticky top-0 w-full max-w-lg bg-white z-10 border-b"
				id="#fixed-nav"
			>
				<Padding>
					<Nav />
					<CategoryTabs categories={categories} />
				</Padding>
			</div>
			<Padding>
				<div className="overflow-y-scroll h-full overflow-scroll">
					{categories.map(category => (
						<div key={category.id} id={category.id}>
							<h2 className="font-bold text-lg sticky top-0 bg-white w-full border-b py-2 ">
								{category.name}
							</h2>
							<Stack divider>
								{!category.useSubcategories &&
									category.items.map(item => {
										return <MenuItem key={item.id} item={item} />
									})}

								{category.useSubcategories &&
									category.subcategories.map(subcategory => {
										return <MenuItem key={subcategory.id} item={subcategory} />
									})}
							</Stack>
						</div>
					))}
				</div>
			</Padding>
		</BaseLayout>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { menuId } = context.params

	await loadNormalizedMenu(menuId as string)
	const menu = getHomepageData()

	return {
		props: {
			categories: menu,
		},
		revalidate: 60,
	}
}

export async function getStaticPaths() {
	const menus = await marbleClient.get('/menus')
	const paths = menus.data.results.map(result => ({
		params: {
			menuId: result.id,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}
