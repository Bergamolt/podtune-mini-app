import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://8370a104751f208d5a2ce6f954d9fbb0@o4505625611403264.ingest.us.sentry.io/4507685016764416',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
