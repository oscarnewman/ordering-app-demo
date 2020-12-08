export interface LoyaltyCustomer {
	name: string
	balance: number
	conversionThreshold: number
	redemptions: Redemption[]
	registered: boolean
	lockedRedemptions: Redemption[]
}

export interface Redemption {
	amount: number | null
	code: string | null
	description: string | null
	expirationDate: string | null
	id: string | null
	image: string | null
	level: 'ticket' | 'item' | null
	menuItemId: string | null
	name: string | null
	pointsRequiredToRedeem: number | null
	referenceLine: string | null
	type:
		| 'reward'
		| 'redemptionCode'
		| 'bankedReward'
		| 'cardCompletion'
		| 'redeemable'
		| null
}

export type LoyaltyModeType =
	| 'pointsUnlockCurrency'
	| 'pointsUnlockRedeemables'
	| 'pointsUnlockRewards'
	| 'visitsUnlockRewards'

export type LoyaltyLookupType = 'phoneNumber' | 'qrCode' | 'oauth'

export interface OAuthLookup {
	username: string
	password: string
}
