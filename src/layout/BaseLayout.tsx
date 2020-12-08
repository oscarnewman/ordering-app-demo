import { useTheme } from '@/context/theme'
import { cx } from '@/util/classes'
import { StyleProps } from '@/util/styleProps'
import Head from 'next/head'
import { ReactNode, useMemo } from 'react'
import LayoutPadding from './LayoutPadding'

type Props = StyleProps & {
	/** The content for the page layout */
	children: ReactNode

	/** Whether to disable padding for the entire page container (in case of full-bleed elements) */
	noPadding?: boolean

	/** A custom title for the page */
	title?: string
}

/**
 * A base layout component for pages. Constrains and centers to a fixed width, optinally sets padding and page title.
 */
export default function BaseLayout({
	children,
	noPadding = false,
	title,
	className,
	style,
}: Props) {
	const theme = useTheme()
	const pageTitle = useMemo(() => {
		return title || theme?.general?.name || 'Marble Order'
	}, [theme, title])

	return (
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
	)
}
