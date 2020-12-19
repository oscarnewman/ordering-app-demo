import { Item, Subcategory } from '@/types/Menu'
import Image from 'next/image'
import LayoutPadding from '../layout/LayoutPadding'
import Stack from '../ui/Stack'

type Props = {
	menuItem: Item | Subcategory
}

function ItemDetailsHeader({ menuItem }: Props) {
	return (
		<Stack space={8}>
			<div className="relative w-full pb-2/3 shadow-xl rounded-none content-lg:rounded overflow-hidden block">
				{menuItem.image && (
					<Image
						src={menuItem.image}
						layout="fill"
						priority
						sizes="100%, 50%, 25%"
						className="object-cover object-center"
					/>
				)}
			</div>
			<LayoutPadding>
				<Stack space={2}>
					<h1 className="font-bold text-lg">{menuItem.name}</h1>
					<p className="text-gray-700">{menuItem.description}</p>
				</Stack>
			</LayoutPadding>
		</Stack>
	)
}

export default ItemDetailsHeader
