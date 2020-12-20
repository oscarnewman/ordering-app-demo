import { Item } from '@/types/Menu'
import { hydrate } from './index'

/**
 * Returns a menu item given its ID
 * @param itemId: the item's id
 */
export function getItem(itemId: string) {
	return hydrate<Item>('items', itemId)
}
