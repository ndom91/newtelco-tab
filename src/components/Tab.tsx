import React from 'react'
import { motion } from 'framer-motion'

type TabProps = {
  activeTab: boolean
  label: string
  onClick: () => void
}

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 22
};

const Tab: React.FC<TabProps> = (
  { activeTab, label, onClick }
): React.ReactElement => {
  return (
    <li
      role="presentation"
      tw="relative mx-2 py-2 lg:px-4 hover:cursor-pointer transition-colors duration-500 rounded-md flex items-center"
      onClick={onClick}
    >
      <span tw="relative z-10 text-center inline-block align-middle">{label}</span>
      {activeTab && 
        <motion.div 
          tw="absolute top-0 left-0 w-full h-full rounded-md" 
          layoutId="outline" 
          initial={false} 
          animate={{ backgroundColor: '#171717' }} 
          transition={spring} 
        />}
    </li>
  )
}

export default Tab
