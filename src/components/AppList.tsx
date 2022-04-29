import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppLink } from '@/components/index'

type AppListProps = {
  category: string
}

const list = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const AppList: React.FC<AppListProps> = ({ category }): React.ReactElement => {
  const [activeApps, setActiveApps] = useState([])

  useEffect(() => {
    fetch(`/api/apps/${category}`)
      .then((res) => res.json())
      .then((data) => {
        const apps = data.apps
        // setActiveApps(apps)
        const dummyArray = new Array(9 - apps.length).fill({
          name: '',
          url: '',
          img: '',
        })
        setActiveApps([...apps, ...dummyArray])
      })
      .catch((err) => console.error(err))
  }, [category])

  return (
    <div tw="px-2 sm:px-4 w-full max-h-full overflow-y-scroll md:w-1/2">
        <motion.div
          initial="hidden"
          layoutId={category}
          animate="visible"
          variants={list}
          key={category}
          tw="grid gap-8 grid-cols-1 p-0 sm:px-2 sm:py-4 xl:grid-cols-2"
          css="grid-template-rows: repeat(12, 20px)"
        >
          {activeApps?.map((app, index) => (
            <AppLink index={index} category={category} key={`${category}-${index}`} app={app} />
          ))}
        </motion.div>
    </div>
  )
}

export default AppList
