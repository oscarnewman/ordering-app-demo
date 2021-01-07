import { getLocationSettings } from '@/api/location'
import { loadNormalizedMenu } from '@/api/menu'
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
	revalidate: number = 1
) {
	return async (context: GetStaticPropsContext) => {
		if (typeof context.params.menuId !== 'string')
			throw new Error('A menuId url param is required for this page')

		const menuId = context.params.menuId as string

		const [settings, customStaticProps] = await Promise.all([
			getLocationSettings(menuId),

			// Pages which load menu data have an implicit dependency on the normalized menu
			// being loaded in first
			loadNormalizedMenu(menuId).then(() => getStaticProps(context, menuId)),
		])

		if (!settings)
			throw new Error('Unable to load brand settings for this page')

		return {
			props: {
				settings,
				...customStaticProps,
			},
			revalidate,
		}
	}
}
