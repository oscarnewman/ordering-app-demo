import marbleClient from '@/api/client'
import { getHomepageData, loadNormalizedMenu } from '@/api/menu'
import CategoryTabs from '@/components/CategoryTabs'
import BaseLayout from '@/components/layout/BaseLayout'
import Padding from '@/components/layout/LayoutPadding'
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
					<Tabs tabs={tabs} containerRef={navRef} addScrollbarPadding />
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
		paths,
		fallback: false,
	}
}
