import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import GlobalStyle from './../components/GlobalStyles'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
