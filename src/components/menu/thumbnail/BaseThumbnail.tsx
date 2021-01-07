import Image from 'next/image'
import Link from 'next/link'

type Props = {
	/** The name of the item being displayed */
	title: string

	/** The secondary text to be displayed (like cost or item count) */
	subtitle: string

	/** The image to display */
	image: string

	/** Whether to show the item as "stacked" (i.e. having children) */
	stacked?: boolean

	/** The page this thumbnail links to */
	href: string
}

function BaseThumbnail({ title, subtitle, image, stacked, href }: Props) {
	return (
		<Link href={href}>
			<a className="relative block text-left focus:outline-none group">
				<div className="border h-full rounded overflow-hidden border-gray-200 bg-white group-focus:border-gray-200">
					<div className="relative pb-full w-full">
						<Image
							src={image}
							layout="fill"
							alt={`${title} ${subtitle}`}
							className="object-cover absolute"
						/>
						<span className="absolute bottom-0 right-0 py-1 px-3 text-white bg-theme-primary font-bold shadow">
							{subtitle}
						</span>
					</div>
					<h2 className="py-2 px-3 text-theme-primary font-bold leading-tight">
						{title}
					</h2>
				</div>
				{stacked && (
					<div className="absolute bottom-0 w-full transform translate-y-full flex flex-col">
						<div className="px-2">
							<div className="bg-gray-50 rounded-b-sm border border-t-0 border-gray-200 group-focus:border-gray-200 h-2" />
						</div>
						<div className="px-4">
							<div className="bg-gray-100 rounded-b-sm border border-t-0 border-gray-200 group-focus:border-gray-200 h-2" />
						</div>
					</div>
				)}
			</a>
		</Link>
	)
}

export default BaseThumbnail
