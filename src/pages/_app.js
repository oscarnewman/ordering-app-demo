import '@/styles/tailwind.css'
import { useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
function MyApp({ Component, pageProps }) {
	useEffect(() => {
		smoothscroll.polyfill()
	}, [])
	return <Component {...pageProps} />
}

export default MyApp
