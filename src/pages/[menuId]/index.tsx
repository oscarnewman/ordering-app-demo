import marbleClient from '@/api/client'
import { getHomepageData, loadNormalizedMenu } from '@/api/menu'
import BaseLayout from '@/components/layout/BaseLayout'
import Padding from '@/components/layout/LayoutPadding'
import ItemThumbnail from '@/components/menu/ItemThumbnail'
import SubcategoryThumbnail from '@/components/menu/SubcategoryThumbnail'
import Nav from '@/components/Nav'
import Stack from '@/components/ui/Stack'
import Tabs, { TabItem } from '@/components/ui/Tabs'
import { generateBaseStaticProps } from '@/utilities/ssg'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { MenuItem } from '../../components/MenuItem'

export default function Index({ categories, settings }) {
	const router = useRouter()

	const navRef = useRef(null)

	if (router.isFallback) {
		return <div>Loading menu...</div>
	}

	const tabs: TabItem[] = categories.map(category => ({
		title: category.name,
		value: category.id,
		href: `#${category.id}`,
	}))

	return (
		<BaseLayout noPadding locationSettings={settings}>
			<div
				className="sticky top-0 w-full max-w-lg bg-white z-10 border-b"
				id="#fixed-nav"
				ref={navRef}
			>
				<Padding>
					<Nav />
					<Tabs tabs={tabs} containerRef={navRef} />
				</Padding>
			</div>
			<Padding>
				<div>
					{categories.map(category => (
						<div key={category.id} id={category.id} className="pb-10">
							<h2 className="font-bold text-lg sticky top-0 bg-white w-full py-2 ">
								{category.name}
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-10">
								{!category.useSubcategories &&
									category.items.map(item => {
										return (
											<ItemThumbnail
												key={item.id}
												item={item}
												menuId={router.query.menuId as string}
											/>
										)
									})}

								{category.useSubcategories &&
									category.subcategories.map(subcategory => {
										return (
											<SubcategoryThumbnail
												key={subcategory.id}
												subcategory={subcategory}
												menuId={router.query.menuId as string}
											/>
										)
									})}
							</div>
						</div>
					))}
				</div>
			</Padding>
		</BaseLayout>
	)
}

export const getStaticProps = generateBaseStaticProps(async (_, menuId) => {
	await loadNormalizedMenu(menuId)
	return {
		categories: getHomepageData(),
	}
})

export async function getStaticPaths() {
	const menus = await marbleClient.get('/menus')
	const paths = menus.data.results.map(result => ({
		params: {
			menuId: result.id,
		},
	}))

	return {
		paths: paths,
		fallback: false,
	}
}
