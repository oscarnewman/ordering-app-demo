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

/**
 * Will automatically scroll the window or a given container to the passed
 * element to scroll to any time that element changes.
 *
 * @param elementToScrollTo The element to scroll to
 * @param options Configuration for scroll behavior
 */
export function useScrollToElement(
	elementToScrollTo: HTMLElement,
	options: UseScrollToRefOptions = {}
) {
	useEffect(() => {
		// Do nothing for a null element
		if (!elementToScrollTo) return

		// Figure out if we're scrolling in a container or the window.
		// Both support `.scroll()`
		const scrollingContainer = options.scrollContainer?.current || window

		const scrollPosition = {
			top: 0,
			left: 0,
		}

		// Calculate Top Scroll Offset
		if (options.vertical) {
			const { offset, offsetElement, align } = options.vertical

			// Get the offset to the start of the element
			const offsetToScrollingContainer = getOffsetTop(
				elementToScrollTo,
				options.scrollContainer?.current
			)

			// Calculate the proper offset for our alignment
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

			// Calculate the final scroll position
			scrollPosition.top =
				offsetToScrollingContainer -
				(offsetElement?.current?.offsetHeight || 0) -
				(offset || 0) -
				alignmentOffset
		}

		if (options.horizontal) {
			const { offset, offsetElement, align } = options.horizontal

			// Get the offset to the start of the element
			const offsetToScrollingContainer = getOffsetLeft(
				elementToScrollTo,
				options.scrollContainer?.current
			)

			// Calculate the proper offset for our alignment
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

			// Calculate the final scroll position
			scrollPosition.left =
				offsetToScrollingContainer -
				(offsetElement?.current?.offsetWidth || 0) -
				(offset || 0) -
				alignmentOffset
		}

		// Execute the scroll
		scrollingContainer.scroll({ ...scrollPosition, behavior: 'smooth' })
	}, [elementToScrollTo, options]) // Trigger scroll when element or options change
}
