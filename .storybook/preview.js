import { LocationSettingsProvider } from '@/contexts/locationSettings'
import { MarbleTheme, SharkysTheme } from '@/stories/assets/themes'
import * as nextImage from 'next/image'
import { useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import { withNextRouter } from 'storybook-addon-next-router'
import { withThemes } from 'storybook-addon-themes/react'
import Layout from './Layout'
import Providers from '@/components/Providers'

// Injext `Image` component mock into our storybook component
// which is just a regular img tag.
// Workaround until https://www.npmjs.com/package/@next/plugin-storybook
// is released
Object.defineProperty(nextImage, 'default', {
	configurable: true,
	value: props => {
		return <img {...props} />
	},
})

function ThemeDecorator({ children, themeName }) {
	useEffect(() => {
		smoothscroll.polyfill()
	}, [])
	let theme = { Sharkys: SharkysTheme }[themeName]
	if (!theme) theme = MarbleTheme
	return (
		<LocationSettingsProvider settings={theme}>
			{children}
		</LocationSettingsProvider>
	)
}

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	themes: {
		Decorator: ThemeDecorator,
		list: [
			{ name: 'Marble', color: '#87EEBF' },
			{ name: 'Sharkys', color: '#F07321', default: true },
		],
	},
}

export const decorators = [
	withNextRouter(),
	withThemes,
	Story => (
		<Providers>
			<Layout>
				<Story />
			</Layout>
		</Providers>
	),
]
