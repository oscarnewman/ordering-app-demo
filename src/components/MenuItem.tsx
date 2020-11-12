import { useRouter } from 'next/router'
import Image from 'next/image'
import { useMemo } from 'react'
import Stack from '@/components/Stack'
import Link from 'next/link'

export function MenuItem({ item }) {
	const isSubcategory = useMemo(() => Boolean(item.items), [item])
	const router = useRouter()
	const { menuId } = router.query

	const link = useMemo(() => {
		const resource = isSubcategory ? 'subcategory' : 'item'
		return `/${menuId}/${resource}/${item.id}`
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
							className="rounded flex-shrink-0 "
						/>
					</div>
				)}
			</a>
		</Link>
	)
}
