import React from 'react'

type UserCardProps = {
  name: string
  phone: string
  email: string
  position: string
  img: string
}

const UserCard = ({ name, phone, email, position, img }: UserCardProps): React.ReactElement => {
  return (
    <div tw="shadow-lg rounded-2xl w-80 p-4 bg-white dark:bg-gray-800">
      <div tw="flex flex-row items-start gap-4">
        <img src={img} tw="w-28 h-28 rounded-lg" />
        <div tw="h-28 w-full flex flex-col justify-between">
          <div>
            <p tw="text-gray-800 dark:text-white text-xl font-medium">{name}</p>
            <p tw="text-gray-400 text-xs">{position}</p>
          </div>
        </div>
      </div>
      <div tw="flex items-center justify-between gap-4 mt-6">
        <a
          href={`tel:${phone}`}
          target="_blank"
          rel="noopener noreferer"
          tw="w-1/2 px-4 py-2 text-base border rounded-lg text-grey-500 bg-white hover:bg-gray-200 "
        >
          Call
        </a>
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferer"
          tw="w-1/2 px-4 py-2 text-base border rounded-lg text-white bg-newtelco-500 hover:bg-newtelco-700 "
        >
          Email
        </a>
      </div>
    </div>
  )
}

export default UserCard
