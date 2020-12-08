import { LocationSettings } from '@/types'

export const MarbleTheme: LocationSettings = {
	assets: {
		logo: 'https://marblekiosk.com/branding/logo.svg',
		welcomeBackground:
			'https://marble-tech-images.s3.amazonaws.com/WelcomeBackground:2gNCxCQ6UJ.png?v=480819',
	},
	theme: {
		primaryColor: '#10B981',
		secondaryColor: '#2E2E35',
		tertiaryColor: '#F5F6F8',
		borderStyle: 'rounded',
	},
	general: {
		name: 'Northridge',
		timeout: 50,
		localTimezone: 'America/Los_Angeles',
		displayDineInTakeOut: false,
		dineInMessage: 'Your order will be ready soon',
		takeoutMessage: 'Your order will be ready soon',
		displayTableNumber: true,
		displayCommentsButton: false,
		isFundraiserActive: false,
		loyaltyEnabled: true,
		welcomeLoginEnabled: true,
		openingMessage: '',
		disclaimer:
			'REFER TO ALLERGEN LIST FOR SPECIFIC ALLERGIES. A LIST OF GLUTEN-FREE OPTIONS IS AVAILABLE. Further written nutrition data is available on request for standard menu items. A 2,000 Calorie diet is used as the basis for general nutrition advice; however, individual Calorie needs may vary. A number of factors may affect the actual nutrition values for each product, including the fact that our menu items are handcrafted and may be customized, variations in serving sizes, preparation techniques, ingredient substitutions, product testing and sources of supply, as well as regional and seasonal differences. Sharky’s cannot guarantee that the nutritional information provided is completely accurate as it relates to the prepared menu items in every restaurant.\n\nConsuming raw or undercooked meat, poultry, seafood, shellstock, or eggs may increase your risk of food borne illness, especially in case of certain medical conditions.',
		cardReader: 'tDynamo',
		customerAuthTypes: ['phoneNumber', 'qrCode'],
	},
	payments: {
		card: {
			enabled: true,
			tipping: {
				enabled: true,
				options: {
					low: 5,
					mid: 10,
					high: 15,
					preselected: null,
					type: 'percent',
				},
			},
		},
		cash: {
			enabled: false,
			tipping: {
				enabled: false,
				options: {
					low: 100,
					mid: 200,
					high: 300,
					preselected: null,
					type: 'fixed',
				},
			},
		},
		giftCard: {
			enabled: true,
		},
	},
	loyalty: {
		modeType: 'pointsUnlockCurrency',
		pointsUnlockCurrency: {
			conversionThreshold: 100,
			currencyEarned: 5,
			spend: 1,
			earn: 1,
			currencyName: 'Banked Rewards',
		},
	},
}
