import BaseThumbnail from '@/components/menu/thumbnail/BaseThumbnail'
import { Meta } from '@storybook/react'

export default {
	title: 'Menu/Thumbnail',
	component: BaseThumbnail,
	args: {
		title: 'Chipotle Chicken Burrito',
		subtitle: '$6.50',
		image:
			'https://marble-tech-images.s3.amazonaws.com/Category:TqIVi2gezCz2.png?v=233607',
		stacked: false,
		href: '#',
	},
} as Meta

const Template = args => (
	<div className="bg-gray-50 p-6 w-full h-full">
		<div className="w-48">
			<BaseThumbnail {...args} />
		</div>
	</div>
)

export const SingleItem = Template.bind({})
export const Stacked = Template.bind({})
Stacked.args = { stacked: true, subtitle: '12 Items' }
