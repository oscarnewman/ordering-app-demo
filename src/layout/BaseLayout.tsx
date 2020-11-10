import { ReactNode } from 'react'
import Head from 'next/head'
import classNames from 'classnames'

interface Props {
	children: ReactNode
	padding?: boolean
}
export default function BaseLayout({ children, padding }: Props) {
	return (
		<div className={classNames('max-w-lg mx-auto', padding && 'px-4 sm:px-0')}>
			<Head>
				<title>Marble Order</title>
			</Head>
			{children}
		</div>
	)
}
