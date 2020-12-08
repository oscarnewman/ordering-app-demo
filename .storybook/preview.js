import { withThemes } from 'storybook-addon-themes/react'

import { LocationSettingsProvider } from '@/context/locationSettings'
import { SharkysTheme, MarbleTheme } from '@/stories/assets/themes'
import Layout from './Layout'

function ThemeDecorator({children, themeName}) {
	let theme = {'Sharkys': SharkysTheme}[themeName]
	if (!theme) theme = MarbleTheme
	return <LocationSettingsProvider settings={theme}>{children}</LocationSettingsProvider>
}

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	themes: {
		Decorator: ThemeDecorator,
		list: [
			{name: 'Marble', color: '#87EEBF'},
			{name: 'Sharkys', color: '#F07321', default: true}
		]
	}
}


export const decorators  = [
	withThemes,
	Story => <Layout><Story /></Layout>,
]
