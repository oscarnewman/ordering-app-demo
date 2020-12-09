import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import { ReactNode } from 'react'

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
			className={cx({ 'px-4 content-lg:px-0': !disabled }, className)}
			style={style}
		>
			{children}
		</div>
	)
}

export default LayoutPadding
