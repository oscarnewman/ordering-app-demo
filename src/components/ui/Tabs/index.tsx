import Tab from '@/components/ui/Tabs/Tab'
import { useScrollToElement } from '@/hooks/useScrollToElement'
import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { createRef, RefObject, useMemo, useRef, useState } from 'react'
import css from 'styled-jsx/css'
import Stack from '../Stack'
import TargetableScrollingContent from '../TargetableScrollingContent'
import Underline from './Underline'

// Use css.resolve to apply these styles to TargetableScrollingContent
// even though it's out of scope of Styled JSX.
const { className: tabsClassName, styles } = css.resolve`
	.tabs {
		--border-width: 3px;
	}
`

interface TabItem {
	/** The displayed title of the item */
	title: string

	/** The unique key of the item */
	value: string

	/** Optionally, the href of an ID in the form `#id` to scroll to on click */
	href?: string
}

type Props = StyleProps & {
	/** A list of tabs to display */
	tabs: TabItem[]

	/**
	 * Ref to the containing element of the tab bar, to offset its height if
	 * the tab bar is sticky
	 */
	containerRef?: RefObject<HTMLElement>

	/** Ref to the scrollable container for the tab bar, if necessary */
	scrollableRef?: RefObject<HTMLElement>

	/** Whether to add additional padding for a scroll bar below the tab bar when it overflows */
	addScrollbarPadding?: boolean

	/** How much to offset auto-scrolling to content by on the top */
	offset?: number

	/** Called when a tab is selected */
	onChange?: (selected: string) => void
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
	offset = 0,
	onChange = _ => {},
}: Props) {
	const ref = useRef(null)
	const [activeTab, setActiveTab] = useState(tabs[0].value)
	const [animating, setAnimating] = useState(false)

	// Store a ref for each tab
	const tabRefs: { [key: string]: RefObject<HTMLElement> } = useMemo(
		() =>
			tabs.reduce(
				(all, current) => ({ ...all, [current.value]: createRef() }),
				{}
			),
		[tabs]
	)

	// Horizontal overflow scrolling
	const activeTabElement = useMemo(() => tabRefs[activeTab]?.current, [
		activeTab,
		tabRefs,
	])

	useScrollToElement(activeTabElement, {
		scrollContainer: ref,
		horizontal: {
			align: 'center',
		},
	})

	// Vertical content scrolling
	const scrollTarget = useMemo(() => {
		const tab = tabs.find(({ value }) => value === activeTab)
		if (!tab || !tab.href) return null
		return document.getElementById(tab.href.slice(1))
	}, [activeTab, tabs])

	useScrollToElement(scrollTarget, {
		scrollContainer: scrollableRef,
		vertical: {
			offsetElement: containerRef,
			offset: offset,
			align: 'top',
		},
	})

	// Click handler
	const handleTabClick = (tab: TabItem) => {
		setActiveTab(tab.value)
		onChange(tab.value)
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
