import React from 'react'
import { createGlobalStyle } from 'styled-components'
// import tw, { theme, GlobalStyles } from 'twin.macro'
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
