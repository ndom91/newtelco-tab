import React from 'react'

type AppLinkProps = {
  title: string
  desc: string
  img: string
  url: string
}

const AppLink = ({ title, desc, img, url }: AppLinkProps): React.ReactElement => {
  return (
    <div tw="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden">
      <a href={url} rel="noopener noreferer" target="_blank">
        <img alt="moto" src={img} tw="absolute -right-20 -bottom-8 h-40 w-40 mb-4" />
        <div tw="w-4/6">
          <p tw="text-gray-800 text-lg font-medium mb-2">{title}</p>
          <p tw="text-gray-400 text-xs">{desc}</p>
        </div>
      </a>
    </div>
  )
}

export default AppLink
