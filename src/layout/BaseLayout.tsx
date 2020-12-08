import {
	LocationSettingsProvider,
	useLocationSettings,
} from '@/context/locationSettings'
import { MarbleTheme } from '@/stories/assets/themes'
import { LocationSettings } from '@/types'
import { cx } from '@/util/classes'
import { StyleProps } from '@/util/styleProps'
import Head from 'next/head'
import { Fragment, ReactNode, useMemo } from 'react'
import LayoutPadding from './LayoutPadding'

type Props = StyleProps & {
	/** The content for the page layout */
	children: ReactNode

	/** Whether to disable padding for the entire page container (in case of full-bleed elements) */
	noPadding?: boolean

	/** A custom title for the page */
	title?: string

	/** A location settings object to be placed into context */
	locationSettings?: LocationSettings
}

/**
 * A base layout component for pages. Constrains and centers to a fixed width, optinally sets padding and page title.
 */
export default function BaseLayout({
	children,
	noPadding = false,
	title,
	locationSettings,
	className,
	style,
}: Props) {
	const pageTitle = useMemo(() => {
		return title || locationSettings?.general?.name || 'Marble Order'
	}, [locationSettings, title])

	const Wrapper = locationSettings ? LocationSettingsProvider : Fragment

	return (
		<Wrapper settings={locationSettings}>
			<LayoutPadding
				disabled={noPadding}
				className={cx('max-w-lg mx-auto relative', className)}
				style={style}
			>
				<Head>
					<title>{pageTitle}</title>
				</Head>
				{children}
			</LayoutPadding>
		</Wrapper>
	)
}
