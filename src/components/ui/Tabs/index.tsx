import Tab from '@/components/ui/Tabs/Tab'
import { cx } from '@/util/classes'
import { StyleProps } from '@/util/styleProps'
import { createRef, MutableRefObject, RefObject, useRef, useState } from 'react'
import Stack from '../Stack'
import Underline from './Underline'

type Props = StyleProps & {
	/** A list of tabs to display */
	tabs: {
		title: string
		value: string
	}[]
}

function Tabs({ tabs, className, style }: Props) {
	const ref = useRef(null)

	const [activeTab, setActiveTab] = useState(tabs[0].value)

	const [animating, setAnimating] = useState(false)

	const tabRefs: { [key: string]: RefObject<any> } = tabs.reduce(
		(all, current) => ({ ...all, [current.value]: createRef() }),
		{}
	)

	return (
		<div
			className={cx('tabs overflow-x-scroll pb-4 ', className)}
			id="tabs"
			ref={ref}
		>
			<Stack row className="relative">
				{tabs.map(tab => (
					<Tab
						ref={tabRefs[tab.value]}
						animating={animating}
						name={tab.title}
						key={tab.value}
						active={activeTab === tab.value}
						onClick={() => {
							setActiveTab(tab.value)
							setAnimating(true)
						}}
					/>
				))}
				<Underline
					refs={tabRefs}
					activeTab={activeTab}
					animating={animating}
					finishAnimating={() => setAnimating(false)}
				/>
			</Stack>
			<style jsx>{`
				.tabs {
					--border-width: 3px;
				}
			`}</style>
		</div>
	)
}

export default Tabs
