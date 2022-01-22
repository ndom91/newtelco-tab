import React, { useState } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
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
    <div tw="relative hidden md:flex flex-1 flex-col px-2 lg:px-8 w-1/2 py-4">
      <ul tw="inline-flex mb-4 font-thin justify-between">
        <AnimateSharedLayout>
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
        </AnimateSharedLayout>
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
