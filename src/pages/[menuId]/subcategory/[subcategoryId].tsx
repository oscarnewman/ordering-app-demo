/* eslint-disable react-hooks/rules-of-hooks */
import { getMenus, loadNormalizedMenu } from '@/api/menu'
import { getAllSubcategoryIds, getSubcategory } from '@/api/menu/subcategories'
import BaseLayout from '@/components/layout/BaseLayout'
import SubcategoryDetails from '@/components/menu/SubcategoryDetails'
import FixedTopbar from '@/components/ui/FixedTopbar'
import Stack from '@/components/ui/Stack'
import { LocationSettingsProvider } from '@/contexts/locationSettings'
import { LocationSettings } from '@/types/LocationSettings'
import { Subcategory } from '@/types/Menu'
import { generateBaseStaticProps } from '@/utilities/ssg'
import Error from 'next/error'
import { useRouter } from 'next/router'

interface Props {
	subcategory?: Subcategory
	settings: LocationSettings
}

export default function SubcategoryPage({ subcategory, settings }: Props) {
	const router = useRouter()

	return (
		<LocationSettingsProvider settings={settings}>
			<Stack space={6}>
				<FixedTopbar back menuId={router.query.menuId as string} />
				<BaseLayout noPadding>
					{!subcategory ? (
						router.isFallback ? (
							'Loading Item...'
						) : (
							<Error statusCode={404} />
						)
					) : (
						<SubcategoryDetails subcategory={subcategory} />
					)}
				</BaseLayout>
			</Stack>
		</LocationSettingsProvider>
	)
}

export const getStaticProps = generateBaseStaticProps(async function (context) {
	const subcategoryId = context.params.subcategoryId as string
	return {
		subcategory: getSubcategory(subcategoryId),
	}
})

export async function getStaticPaths() {
	const menus = await getMenus()
	const { id } = menus[0]

	await loadNormalizedMenu(id)
	const subcategories = getAllSubcategoryIds()
	const paths = subcategories.map(subcategoryId => ({
		params: { menuId: id, subcategoryId },
	}))

	return {
		paths,
		fallback: true,
	}
}
