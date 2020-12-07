// eslint-disable-next-line no-undef

import { cx } from '@/util/classes'
import { StyleProps } from '@/util/styleProps'
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
function Padding({ children, disabled = false, className, style }: Props) {
	return (
		<div
			className={cx({ 'px-4 content-lg:px-0': !disabled }, className)}
			style={style}
		>
			{children}
		</div>
	)
}

export default Padding
