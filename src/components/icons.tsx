import { StyleProps } from '@/util/styleProps'

export const ShoppingBagIcon = (props: StyleProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
		/>
	</svg>
)

export const ArrowLeftIcon = (props: StyleProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M10 19l-7-7m0 0l7-7m-7 7h18"
		/>
	</svg>
)
