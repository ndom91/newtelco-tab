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
        <div tw="w-full h-full grid gap-2 grid-cols-2 grid-rows-3 overflow-hidden" css="grid-template-rows: auto 1fr 1fr">
          <Welcome />
          <AppList category={activeCategory} />
          <GoogleWorkspace />
        </div>
      </Layout>
    </SelectedCategory.Provider>
  )
}

export default IndexPage
