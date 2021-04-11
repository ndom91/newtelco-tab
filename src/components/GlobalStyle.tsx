import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { GlobalStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
    margin: 0;
    padding: 0;
  }

    /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #3c3b3b1b;
    border-radius: 100vh;
    transition: all 250ms ease-in-out;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #3c3b3b4b;
    cursor: pointer;
  }
`

const GlobalStyle = (): React.ReactElement => {
  return (
    <>
      <GlobalStyles />
      <CustomStyles />
    </>
  )
}

export default GlobalStyle
