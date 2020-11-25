import '@/styles/tailwind.css'
import '@/styles/nprogress.css'

import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import { GetStaticPropsContext } from 'next'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	useEffect(() => {
		nProgress.configure({
			showSpinner: false,
		})

		router.events.on('routeChangeStart', nProgress.start)
		router.events.on('routeChangeComplete', nProgress.done)
		router.events.on('routeChangeError', () => nProgress.done(true))
	}, [])

	useEffect(() => {
		smoothscroll.polyfill()
	}, [])
	return <Component {...pageProps} />
}

export default MyApp
