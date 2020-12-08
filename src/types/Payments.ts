import { LoyaltyLookupType } from './Loyalty'

export type PaymentType = 'cash' | 'card' | 'giftCard'

export type TippingType = 'fixed' | 'percent'

export type TippingPreselected = 'low' | 'mid' | 'high' | null

export type TippingOptionNames = TippingPreselected | 'zero'

export interface TippingOptions {
	low: number
	mid: number
	high: number
	preselected: TippingPreselected
	type: TippingType
}

export interface Tipping {
	enabled: boolean
	options: TippingOptions
}

export interface CashPayment {
	amount: number
	type: 'cash'
}

export interface GiftCardPayment {
	amount: number
	type: 'giftCard'
}

export interface CardPayment {
	amount: number
	card: CardPaymentData
	type: 'card'
}

export type Payment = CashPayment | GiftCardPayment | CardPayment

export interface CardPaymentData {
	emv?: {
		emvData: string
		encryptionType: string
		numberOfPaddedBytes: string
		paymentMode: string
	}
	ksn: string
	magStripe?: {
		cvv: string
		magnePrint: string
		magnePrintStatus: string
		trackTwo: string
	}
	paymentType: string
	transactionType: string
}

export type CardReaderType = 'eDynamo' | 'tDynamo'

export type CustomerAuthTypes = LoyaltyLookupType[]

export interface Payments {
	card: {
		enabled: boolean
		tipping: Tipping
	}
	cash: {
		enabled: boolean
		tipping: Tipping
	}
	giftCard: {
		enabled: boolean
	}
}
