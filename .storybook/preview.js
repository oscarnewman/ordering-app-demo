import { LocationSettingsProvider } from '@/contexts/locationSettings'
import { MarbleTheme, SharkysTheme } from '@/stories/assets/themes'
import { withThemes } from 'storybook-addon-themes/react'
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
