import Button, { ButtonProps } from '@/components/ui/Button'
import { cx } from '@/utilities/classes'

type Props = ButtonProps

/**
 * A primary butting (using the theme's secondary color) for CTAs
 */
function PrimaryButton({ children, className, ...rest }: Props) {
	return (
		<Button
			className={cx(
				'rounded-lg bg-theme-secondary text-white focus:outline-none transition-shadow duration-75',
				'ring-2 ring-offset-2 ring-offset-transparent focus:ring-offset-white ring-transparent focus:ring-theme-secondary',
				className
			)}
			spinnerClass="text-theme-tertiary"
			{...rest}
		>
			{children}
		</Button>
	)
}

export default PrimaryButton
