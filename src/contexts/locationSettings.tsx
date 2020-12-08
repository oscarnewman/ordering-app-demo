import { LocationSettings } from '@/types'
import { createContext, ReactNode, useContext } from 'react'

/**
 * A context containing location-specific settings such as colors, images, and strings
 */
const LocationSettingsContext = createContext<LocationSettings>(null)
export default LocationSettingsContext

type ThemeProvderProps = {
	/** A location settings object returned from the marble API */
	settings: LocationSettings

	/** The children which will recieve this context */
	children: ReactNode
}

/**
 * A provider for the current locations's settings and config context which
 * also injects relevant css variables into global scope
 */
export function LocationSettingsProvider({
	settings,
	children,
}: ThemeProvderProps) {
	return (
		<LocationSettingsContext.Provider value={settings}>
			{children}
			<style jsx global>{`
				/* This is where we inject our global css variables */
				:root {
					--theme-primary: ${settings.theme.primaryColor};
					--theme-secondary: ${settings.theme.secondaryColor};
					--theme-tertiary: ${settings.theme.tertiaryColor};
				}
			`}</style>
		</LocationSettingsContext.Provider>
	)
}

export const useLocationSettings = () => {
	const context = useContext(LocationSettingsContext)
	if (!context) {
		throw new Error('A ThemeProvider must be present in the tree')
	}
	return context
}
