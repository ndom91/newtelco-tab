import React, { ReactNode } from 'react'
import { Sidebar } from '@/components/index'
import { styled } from 'twin.macro'
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
    background: url('/bg-blur.png');
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
`

const Layout = ({ children }: Props): React.ReactElement => (
  <Wrapper>
    <Head>
      <title>NewTelco Tab</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main tw="flex" css="max-height:100vh; max-width:100vw;">
      <Sidebar />
      <Content tw="m-4 ml-0 sm:m-10 sm:ml-0">{children}</Content>
      <div tw="absolute bottom-3 left-20 text-gray-100 opacity-20 text-xs">
        <kbd tw="border-2 p-0.5 border-gray-200 rounded-md">Ctrl</kbd> +{` `}
        <kbd tw="border-2 p-0.5 border-gray-200 rounded-md mr-1">k</kbd> for
        command palette
      </div>
    </main>
  </Wrapper>
)

export default Layout
