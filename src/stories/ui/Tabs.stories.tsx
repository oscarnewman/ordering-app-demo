import Tabs from '@/components/ui/Tabs'
import TargetableScrollingContent from '@/components/ui/TargetableScrollingContent'
import { Meta } from '@storybook/react'
import { useRef } from 'react'

export default {
	title: 'UI/Tabs',
	component: Tabs,
} as Meta

export const Basic = () => (
	<Tabs
		tabs={[
			{ title: 'One', value: 'one' },
			{ title: 'Two', value: 'two' },
			{ title: 'Three', value: 'three' },
		]}
	/>
)

export const Overflow = () => (
	<div className="w-80">
		<Tabs
			tabs={[
				{ title: 'One', value: 'one' },
				{ title: 'Two', value: 'two' },
				{ title: 'Three', value: 'three' },
				{ title: 'Very Long One Here', value: 'four' },
				{ title: 'Five', value: 'five' },
				{ title: 'Six', value: 'six' },
			]}
		/>
	</div>
)

export const ScrollsToItem = () => {
	const tabs = [
		{ title: 'Red', value: 'red', href: '#red' },
		{ title: 'Green', value: 'green', href: '#green' },
		{ title: 'Indigo', value: 'indigo', href: '#indigo' },
		{ title: 'Yellow', value: 'yellow', href: '#yellow' },
	]

	const ref = useRef(null)

	return (
		<div>
			<div
				className="sticky top-2 bg-gray-50 p-2 shadow-lg rounded mb-4"
				ref={ref}
			>
				<Tabs tabs={tabs} containerRef={ref} offset={20} />
			</div>
			<main className="px-4">
				<div id="red" className="bg-gradient-to-br from-red-50 to-red-500 h-96">
					Red Box
				</div>
				<div
					id="green"
					className="bg-gradient-to-br from-green-50 to-green-500 h-96"
				>
					Green Box
				</div>
				<div
					id="indigo"
					className="bg-gradient-to-br from-indigo-50 to-indigo-500 h-96"
				>
					Indigo Box
				</div>
				<div
					id="yellow"
					className="bg-gradient-to-br from-yellow-50 to-yellow-500 h-96"
				>
					Yellow Box
				</div>
			</main>
		</div>
	)
}

export const CustomScrollContainer = () => {
	const tabs = [
		{ title: 'Red', value: 'red', href: '#red2' },
		{ title: 'Green', value: 'green', href: '#green2' },
		{ title: 'Indigo', value: 'indigo', href: '#indigo2' },
		{ title: 'Yellow', value: 'yellow', href: '#yellow2' },
	]

	const containerRef = useRef(null)
	const scrollableRef = useRef(null)

	return (
		<TargetableScrollingContent
			className="max-h-80 shadow-lg rounded border"
			ref={scrollableRef}
		>
			<div className="sticky top-0 bg-white" ref={containerRef}>
				<Tabs
					tabs={tabs}
					scrollableRef={scrollableRef}
					containerRef={containerRef}
				/>
			</div>
			<main>
				<div
					id="red2"
					className="bg-gradient-to-br from-red-50 to-red-500 h-96"
				>
					Red Box
				</div>
				<div
					id="green2"
					className="bg-gradient-to-br from-green-50 to-green-500 h-96"
				>
					Green Box
				</div>
				<div
					id="indigo2"
					className="bg-gradient-to-br from-indigo-50 to-indigo-500 h-96"
				>
					Indigo Box
				</div>
				<div
					id="yellow2"
					className="bg-gradient-to-br from-yellow-50 to-yellow-500 h-96"
				>
					Yellow Box
				</div>
			</main>
		</TargetableScrollingContent>
	)
}
