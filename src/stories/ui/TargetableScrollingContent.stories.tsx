import Tabs from '@/components/ui/Tabs'
import TargetableScrollingContent, {
	BaseTargetableScrollingContent,
} from '@/components/ui/TargetableScrollingContent'
import { Meta } from '@storybook/react'
import React, { useRef } from 'react'

export default {
	title: 'UI/TargetableScrollingContent',
	component: BaseTargetableScrollingContent,
} as Meta

export const WithTabs = () => {
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
