import { Theme } from '@/types'
import { createContext, ReactNode, useContext } from 'react'

/**
 * A context containing location-specific theme details such as colors and images
 */
const themeContext = createContext<Theme>(null)
export default themeContext

export function ThemeProvider({
	theme,
	children,
}: {
	theme: Theme
	children: ReactNode
}) {
	return (
		<themeContext.Provider value={theme}>
			{children}
			<style jsx global>{`
				:root {
					--theme-primary: ${theme.theme.primaryColor};
					--theme-secondary: ${theme.theme.secondaryColor};
					--theme-tertiary: ${theme.theme.tertiaryColor};
				}
			`}</style>
		</themeContext.Provider>
	)
}

export const useTheme = () => useContext(themeContext)
