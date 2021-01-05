import { Meta } from '@storybook/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default {
	title: 'UI/Toast',
} as Meta

export const Basic = () => {
	const [id, setId] = useState(null)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
			<button
				className="border p-2 rounded"
				onClick={() => toast('This is a toast')}
			>
				Show a default toast
			</button>

			<button
				className="border p-2 rounded"
				onClick={() => toast.success('This is a toast')}
			>
				Show a success toast
			</button>

			<button
				className="border p-2 rounded"
				onClick={() => toast.error('This is a toast')}
			>
				Show a error toast
			</button>
			<button
				className="border p-2 rounded"
				onClick={() => !id && setId(toast.loading('This is a toast'))}
			>
				Show a loading toast
			</button>
			<button
				className="border p-2 rounded"
				onClick={() => {
					id && toast.dismiss(id)
					setId(null)
				}}
			>
				Dismiss Loading Toast
			</button>
		</div>
	)
}
