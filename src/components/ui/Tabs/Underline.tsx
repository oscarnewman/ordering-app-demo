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

function Underline({ refs, activeTab, animating, finishAnimating }: Props) {
	const [{ x, width }, setAttributes] = useState({ x: 0, width: 0 })

	const updateAttributes = useCallback(() => {
		if (refs && refs[activeTab]) {
			setAttributes({
				x: refs[activeTab].current.offsetLeft,
				width: refs[activeTab].current.getBoundingClientRect().width,
			})
		}
	}, [activeTab, refs])

	useEffect(() => {
		updateAttributes()
	}, [activeTab, refs, updateAttributes])

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
			className="underline absolute bottom-0 left-0 w-0 bg-theme-primary"
			animate={{ x, width }}
			style={{ opacity: animating ? 1 : 0, height: 'var(--border-width)' }}
			onAnimationComplete={finishAnimating}
		/>
	)
}

export default Underline
