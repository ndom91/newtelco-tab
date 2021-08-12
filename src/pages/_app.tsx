import React from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { GlobalStyle } from '@/components/index'

import 'react-tippy/dist/tippy.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
