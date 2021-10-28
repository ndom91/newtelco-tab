import React from 'react'
import { motion } from 'framer-motion'
import { css } from 'twin.macro'

type AppLinkProps = {
  index: number
  app: {
    name: string
    desc?: string
    img: string
    url: string
  }
}

const item = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
}

const offsetStyle = css`
  margin-top: 10px;
  grid-row: span 4 / span 4 !important;
`

const AppLink = ({ index, app }: AppLinkProps): React.ReactElement => {
  if (!app.name)
    return <motion.div transition={spring} variants={item}></motion.div>

  const { name, img, url } = app
  const hostname = new URL(url).hostname

  return (
    <motion.a
      variants={item}
      transition={spring}
      whileHover={{ scale: 1.075, rotate: Math.random() > 0.4 ? -1 : 1 }}
      whileTap={{ scale: 0.95 }}
      tw="hover:(ring-4 ring-opacity-20) focus-within:(ring-4 ring-opacity-20) relative flex items-start justify-between p-8 h-full bg-gray-900 rounded-xl focus:outline-none shadow-lg overflow-hidden transition-shadow duration-500 ring-newtelco-500"
      css={[
        index === 0 && offsetStyle,
        index % 2 === 0
          ? 'grid-row: span 4 / span 4; min-width: 250px;'
          : 'grid-row: span 5 / span 4; min-width: 250px;',
      ]}
      href={url}
      rel="noopener noreferer"
      target="_blank"
    >
      <div tw="flex flex-col justify-between h-full">
        <p tw="mb-1 text-white text-2xl font-thin">{name}</p>
        <p tw="text-newtelco-700 text-xs">{hostname}</p>
      </div>
      <img alt="moto" src={`/icons/${img}`} tw="w-16 h-16" />
    </motion.a>
  )
}

export default AppLink
