import { StyleProps } from '@/utilities/styleProps'

export const PlusCircleIcon = (props: StyleProps) => (
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
			d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
)
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

export const ArrowRightIcon = (props: StyleProps) => (
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
			d="M14 5l7 7m0 0l-7 7m7-7H3"
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

export const PlusIcon = (props: StyleProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		{...props}
	>
		<path
			fillRule="evenodd"
			d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
			clipRule="evenodd"
		/>
	</svg>
)
