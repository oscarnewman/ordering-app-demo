import { getLocationSettings } from '@/api/location'
import { GetStaticPropsContext } from 'next'

type CustomGetStaticPropsFunction = (
	context: GetStaticPropsContext,
	menuId: string
) => object

/**
 * Generates a basic GetStaticProps which loads in location theme data as `settings`
 * and merges that with custom static props returned by the wrapped function
 * @param getStaticProps A custom get static props function
 * @param revalidate How often to revalidate pages. Default 1 second.
 */
export function generateBaseStaticProps(
	getStaticProps: CustomGetStaticPropsFunction,
	revalidate: Number = 1
) {
	return async (context: GetStaticPropsContext) => {
		const menuId = context.params.menuId as string

		const [settings, customStaticProps] = await Promise.all([
			getLocationSettings(menuId),
			getStaticProps(context, menuId),
		])

		return {
			props: {
				settings,
				...customStaticProps,
			},
			revalidate,
		}
	}
}
