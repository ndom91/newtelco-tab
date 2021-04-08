import React, { useState } from 'react'
import Layout from '@/components/Layout'
import Welcome from '@/components/Welcome'
import GoogleWorkspace from '@/components/GoogleWorkspace'
import AppList from '@/components/AppList'
import { SelectedCategory } from '@/components/ActiveCategory'

const IndexPage: React.FC = (): React.ReactElement => {
  const [activeCategory, setActiveCategory] = useState('general')

  return (
    <SelectedCategory.Provider value={{ activeCategory, setActiveCategory }}>
      <Layout>
        <div
          tw="flex flex-row overflow-y-scroll lg:overflow-hidden lg:grid lg:gap-2 h-full"
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
