import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
