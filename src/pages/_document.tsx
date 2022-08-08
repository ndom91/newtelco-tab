import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // eslint-disable-next-line
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <meta name="application-name" content="NewTelco Launcher" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="NewTelco Launcher" />
          <meta name="description" content="NewTelco Portal" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#67B246" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#4d4d4d" />

          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icon-192.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icon-192.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://portal.newtelco.de" />
          <meta name="twitter:title" content="NewTelco" />
          <meta name="twitter:description" content="NewTelco Home" />
          <meta
            name="twitter:image"
            content="https://portal.newtelco.de/favicon.png"
          />
          <meta name="twitter:creator" content="@newtelcode" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="NewTelco Launcher" />
          <meta property="og:description" content="NewTelco Home" />
          <meta property="og:site_name" content="NewTelco" />
          <meta property="og:url" content="https://portal.newtelco.de" />
          <meta
            property="og:image"
            content="https://portal.newtelco.de/favicon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
