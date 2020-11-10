module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
		defaultLineHeights: true,
		standardFontWeights: true,
	},
	purge: ['./src/**/*.html', './src/**/*.tsx'],
	theme: {
		extend: {},
	},
	variants: {
		borderWidth: ['hover'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/custom-forms'),
	],
}
