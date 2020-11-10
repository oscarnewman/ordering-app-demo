import { ShoppingBagIcon } from '@/components/icons'
import Nav from '@/components/Nav'
import Stack from '@/components/Stack'

export default function Home() {
	return (
		<div className="max-w-lg mx-auto">
			<div className="border-b border-gray-300 py-2 px-4 lg:px-0">
				<Nav />
				<Stack space={32} row className="overflow-scroll max-w-full">
					<div>a</div>
					<div>b</div>
					<div>c</div>
					<div>b</div>
					<div>c</div>
					<div>b</div>
					<div>c</div>
				</Stack>
			</div>
		</div>
	)
}
