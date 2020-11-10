import marbleClient from '@/api/client'
import CategoryTabs from '@/components/CategoryTabs'
import Nav from '@/components/Nav'
import BaseLayout from '@/layout/BaseLayout'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import Stack from '@/components/Stack'
import Link from 'next/link'

function MenuItem({ item }) {
	const isSubcategory = useMemo(() => Boolean(item.items), [item])
	const router = useRouter()

	const link = useMemo(() => {
		const resource = isSubcategory ? 'subcategory' : 'item'
		return `${router.asPath}/${resource}/${item.id}`
	}, [isSubcategory, router])

	return (
		<Link href={link}>
			<a className="flex justify-between py-4">
				<Stack space={2} className="mr-4">
					<p className="font-medium">{item.name}</p>
					<p className="text-gray-700 text-sm">{item.description}</p>
				</Stack>
				{item.image && (
					<div className="flex-shrink-0 z-0">
						<Image
							src={item.image}
							width={75}
							height={75}
							className="rounded flex-shrink-0"
						/>
					</div>
				)}
			</a>
		</Link>
	)
}

export default function Index({ menu }) {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading menu...</div>
	}

	const findInMenu = useCallback(
		(resource, resourceId) => {
			return menu[resource].find(({ id }) => id === resourceId)
		},
		[menu]
	)

	return (
		<BaseLayout>
			<Nav />
			<CategoryTabs categories={menu.categories} />
			<div className="relative">
				{menu.categories.map((category) => (
					<div key={category.id} id={category.name} className="relative">
						<h2 className="font-bold text-lg sticky top-0 bg-white w-full border-b py-2 z-10">
							{category.name}
						</h2>
						<Stack divider>
							{!category.useSubcategories &&
								category.items.map((itemId) => {
									const item = findInMenu('items', itemId)
									return <MenuItem key={item.id} item={item} />
								})}

							{category.useSubcategories &&
								category.subcategories.map((subcategoryId) => {
									const subcategory = findInMenu('subcategories', subcategoryId)
									return <MenuItem key={subcategory.id} item={subcategory} />
								})}
						</Stack>
					</div>
				))}
			</div>
		</BaseLayout>
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
