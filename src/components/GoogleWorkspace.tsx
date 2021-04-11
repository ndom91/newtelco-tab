import React from 'react'
import { styled } from 'twin.macro'
import {
  CrmProjects,
  GDirectory,
  GDrive,
  GKeep,
  Tabs,
} from '@/components/index'

type TabProps = {
  label: string
}

const Tab = styled.div<TabProps>`
  margin: 0 10px;
`

const GoogleWorkspace = (): React.ReactElement => {
  return (
    <Tabs>
      <Tab label="Google Drive" key="drive">
        <GDrive />
      </Tab>
      <Tab label="Directory" key="dir">
        <GDirectory />
      </Tab>
      <Tab label="CRM Projects" key="projects">
        <CrmProjects />
      </Tab>
      <Tab label="Notes" key="keep">
        <GKeep />
      </Tab>
    </Tabs>
  )
}

export default GoogleWorkspace
