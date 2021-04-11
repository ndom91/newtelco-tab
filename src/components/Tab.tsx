import React from 'react'
import { motion } from 'framer-motion'
import tw from 'twin.macro'

type TabProps = {
  activeTab: boolean
  label: string
  onClick: () => void
}

const item = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const activeStyles = tw`border-newtelco-500!`

const Tab: React.FC<TabProps> = (
  { activeTab, label, onClick },
  ref,
): React.ReactElement => {
  return (
    <motion.li
      variants={item}
      role="presentation"
      ref={ref}
      css={[activeTab && activeStyles]}
      tw="mx-4 px-2 border-b border-transparent hover:cursor-pointer transition-colors duration-500"
      onClick={onClick}
    >
      {label}
    </motion.li>
  )
}

export default Tab
