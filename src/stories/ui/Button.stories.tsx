import Button from '@/components/ui/Button'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Button/Base',
	component: Button,
	args: {},
} as Meta

const Template = args => <Button {...args}>Click me!</Button>

export const Basic = Template.bind({})
export const Block = Template.bind({})
Block.args = { block: true }
