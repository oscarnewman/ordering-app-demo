import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import Link from 'next/link'
import React, { MouseEvent, ReactNode, useCallback } from 'react'
import Spinner from '../Spinner'

export type ButtonOrLinkTypes = HTMLAnchorElement | HTMLButtonElement

export type ButtonOrLinkProps = StyleProps & {
	/** Icon to display at the end the content. */
	leadingIcon?: ReactNode

	/** Icon to display at the start the content. */
	trailingIcon?: ReactNode

	/** Content within the button or link. */
	children: NonNullable<ReactNode>

	/** Whether the element is disabled. */
	disabled?: boolean

	/** Render as an anchor link with a URL. */
	href?: string

	/** Whether the element is loading. */
	loading?: boolean

	/** Callback fired when the element is clicked. */
	onClick?: (event: MouseEvent<ButtonOrLinkTypes>) => void

	/** Callback fired when the element is released. */
	onMouseUp?: (event: MouseEvent<ButtonOrLinkTypes>) => void

	/** When a link, open the target in a new window. */
	openInNewWindow?: boolean

	/** Rel attribute override for if the component has an href */
	rel?: string

	/** When a button, the type of button. */
	type?: 'button' | 'submit' | 'reset'

	/** The classname to apply to the spinner */
	spinnerClass?: string

	/** The class name to apply to the inner content of the button */
	contentClass?: string
}

function ButtonOrLink({
	leadingIcon,
	trailingIcon,
	children,
	disabled,
	href,
	loading,
	onClick,
	onMouseUp,
	openInNewWindow,
	rel,
	type = 'button',
	spinnerClass,
	contentClass = 'flex justify-between',
	...restProps
}: ButtonOrLinkProps) {
	// Intercept click to handle disabled state
	const handleClick = useCallback(
		(event: MouseEvent<ButtonOrLinkTypes>) => {
			if (disabled) event.preventDefault()
			else if (onClick) onClick(event)
		},
		[disabled, onClick]
	)

	const handleMouseUp = useCallback(
		(event: MouseEvent<ButtonOrLinkTypes>) => {
			if (onMouseUp) onMouseUp(event)
		},
		[onMouseUp]
	)

	// eslint-disable-next-line no-undef
	const props: JSX.IntrinsicElements['a'] & JSX.IntrinsicElements['button'] = {}

	// Determine props based on element type
	if (href) {
		props.rel = rel

		if (openInNewWindow) {
			props.target = '_blank'

			if (props.rel === undefined) {
				props.rel = 'noopener noreferrer'
			}
		}

		return (
			<Link href={href}>
				<a
					{...props}
					{...restProps}
					aria-busy={loading}
					onClick={handleClick}
					onMouseUp={handleMouseUp}
				>
					{loading ? (
						<Spinner className={spinnerClass} size={20} />
					) : (
						<>
							{leadingIcon && leadingIcon}
							<span>{children}</span>
							{trailingIcon && trailingIcon}
						</>
					)}
				</a>
			</Link>
		)
	} else {
		props.disabled = disabled || loading
		props.type = type || 'button'
	}

	return (
		<button
			{...restProps}
			{...props}
			aria-busy={loading}
			onClick={handleClick}
			onMouseUp={handleMouseUp}
		>
			<div className="relative w-full h-full">
				<div className={cx({ invisible: loading }, contentClass)}>
					<span className="flex items-center">
						{leadingIcon && leadingIcon}
					</span>
					<span>{children}</span>
					<span className="flex items-center">
						{trailingIcon && trailingIcon}
					</span>
				</div>
				<div
					className={cx(
						'absolute w-full h-full top-0 grid place-items-center',
						{ hidden: !loading }
					)}
				>
					<Spinner className={spinnerClass} size={20} />
				</div>
			</div>
		</button>
	)
}

export default ButtonOrLink
