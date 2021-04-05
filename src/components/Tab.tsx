import React from 'react'
import tw from 'twin.macro'

type TabProps = {
  activeTab: boolean
  label: string
  onClick: () => void
}

const activeStyles = tw`
  border-newtelco-500 border-b-2 
`

const Tab: React.FC<TabProps> = ({ activeTab, label, onClick }): React.ReactElement => {
  return (
    <li css={[activeTab && activeStyles]} tw="mx-4 px-2 hover:cursor-pointer" onClick={onClick}>
      {label}
    </li>
  )
}

export default Tab
