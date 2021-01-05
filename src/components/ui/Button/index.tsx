import { cx } from '@/utilities/classes'
import ButtonOrLink, { ButtonOrLinkProps } from '../common/buttonOrLink'

export type ButtonProps = ButtonOrLinkProps & {
	/** Render as a block with full width. */
	block?: boolean

	/** Increase font size and padding to large. */
	large?: boolean

	/** Decrease font size and padding to small. */
	small?: boolean
}

/**
 * A base unstyled button that can be extended for different themes
 */
function Button({
	block,
	children,
	disabled,
	large,
	small,
	className,
	...restProps
}: ButtonProps) {
	return (
		<ButtonOrLink
			className={cx(
				{
					'block w-full': block,
					'px-8 py-3 text-base font-medium': large,
					'px-2 py-1 text-sm font-medium': small,
					'px-4 py-2 text-base font-medium': !large && !small,
					'pointer-events-none opacity-50': disabled,
				},
				'flex items-center',
				className
			)}
			{...restProps}
		>
			{children}
		</ButtonOrLink>
	)
}

export default Button
