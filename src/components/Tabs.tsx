import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tab } from '@/components/index'

type TabsProps = {
  children: React.ReactElement[]
}

const list = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const Tabs: React.FC<TabsProps> = ({ children }): React.ReactElement => {
  const [activeTab, setActiveTab] = useState('Google Drive')

  return (
    <div
      tw="relative flex flex-1 flex-col col-start-2 row-span-2 row-start-2 px-12"
      css="max-width: 800px"
    >
      <ul tw="inline-flex mb-4 font-thin">
        {children.map((child) => {
          const { label } = child.props

          return (
            <Tab
              activeTab={activeTab === label}
              key={label}
              label={label}
              onClick={() => setActiveTab(label)}
            />
          )
        })}
      </ul>
      <div tw="w-full">
        <motion.div
          variants={list}
          initial="hidden"
          animate="visible"
          transition={{ ease: 'easeOut', duration: 1 }}
        >
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Tabs
