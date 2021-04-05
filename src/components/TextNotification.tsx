import React from 'react'

type TextNotificationProps = {
  title: string
  body: string
}

const TextNotification = ({ title, body }: TextNotificationProps): React.ReactElement => {
  return (
    <div tw="inline-flex items-center bg-white leading-none ${props.textColor} rounded-full p-2 shadow text-teal text-sm">
      <span tw="inline-flex bg-gray-700 text-white rounded-full h-6 px-3 justify-center items-center">{title}</span>
      <span tw="inline-flex px-2 text-gray-700">{body}</span>
    </div>
  )
}

export default TextNotification
