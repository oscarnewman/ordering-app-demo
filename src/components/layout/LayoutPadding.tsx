import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { ReactNode } from 'react'

/**
 * Tailwind classnames to apply when we need to granularly apply layout
 * padding elsewhere. Should be *SELDOM* used.
 */
export const LAYOUT_PADDING_CLASSNAMES = 'px-4 content-lg:px-0'

type Props = StyleProps & {
	/** The content for the padded container */
	children: ReactNode

	/** Whether to actually apply the padding */
	disabled?: boolean
}

/**
 * Applies the application-wide responsive page padding to any children.
 * Pads content on mobile viewports, but allows it to take up its full width on larger sizes.
 */
function LayoutPadding({
	children,
	disabled = false,
	className,
	style,
}: Props) {
	return (
		<div
			className={cx({ [LAYOUT_PADDING_CLASSNAMES]: !disabled }, className)}
			style={style}
		>
			{children}
		</div>
	)
}

export default LayoutPadding
