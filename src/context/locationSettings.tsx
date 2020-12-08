import { LocationSettings } from '@/types'
import { createContext, ReactNode, useContext } from 'react'

/**
 * A context containing location-specific settings such as colors, images, and strings
 */
const locationSettingsContext = createContext<LocationSettings>(null)
export default locationSettingsContext

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
		<locationSettingsContext.Provider value={settings}>
			{children}
			<style jsx global>{`
				/* This is where we inject our global css variables */
				:root {
					--theme-primary: ${settings.theme.primaryColor};
					--theme-secondary: ${settings.theme.secondaryColor};
					--theme-tertiary: ${settings.theme.tertiaryColor};
				}
			`}</style>
		</locationSettingsContext.Provider>
	)
}

export const useLocationSettings = () => useContext(locationSettingsContext)
