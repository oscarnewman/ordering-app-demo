import Logo from '@/components/ui/Logo'
import Stack from '@/components/ui/Stack'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Stack',
	component: Stack,
	args: {
		space: 0,
	},
} as Meta

const Template = args => (
	<Stack {...args}>
		{['One', 'Two', 'Three', 'Four'].map(i => (
			<div key={i}>{i}</div>
		))}
	</Stack>
)

export const Vertical = Template.bind({})
Vertical.args = { space: 4 }

export const Horizontal = Template.bind({})
Horizontal.args = { space: 4, row: true }

export const Divided = Template.bind({})
Divided.args = { space: 0, divider: true }
