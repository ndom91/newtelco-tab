import React from 'react'
import tw, { css } from 'twin.macro'

type ILoader = {
  small?: boolean
  extrasmall?: boolean
}

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

const Loader: React.FC<ILoader> = ({ extrasmall, small }): React.ReactElement => {
  return (
    <div tw="flex justify-center" css={[small ? tw`h-6 w-6 -mb-1` : tw`my-4`, extrasmall && tw`h-4 w-4 -mb-4 -mt-2`]}>
      <div
        css={[LoaderStyles, small ? tw`h-6 w-6 mb-0!` : tw`h-12 w-12`, extrasmall && tw`h-4 w-4 m-0!`]}
        tw="ease-linear rounded-full border-4 border-t-4 border-gray-600 mb-4"
      ></div>
    </div>
  )
}

export default Loader
