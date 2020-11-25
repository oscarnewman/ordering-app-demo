import { StyleProps } from '@/util/styleProps'
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	PlusCircleIcon,
	ShoppingBagIcon,
} from '.'

export const icons = {
	'arrow-left': ArrowLeftIcon,
	'arrow-right': ArrowRightIcon,
	'plus-circle': PlusCircleIcon,
	'shopping-bag': ShoppingBagIcon,
}

export type Props = StyleProps & {
	/** The name of the icon */
	icon: keyof typeof icons
}
export default function Icon({ icon, ...rest }: Props) {
	const IconComponent = icons[icon.trim()]
	if (!IconComponent) return <div />

	return <IconComponent {...rest} />
}
