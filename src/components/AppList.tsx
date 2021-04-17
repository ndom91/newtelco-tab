import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppLink } from '@/components/index'

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
      staggerChildren: 0.1,
    },
  },
}

const AppList: React.FC<AppListProps> = ({ category }): React.ReactElement => {
  const [activeApps, setActiveApps] = useState([])

  useEffect(() => {
    fetch(`/api/apps/${category}`)
      .then((res) => res.json())
      .then((data) => {
        const apps = data[0].apps
        setActiveApps(apps)
      })
      .catch((err) => console.error(err))
  }, [category])

  return (
    <div
      tw="col-start-1 row-span-2 row-start-2 px-8 max-h-full overflow-y-scroll"
      css="max-width: 800px"
    >
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={list}
          key={category}
          layout
          transition={{
            layoutX: { duration: 0.2 },
            layoutY: { duration: 0.0 },
          }}
          tw="grid gap-6 grid-cols-1 p-2 lg:grid-cols-2"
          css="grid-template-rows: repeat(12, 20px)"
        >
          {activeApps &&
            activeApps.map((app, index) => (
              <AppLink index={index} custom={index} key={index} app={app} />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default AppList
