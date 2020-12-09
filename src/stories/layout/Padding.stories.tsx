import LayoutPadding from '@/components/layout/LayoutPadding'
import { Meta } from '@storybook/react'

export default {
	title: 'Layout/Padding',
	component: LayoutPadding,
	args: {
		disabled: false,
	},
} as Meta

const Template = args => (
	<div className="border border-gray-400 w-full text-center">
		Page
		<LayoutPadding {...args}>
			<div className="bg-gray-200 w-full h-64">
				Padded Content (on certain viewport sizes)
			</div>
		</LayoutPadding>
		<div className="bg-gray-300 w-full h-64">Not Padded Content</div>
	</div>
)

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }
