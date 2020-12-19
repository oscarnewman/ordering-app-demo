import Button from '@/components/ui/Button'
import { ShoppingBagIcon } from '@/components/ui/icons'
import { Meta } from '@storybook/react'
import PrimaryButton from '../../components/ui/Button/PrimaryButton'

export default {
	title: 'UI/Button/Primary',
	component: PrimaryButton,
	args: {},
} as Meta

const Template = args => <PrimaryButton {...args}>Click me!</PrimaryButton>
export const Basic = Template.bind({})

export const Loading = Template.bind({})
Loading.args = { loading: true }

export const WithLeadingIcon = Template.bind({})
WithLeadingIcon.args = {
	leadingIcon: <ShoppingBagIcon className="w-5 text-theme-tertiary mr-4" />,
}
