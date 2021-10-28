import React, { ReactNode } from 'react'
import { Sidebar } from '@/components/index'
import { styled } from 'twin.macro'
import useBlobity from 'blobity/lib/useBlobity'
import Head from 'next/head'

type Props = {
  children?: ReactNode
}

const Wrapper = styled.div`
  background-color: #18181b;
  background-image: radial-gradient(
    #4d4d4d 0.9500000000000001px,
    #18181b 0.9500000000000001px
  );
  background-size: 19px 19px;
  color: white;
  &::before {
    content: '';
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0px;
    top: 0px;
    opacity: 0.6;
    background: url('/home-bg-blur2.png');
    object-fit: cover;
    pointer-events: none;
  }
`

const Content = styled.div`
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  width: 100%;
  max-height: calc(100vh - 80px);
  margin: 40px 40px 40px 0px;
`

const Layout = ({ children }: Props): React.ReactElement => {
  if (typeof window !== 'undefined') {
    useBlobity({
      color: '#67B246',
      opacity: 0.2,
      size: 80,
      magnetic: false,
      zIndex: 99,
      radius: 8,
      focusableElements: 'null',
      focusableElementsOffsetX: -2,
      focusableElementsOffsetY: -2,
    })
  }

  return (
    <Wrapper>
      <Head>
        <title>NewTelco Tab</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main tw="flex" css="max-height:100vh; max-width:100vw;">
        <Sidebar />
        <Content>{children}</Content>
      </main>
    </Wrapper>
  )
}

export default Layout
