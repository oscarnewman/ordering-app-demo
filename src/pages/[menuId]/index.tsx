import ssgClient from '@/api/client'
import { getMenu, getMenus } from '@/api/menu'
import { getCategories } from '@/api/menu/categories'
import BaseLayout from '@/components/layout/BaseLayout'
import LayoutPadding, {
	LAYOUT_PADDING_CLASSNAMES,
} from '@/components/layout/LayoutPadding'
import ItemThumbnail from '@/components/menu/ItemThumbnail'
import SubcategoryThumbnail from '@/components/menu/SubcategoryThumbnail'
import Nav from '@/components/Nav'
import Tabs, { TabItem } from '@/components/ui/Tabs'
import { generateBaseStaticProps } from '@/utilities/ssg'
import { useRouter } from 'next/router'
import { useRef } from 'react'

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
				<LayoutPadding>
					<Nav />
				</LayoutPadding>
				<Tabs
					tabs={tabs}
					containerRef={navRef}
					className={LAYOUT_PADDING_CLASSNAMES}
				/>
			</div>
			<LayoutPadding>
				<div>
					{categories.map(category => (
						<div key={category.id} id={category.id} className="pb-10">
							<h2 className="font-bold text-lg sticky top-0 bg-white w-full py-2 ">
								{category.name}
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-10">
								{category.useSubcategories
									? category.subcategories.map(subcategory => {
											return (
												<SubcategoryThumbnail
													key={subcategory.id}
													subcategory={subcategory}
													menuId={router.query.menuId as string}
												/>
											)
									  })
									: category.items.map(item => {
											return (
												<ItemThumbnail
													key={item.id}
													item={item}
													menuId={router.query.menuId as string}
												/>
											)
									  })}
							</div>
						</div>
					))}
				</div>
			</LayoutPadding>
		</BaseLayout>
	)
}

export const getStaticProps = generateBaseStaticProps(async function () {
	return {
		categories: getCategories(),
	}
})

export async function getStaticPaths() {
	const menus = await getMenus()
	const paths = menus.map(menu => ({
		params: {
			menuId: menu.id,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}
