import marbleClient from '@/api/client'
import { getItemData, loadNormalizedMenu } from '@/api/menu'
import Nav from '@/components/Nav'
import BaseLayout from '@/layout/BaseLayout'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Stack from '@/components/Stack'

export default function Item({ item }) {
	const router = useRouter()

	return (
		<BaseLayout noPadding>
			<div className="px-4 content-lg:px-0">
				<Nav back menuId={router.query.menuId as string} />
			</div>
			{router.isFallback ? (
				'Loading Item...'
			) : (
				<Stack space={8}>
					<div className="relative w-full pb-2/3 shadow-xl rounded-none content-lg:rounded overflow-hidden block">
						<Image
							src={item.image}
							layout="fill"
							priority
							sizes="100%, 50%, 25%"
							className="object-cover object-center"
						/>
					</div>
					<div className="px-4 content-lg:px-0">
						<h1 className="font-bold text-lg">{item.name}</h1>
						<p className="text-gray-700">{item.description}</p>
					</div>

					<Stack>
						<pre>{JSON.stringify(item, null, 2)}</pre>
					</Stack>
				</Stack>
			)}
		</BaseLayout>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { menuId, itemId } = context.params

	await loadNormalizedMenu(menuId as string)
	const item = getItemData(itemId)

	return {
		props: {
			item,
		},
		revalidate: 60,
	}
}

export async function getStaticPaths() {
	// const menus = await marbleClient.get('/menus')
	// const menuId = menus.data.results[0].id
	// await loadNormalizedMenu(menuId)
	// const subcategories = getAllSubcategoryIds()
	// const paths = subcategories.map(subcategoryId => ({
	// 	params: { menuId, subcategoryId },
	// }))

	return {
		paths: [],
		fallback: true,
	}
}
