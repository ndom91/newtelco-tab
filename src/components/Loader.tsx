import React from 'react'
import { css } from 'twin.macro'

const LoaderStyles = css`
  border-top-color: #67b247 !important;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = (): React.ReactElement => {
  return (
    <div tw="flex h-1/2 justify-center my-4">
      <div css={LoaderStyles} tw="ease-linear rounded-full border-4 border-t-4 border-gray-600 h-12 w-12 mb-4"></div>
    </div>
  )
}

export default Loader
