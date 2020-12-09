import { RefObject, useCallback, useEffect, useState } from 'react'
import debounce from 'debounce'
import { motion } from 'framer-motion'

type Props = {
	/** List of refs for each tab */
	refs: { [key: string]: RefObject<any> }

	/** The key of the active tab */
	activeTab: string

	/** Whether we are currently animating */
	animating: boolean

	/** Makes the animation stop */
	finishAnimating: () => void
}

/**
 * An animated underline that follows the active tab
 */
function Underline({ refs, activeTab, animating, finishAnimating }: Props) {
	// Set our initial position and width
	const [{ x, width }, setAttributes] = useState({ x: 0, width: 0 })

	// Callback for whenever the tab is changed or our window resizes
	const updateAttributes = useCallback(() => {
		if (refs && refs[activeTab]) {
			setAttributes({
				x: refs[activeTab].current.offsetLeft,
				width: refs[activeTab].current.getBoundingClientRect().width,
			})
		}
	}, [activeTab, refs])

	// Trigger the callback on tab change
	useEffect(() => {
		updateAttributes()
	}, [activeTab, refs, updateAttributes])

	// Trigger the callback on window resize
	useEffect(() => {
		const recalculateAttrs = debounce(() => {
			updateAttributes()
		}, 500)

		window.addEventListener('resize', recalculateAttrs)
		return () => {
			window.removeEventListener('resize', recalculateAttrs)
		}
	})

	return (
		<motion.div
			className="absolute bottom-0 left-0 w-4 bg-theme-primary"
			animate={{ x, width }}
			style={{ opacity: animating ? 1 : 0, height: 'var(--border-width)' }}
			onAnimationComplete={finishAnimating}
		/>
	)
}

export default Underline
