import Icon from '@/components/ui/icons/Icon'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Icons',
	component: Icon,
	argTypes: {
		icon: { control: 'select' },
	},
	args: {
		className: 'w-8 text-theme-primary',
		icon: 'plus-circle',
	},
} as Meta

export const Simple = args => <Icon {...args} />
