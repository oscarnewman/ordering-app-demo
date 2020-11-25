import Logo from '@/components/ui/Logo'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Logo',
	component: Logo,
	args: {
		className: 'w-64',
	},
} as Meta

const Template = args => <Logo {...args} />

export const Basic = Template.bind({})
