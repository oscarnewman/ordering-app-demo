import { getItemData } from '@/api/menu'
import Nav from '@/components/Nav'
import Stack from '@/components/ui/Stack'
import BaseLayout from '@/layout/BaseLayout'
import { generateBaseStaticProps } from '@/util/ssg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Item({ item, settings }) {
	const router = useRouter()

	return (
		<BaseLayout noPadding locationSettings={settings}>
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

export const getStaticProps = generateBaseStaticProps(context => {
	const { itemId } = context.params

	return {
		item: getItemData(itemId),
	}
})

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	}
}
