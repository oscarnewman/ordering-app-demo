import ViewCartButton from '@/components/menu/ViewCartButton'
import { Meta } from '@storybook/react'

export default {
	title: 'Menu/View Cart',
	component: ViewCartButton,
	args: {
		numItemsInCart: 0,
		cartTotal: 0,
	},
} as Meta

const Template = args => <ViewCartButton {...args} />

export const NoItems = Template.bind({})

export const SomeItems = Template.bind({})
SomeItems.args = { numItemsInCart: 4, cartTotal: 1295 }
