import React, { useState } from 'react'
import Tab from '@/components/Tab'

type TabsProps = {
  children: React.ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({ children }): React.ReactElement => {
  const [activeTab, setActiveTab] = useState('Google Drive')
  return (
    <div tw="px-12 row-span-2 row-start-2 col-start-2 flex flex-col flex-1 my-auto" css="max-width: 800px">
      <ul tw="inline-flex mb-4 font-thin">
        {children.map((child) => {
          const { label } = child.props

          return <Tab activeTab={activeTab === label} key={label} label={label} onClick={() => setActiveTab(label)} />
        })}
      </ul>
      <div tw="w-full">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}
      </div>
    </div>
  )
}

export default Tabs
