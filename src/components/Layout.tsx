import React, { ReactNode } from 'react'
import Head from 'next/head'
import { styled } from 'twin.macro'
import Sidebar from '@/components/Sidebar'

import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
}

const Content = styled.div`
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 12px 0 rgba(92, 92, 95, 0.27);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  width: 100%;
  max-height: 100%;
  margin: 40px 40px 40px 10px;
`

const Layout = ({ children }: Props): React.ReactElement => (
  <div className={styles.layoutWrapper}>
    <Head>
      <title>NewTelco Tab</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main tw="flex">
      <Sidebar />
      <Content>{children}</Content>
    </main>
  </div>
)

export default Layout
