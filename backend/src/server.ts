import { init } from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

import app from './app'

const initSentry = (): void => {
  if (!process.env.SENTRY_DSN) {
    return
  }

  init({
    dsn: process.env.SENTRY_DSN,
    release: `farma-geo@${process.env.npm_package_version}`,
    integrations: [
      new RewriteFrames({
        root: global.__rootdir__,
      }),
    ],
  })
}

/* this line is for sentry configuration with typescript */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd()

initSentry()
/* sentry config ends here */

console.log(process.env.npm_package_version)

app.listen(process.env.NODE_PORT)
