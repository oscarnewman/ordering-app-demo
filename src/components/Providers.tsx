import { toastOptions } from '@/utilities/toast'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<Toaster toastOptions={toastOptions} />
		</>
	)
}

export default Providers
