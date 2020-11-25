import Logo from '@/components/ui/Logo'
import Stack from '@/components/ui/Stack'
import Tabs from '@/components/ui/Tabs'
import { Meta } from '@storybook/react'

export default {
	title: 'UI/Tabs',
	component: Tabs,
} as Meta

export const Basic = () => (
	<Tabs
		tabs={[
			{ title: 'One', value: 'one' },
			{ title: 'Two', value: 'two' },
			{ title: 'Three', value: 'three' },
		]}
	/>
)
