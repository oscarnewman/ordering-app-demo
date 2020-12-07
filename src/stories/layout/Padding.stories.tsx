import Logo from '@/components/ui/Logo'
import Stack from '@/components/ui/Stack'
import Padding from '@/layout/Padding'
import { Meta } from '@storybook/react'

export default {
	title: 'Layout/Padding',
	component: Padding,
	args: {
		disabled: false,
	},
} as Meta

const Template = args => (
	<div className="border border-gray-400 w-full text-center">
		Page
		<Padding {...args}>
			<div className="bg-gray-200 w-full h-64">
				Padded Content (on certain viewport sizes)
			</div>
		</Padding>
		<div className="bg-gray-300 w-full h-64">Not Padded Content</div>
	</div>
)

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }
