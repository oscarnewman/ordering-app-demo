import { getOffsetLeft, getOffsetTop } from '@/utilities/dom'
import { RefObject, useEffect } from 'react'

interface DirectionalScrollOptions {
	/** How many pixels of space to offset the scroll position by */
	offset?: number

	/** An element to use the width/height of to offset scroll position */
	offsetElement?: RefObject<HTMLElement>
}

interface UseScrollToRefOptions {
	/** Ref to an HTML Element to scroll within */
	scrollContainer?: RefObject<HTMLElement>

	/** Options for horizontal scrolling */
	horizontal?: DirectionalScrollOptions & {
		align?: 'left' | 'right' | 'center'
	}

	/** Options for vertical scrolling */
	vertical?: DirectionalScrollOptions & { align?: 'top' | 'bottom' | 'center' }
}

export function useScrollToRef(
	ref: HTMLElement,
	options: UseScrollToRefOptions = {}
) {
	useEffect(() => {
		if (!ref) return

		const elementToScrollTo = ref
		const scrollingContainer = options.scrollContainer?.current || window

		const scrollPosition = {
			top: 0,
			left: 0,
		}

		// Calculate Top Scroll Offset
		if (options.vertical) {
			const { offset, offsetElement, align } = options.vertical
			const offsetElementTopPadding = offsetElement?.current?.offsetHeight || 0

			const offsetToScrollingContainer = getOffsetTop(
				elementToScrollTo,
				options.scrollContainer?.current
			)

			const scrollContainerHeight =
				scrollingContainer === window
					? window.innerHeight
					: (scrollingContainer as HTMLElement).offsetHeight
			const targetElemHeight = elementToScrollTo.offsetHeight

			const alignmentOffset = {
				top: 0,
				center: scrollContainerHeight / 2 - targetElemHeight / 2,
				bottom: scrollContainerHeight - targetElemHeight,
			}[align]

			scrollPosition.top =
				offsetToScrollingContainer -
				offsetElementTopPadding -
				(offset || 0) -
				alignmentOffset
		}

		if (options.horizontal) {
			const { offset, offsetElement, align } = options.horizontal
			const offsetElementLeftPadding = offsetElement?.current?.offsetWidth || 0

			const offsetToScrollingContainer = getOffsetLeft(
				elementToScrollTo,
				options.scrollContainer?.current
			)

			const scrollContainerWidth =
				scrollingContainer === window
					? window.innerWidth
					: (scrollingContainer as HTMLElement).offsetWidth
			const targetElemWidth = elementToScrollTo.offsetWidth

			const alignmentOffset = {
				left: 0,
				center: scrollContainerWidth / 2 - targetElemWidth / 2,
				right: scrollContainerWidth - targetElemWidth,
			}[align]

			scrollPosition.left =
				offsetToScrollingContainer -
				offsetElementLeftPadding -
				(offset || 0) -
				alignmentOffset
		}

		scrollingContainer.scroll({ ...scrollPosition, behavior: 'smooth' })
	}, [options, ref])
}
