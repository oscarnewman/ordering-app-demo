module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
		defaultLineHeights: true,
		standardFontWeights: true,
	},
	purge: false,
	// purge: {
	// 	content: ['./src/**/*.html', './src/**/*.tsx'],
	// 	whitelist: theme =>
	// 		theme('spacing').reduce(
	// 			(all, cur) => [...all, `space-x-${cur}`, `space-y-${cur}`],
	// 			[]
	// 		),
	// },
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
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
