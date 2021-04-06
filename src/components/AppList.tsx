import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AppLink from '@/components/AppLink'

type AppListProps = {
  category: string
}

const list = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
}

const AppList: React.FC<AppListProps> = ({ category }): React.ReactElement => {
  const [activeApps, setActiveApps] = useState([])

  useEffect(() => {
    fetch(`/api/apps/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setActiveApps(data[0].apps)
      })
      .catch((err) => console.error(err))
  }, [category])

  return (
    <div
      tw="row-start-2 row-span-2 col-start-1 justify-self-stretch px-8 overflow-y-scroll lg:overflow-hidden self-stretch mx-auto"
      css="max-width: 800px"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        tw="grid grid-cols-1 lg:grid-cols-2 gap-6"
        css="grid-template-rows: repeat(12, 20px)"
      >
        {activeApps && activeApps.map((app, index) => <AppLink index={index} key={index} app={app} />)}
      </motion.div>
    </div>
  )
}

export default AppList
