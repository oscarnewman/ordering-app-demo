module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
		defaultLineHeights: true,
		standardFontWeights: true,
	},
	// purge: ['./src/**/*.html', './src/**/*.tsx'],
	theme: {
		extend: {
			screens: {
				'content-xs': '20rem',
				'content-sm': '24rem',
				'content-md': '28rem',
				'content-lg': '32rem',
			},
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
