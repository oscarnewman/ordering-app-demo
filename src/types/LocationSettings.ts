import { LoyaltyModeType } from './Loyalty'
import { CardReaderType, CustomerAuthTypes, Payments } from './Payments'

export type BorderStyle = 'rounded' | 'square' | undefined

export type BarCodeType = 'code128' | null

export interface LocationSettings {
	assets: {
		logo?: string
		welcomeBackground?: string
	}
	theme: {
		borderStyle: BorderStyle
		primaryColor: string
		secondaryColor: string
		tertiaryColor: string
	}
	general: {
		name: string
		timeout: number
		localTimezone: string
		displayDineInTakeOut: boolean
		displayTableNumber: boolean
		dineInMessage: string
		takeoutMessage: string
		displayCommentsButton: boolean
		openingMessage: string
		disclaimer: string
		cardReader: CardReaderType
		couponsEnabled?: boolean
		customerAuthTypes: CustomerAuthTypes
		discounts?: {
			barcode: {
				enabled: boolean
				type: BarCodeType
			}
			manual: {
				enabled: boolean
			}
		}
		isFundraiserActive: boolean
		loyaltyEnabled: boolean
		welcomeLoginEnabled: boolean
	}
	loyalty: {
		modeType: LoyaltyModeType
		pointsUnlockCurrency?: {
			conversionThreshold: number
			currencyEarned: number
			currencyName: string
			earn: number
			spend: number
		}
		pointsUnlockRedeemables?: {
			earn: number
			spend: number
		}
		pointsUnlockRewards?: {
			conversionThreshold: number
			earn: number
			spend: number
		}
		visitsUnlockRewards?: {
			conversionThreshold: number
		}
	}
	payments: Payments
}
