import Tab from '@/components/ui/Tabs/Tab'
import { cx } from '@/util/classes'
import { StyleProps } from '@/util/styleProps'
import { useRef, useState } from 'react'
import Stack from '../Stack'

type Props = StyleProps & {
	/** A list of tabs to display */
	tabs: {
		title: string
		value: string
	}[]
}

function Tabs({ tabs, className, style }: Props) {
	const ref = useRef(null)

	const [activeTab, setActiveTab] = useState(0)

	return (
		<div
			className={cx('overflow-x-scroll pb-4', className)}
			id="tabs"
			ref={ref}
		>
			<Stack row space={2}>
				{tabs.map((tab, index) => (
					<Tab
						name={tab.title}
						key={tab.value}
						active={activeTab === index}
						onClick={() => setActiveTab(index)}
					/>
				))}
			</Stack>
		</div>
	)
}

export default Tabs
