import marbleClient from '@/api/client'
import {
	getAllSubcategoryIds,
	getSubcategoryData,
	loadNormalizedMenu,
} from '@/api/menu'
import Nav from '@/components/Nav'
import BaseLayout from '@/layout/BaseLayout'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Stack from '@/components/Stack'

export default function Subcategory({ subcategory }) {
	const router = useRouter()

	return (
		<BaseLayout padding={false}>
			<div className="px-4 sm:px-0">
				<Nav back menuId={router.query.menuId as string} />
			</div>
			{router.isFallback ? (
				'Loading Item...'
			) : (
				<Stack space={8}>
					<div className="relative w-full pb-2/3 shadow-xl rounded overflow-hidden block">
						<Image
							src={subcategory.image}
							layout="fill"
							priority
							sizes="100%, 50%, 25%"
							className="object-cover object-center"
						/>
					</div>
					<div className="px-4 sm:px-0">
						<h1 className="font-bold text-lg">{subcategory.name}</h1>
						<p className="text-gray-700">{subcategory.description}</p>
					</div>
				</Stack>
			)}
		</BaseLayout>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { menuId, subcategoryId } = context.params

	await loadNormalizedMenu(menuId as string)
	const subcategory = getSubcategoryData(subcategoryId)

	return {
		props: {
			subcategory,
		},
		revalidate: 60,
	}
}

export async function getStaticPaths() {
	const menus = await marbleClient.get('/menus')
	const menuId = menus[0].menuId
	await loadNormalizedMenu(menuId)
	const subcategories = getAllSubcategoryIds()
	const paths = subcategories.map(subcategoryId => ({ menuId, subcategoryId }))

	return {
		paths,
		fallback: true,
	}
}
