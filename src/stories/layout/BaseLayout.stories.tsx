import Logo from '@/components/ui/Logo'
import Stack from '@/components/ui/Stack'
import BaseLayout from '@/layout/BaseLayout'
import { Meta } from '@storybook/react'

export default {
	title: 'Layout/BaseLayout',
	component: BaseLayout,
	args: {
		noPadding: false,
	},
} as Meta

const Template = args => (
	<div className="border border-gray-400 w-full text-center">
		Page
		<BaseLayout {...args}>
			<div className="bg-gray-200 w-full h-64">Content</div>
		</BaseLayout>
	</div>
)

export const Default = Template.bind({})

export const NoPadding = Template.bind({})
NoPadding.args = { noPadding: true }
