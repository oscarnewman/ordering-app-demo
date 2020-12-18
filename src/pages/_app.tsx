import { useRouteProgressBar } from '@/hooks/useRouteProgressBar'
import '@/styles/nprogress.css'
import '@/styles/tailwind.css'
import { initSentry } from '@/utilities/sentry'
import { useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

initSentry()

// @ts-ignore
if (typeof window !== 'undefined') window.__forceSmoothScrollPolyfill__ = true

function MyApp({ Component, pageProps, err }) {
	useRouteProgressBar()

	useEffect(() => {
		smoothscroll.polyfill()
	}, [])

	// Workaround for https://github.com/vercel/next.js/issues/8592
	return <Component {...pageProps} err={err} />
}

export default MyApp
