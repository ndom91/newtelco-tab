import React, { useState, useEffect } from 'react'
import AppLink from '@/components/AppLink'

type AppListProps = {
  category: string
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
      <div tw="grid grid-cols-1 lg:grid-cols-2 gap-6" css="grid-template-rows: repeat(12, 20px)">
        {activeApps && activeApps.map((app, index) => <AppLink index={index} key={app.title} app={app} />)}
      </div>
    </div>
  )
}

export default AppList
