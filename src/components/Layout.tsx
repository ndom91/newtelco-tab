import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props): React.ReactElement => (
  <div className={styles.layoutWrapper}>
    <Head>
      <title>NewTelco Tab</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <main className={styles.glassWrapper}>{children}</main>
    <Footer />
  </div>
)

export default Layout
