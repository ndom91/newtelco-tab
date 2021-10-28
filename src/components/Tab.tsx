import React from 'react'
import { motion } from 'framer-motion'

type TabProps = {
  activeTab: boolean
  label: string
  onClick: () => void
}

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 22,
}

const Tab: React.FC<TabProps> = ({
  activeTab,
  label,
  onClick,
}): React.ReactElement => {
  return (
    <li
      role="presentation"
      tw="relative flex items-center mx-2 py-2 rounded-md hover:cursor-pointer transition-colors duration-500 lg:px-4"
      data-blobity
      onClick={onClick}
    >
      <span tw="relative z-10 inline-block align-middle text-center">
        {label}
      </span>
      {activeTab && (
        <motion.div
          tw="absolute left-0 top-0 w-full h-full rounded-md"
          layoutId="outline"
          initial={false}
          animate={{ backgroundColor: '#171717' }}
          transition={spring}
        />
      )}
    </li>
  )
}

export default Tab
