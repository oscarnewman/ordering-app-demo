import { formatMinorAmmount } from '@/utilities/currency'
import PrimaryButton from '../ui/Button/PrimaryButton'
import { ShoppingBagIcon } from '../ui/icons'
import Stack from '../ui/Stack'

type Props = {
	/** The number of items currently in the cart */
	numItemsInCart?: number

	/** The cost of the cart */
	cartTotal?: number
}

/** Main CTA button to preview and view the cart */
function ViewCartButton({ numItemsInCart = 0, cartTotal = 0 }: Props) {
	return (
		<PrimaryButton
			block
			className="shadow-xl"
			leadingIcon={<ShoppingBagIcon className="w-6 h-6" />}
			trailingIcon={
				<div className="w-6 h-6 bg-theme-primary grid place-content-center rounded-full text-xs">
					{numItemsInCart}
				</div>
			}
		>
			<Stack>
				<p className="opacity-75 text-white uppercase tracking-wide text-xs">
					View Cart
				</p>
				<p className="text-sm">{formatMinorAmmount(cartTotal)}</p>
			</Stack>
		</PrimaryButton>
	)
}

export default ViewCartButton
