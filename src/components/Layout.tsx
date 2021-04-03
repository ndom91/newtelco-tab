import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props): React.ReactElement => (
  <div>
    <Head>
      <title>NewTelco Tab</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    </header>
    {children}
    <Footer />
  </div>
)

export default Layout
