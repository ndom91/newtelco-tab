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

const Loader: React.FC<ILoader> = ({
  extrasmall,
  small,
}): React.ReactElement => {
  return (
    <div
      tw="flex justify-center"
      css={[
        small ? tw`-mb-1 w-6 h-6` : tw`my-4`,
        extrasmall && tw`-mb-4 -mt-2 w-4 h-4`,
      ]}
    >
      <div
        css={[
          LoaderStyles,
          small ? tw`mb-0! w-6 h-6` : tw`w-12 h-12`,
          extrasmall && tw`m-0! w-4 h-4`,
        ]}
        tw="mb-4 border-4 border-t-4 border-gray-600 rounded-full ease-linear"
      ></div>
    </div>
  )
}

export default Loader
