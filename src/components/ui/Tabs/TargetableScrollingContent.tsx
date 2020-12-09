import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { forwardRef, ReactNode, RefObject } from 'react'

type Props = StyleProps & {
	/** Content to be scrollable */
	children: ReactNode

	/** Which axis to allow overflow to scroll on */
	scroll?: 'x' | 'y' | 'both'
}

/**
 * **Only meant to be used with `useScrollToElement` custom containers.**
 *
 * Creates a relatively-positioned container to allow consistent programatic scrolling
 * to any element with using `useScrollToElement`. Forwards a ref to its root element.
 */
export function BaseTargetableScrollingContent(
	{ className, children, scroll = 'y', ...rest }: Props,
	ref: RefObject<any>
) {
	return (
		<div
			ref={ref}
			className={cx(
				'relative',
				{
					'overflow-scroll': scroll === 'both',
					'overflow-x-scroll': scroll === 'x',
					'overflow-y-scroll': scroll === 'y',
				},
				className
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

export default forwardRef(BaseTargetableScrollingContent)
