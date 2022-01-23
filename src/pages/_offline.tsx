import React, { useState } from 'react'
import {
  SelectedCategory,
  GoogleWorkspace,
  AppList,
  Layout,
} from '@/components/index'

const IndexPage: React.FC = (): React.ReactElement => {
  const [activeCategory, setActiveCategory] = useState('general')

  return (
    <SelectedCategory.Provider value={{ activeCategory, setActiveCategory }}>
      <Layout>
        <div tw="flex h-full p-2 sm:p-6 lg:p-8 justify-center sm:justify-between">
          <AppList category={activeCategory} />
          <GoogleWorkspace />
        </div>
      </Layout>
    </SelectedCategory.Provider>
  )
}

export default IndexPage
