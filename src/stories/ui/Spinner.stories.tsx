import Spinner from '@/components/ui/Spinner'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Spinner',
	component: Spinner,
	args: {
		className: '',
	},
} as Meta

const Template = args => <Spinner {...args} />

export const Basic = Template.bind({})
export const Color = Template.bind({})
Color.args = { className: 'text-theme-secondary' }
