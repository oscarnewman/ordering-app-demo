import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}
export default function BaseLayout({ children }: Props) {
	return <div className="max-w-lg mx-auto px-4 sm:px-0">{children}</div>
}
