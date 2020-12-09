import Tab from '@/components/ui/Tabs/Tab'
import { useScrollToRef } from '@/hooks/useScrollToRef'
import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { createRef, RefObject, useMemo, useRef, useState } from 'react'
import Stack from '../Stack'
import TargetableScrollingContent from './TargetableScrollingContent'
import Underline from './Underline'
import css from 'styled-jsx/css'

// Use css.resolve to apply these styles to TargetableScrollingContent
// even though it's out of scope of Styled JSX.
const { className: tabsClassName, styles } = css.resolve`
	.tabs {
		--border-width: 3px;
	}
`

interface TabItem {
	title: string
	value: string
	href?: string
}

type Props = StyleProps & {
	/** A list of tabs to display */
	tabs: TabItem[]

	containerRef?: RefObject<HTMLElement>

	scrollableRef?: RefObject<HTMLElement>

	addScrollbarPadding?: boolean

	offsetTop?: number
}

/**
 * An extensible tabs component.
 *
 * **NOTE**: Any time you want to use a custom scrolling container for tabs, it must be
 * a `<TargetableScrollingContent>` container, or at minimum set to `position: relative`
 * to allow for proper scroll position calculation.
 */
function Tabs({
	tabs,
	containerRef,
	scrollableRef,
	className,
	style,
	addScrollbarPadding = false,
	offsetTop = 0,
}: Props) {
	const ref = useRef(null)
	const [activeTab, setActiveTab] = useState(tabs[0].value)
	const [animating, setAnimating] = useState(false)

	const tabRefs: { [key: string]: RefObject<HTMLElement> } = useMemo(
		() =>
			tabs.reduce(
				(all, current) => ({ ...all, [current.value]: createRef() }),
				{}
			),
		[tabs]
	)

	const activeTabElement = useMemo(() => tabRefs[activeTab]?.current, [
		activeTab,
		tabRefs,
	])

	useScrollToRef(activeTabElement, {
		scrollContainer: ref,
		horizontal: {
			align: 'center',
		},
	})

	const scrollTarget = useMemo(() => {
		const tab = tabs.find(({ value }) => value === activeTab)
		if (!tab || !tab.href) return null
		return document.getElementById(tab.href.slice(1))
	}, [activeTab, tabs])

	useScrollToRef(scrollTarget, {
		scrollContainer: scrollableRef,
		vertical: {
			offsetElement: containerRef,
			offset: offsetTop,
			align: 'top',
		},
	})

	const handleTabClick = (tab: TabItem) => {
		setActiveTab(tab.value)
		setAnimating(true)
	}

	return (
		<TargetableScrollingContent
			className={cx(
				'relative tabs overflow-x-scroll ',
				{ 'pb-4': addScrollbarPadding },
				tabsClassName,
				className
			)}
			style={style}
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
						onClick={() => handleTabClick(tab)}
					/>
				))}
				<Underline
					refs={tabRefs}
					activeTab={activeTab}
					animating={animating}
					finishAnimating={() => setAnimating(false)}
				/>
			</Stack>
			{styles}
		</TargetableScrollingContent>
	)
}

export default Tabs
