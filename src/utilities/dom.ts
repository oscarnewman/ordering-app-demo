function getOffsetHelper(
	elem: HTMLElement,
	limit: HTMLElement,
	offsetType: 'offsetTop' | 'offsetLeft'
): number {
	if (!elem || elem === limit) return 0
	const parent = elem.offsetParent
	if (!(parent instanceof HTMLElement)) return elem[offsetType]
	return elem[offsetType] + getOffsetHelper(parent, limit, offsetType)
}

/**
 * Calculates the total top pixel offset between an element and either the viewport
 * or a bounding container element.
 *
 * @param elem The element to calcualte the offset of
 * @param limit The bounding element, or the viewport if null
 *
 * @returns The pixel offset of the element
 */
export function getOffsetTop(
	elem: HTMLElement,
	limit: HTMLElement = null
): number {
	return getOffsetHelper(elem, limit, 'offsetTop')
}

/**
 * Calculates the total left pixel offset between an element and either the viewport
 * or a bounding container element.
 *
 * @param elem The element to calcualte the offset of
 * @param limit The bounding element, or the viewport if null
 *
 * @returns The pixel offset of the element
 */
export function getOffsetLeft(
	elem: HTMLElement,
	limit: HTMLElement = null
): number {
	return getOffsetHelper(elem, limit, 'offsetLeft')
}
