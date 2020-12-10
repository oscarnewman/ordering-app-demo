import { RewriteFrames } from '@sentry/integrations'
import * as Sentry from '@sentry/node'

const {
	NEXT_PUBLIC_SENTRY_DSN,
	NEXT_IS_SERVER,
	NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
	NEXT_PUBLIC_COMMIT_SHA,
	NODE_ENV,
} = process.env

export const initSentry = () => {
	if (NEXT_PUBLIC_SENTRY_DSN) {
		const integrations = []
		if (NEXT_IS_SERVER === 'true' && NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
			// For Node.js, rewrite Error.stack to use relative paths, so that source
			// maps starting with ~/_next map to files in Error.stack with path
			// app:///_next
			integrations.push(
				new RewriteFrames({
					iteratee: frame => {
						frame.filename = frame.filename.replace(
							NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
							'app:///'
						)
						frame.filename = frame.filename.replace('.next', '_next')
						return frame
					},
				})
			)
		}

		Sentry.init({
			enabled: NODE_ENV === 'production',
			integrations,
			dsn: NEXT_PUBLIC_SENTRY_DSN,
			release: NEXT_PUBLIC_COMMIT_SHA,
		})
	}
}
