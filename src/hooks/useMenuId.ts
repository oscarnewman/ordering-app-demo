import { useRouter } from 'next/router'

/** Returns the current menu ID from the url if it exists */
export function useMenuId() {
	const router = useRouter()
	return router.query.menuId as string
}
