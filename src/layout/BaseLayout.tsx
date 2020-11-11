import { ReactNode } from 'react'
import Head from 'next/head'
import classNames from 'classnames'

interface Props {
	children: ReactNode
	noPadding?: boolean
}
export default function BaseLayout({ children, noPadding = false }: Props) {
	return (
		<div
			className={classNames('max-w-lg mx-auto', {
				'px-4 content-lg:px-0': !noPadding,
			})}
		>
			<Head>
				<title>Marble Order</title>
			</Head>
			{children}
		</div>
	)
}
