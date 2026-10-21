import { randomBytes } from 'node:crypto'
import {
  createStartHandler,
  defaultStreamHandler,
  setResponseHeader,
} from '@tanstack/react-start/server'

// Sets the nonce on the router after it is created. Works with router-core 1.171.30;
// from 1.171.31 the hydration scripts render without it.
const fetch = createStartHandler((ctx) => {
  const nonce = randomBytes(16).toString('base64')
  ctx.router.options.ssr = { ...ctx.router.options.ssr, nonce }

  const csp = `script-src 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`
  setResponseHeader('Content-Security-Policy', csp)
  ctx.responseHeaders.set('Content-Security-Policy', csp)

  return defaultStreamHandler(ctx)
})

export default { fetch }
