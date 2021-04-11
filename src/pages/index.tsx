import React, { useState } from 'react'
import {
  SelectedCategory,
  GoogleWorkspace,
  Welcome,
  AppList,
  Layout,
} from '@/components/index'

const IndexPage: React.FC = (): React.ReactElement => {
  const [activeCategory, setActiveCategory] = useState('general')

  return (
    <SelectedCategory.Provider value={{ activeCategory, setActiveCategory }}>
      <Layout>
        <div
          tw="flex flex-row h-full overflow-y-scroll lg:grid lg:gap-2 lg:overflow-hidden"
          css="grid-template-rows: minmax(0,100px) minmax(0,1fr) minmax(0, 1fr); grid-template-columns: repeat(auto-fit, minmax(600px, 1fr)); flex-wrap: wrap;"
        >
          <Welcome />
          <AppList category={activeCategory} />
          <GoogleWorkspace />
        </div>
      </Layout>
    </SelectedCategory.Provider>
  )
}

export default IndexPage
