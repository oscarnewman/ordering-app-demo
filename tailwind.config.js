module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
		defaultLineHeights: true,
		standardFontWeights: true,
	},
	purge: ['./src/**/*.html', './src/**/*.tsx'],
	theme: {
		extend: {
			spacing: {
				'1/2': '50%',
				'2/3': '66.666%',
				'3/4': '75%',
				'7/8': '87.5%',
				full: '100%',
			},
		},
	},
	variants: {
		borderWidth: ['hover'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/custom-forms'),
	],
}
