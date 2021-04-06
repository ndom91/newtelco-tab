import React from 'react'
import { Tooltip } from 'react-tippy'

type UserCardProps = {
  person: {
    name: string
    phones: string
    email: string
    position: string
    department: string
    img: string
  }
}

const UserCard = ({ person }: UserCardProps): React.ReactElement => {
  const { name, phones, email, position, img } = person
  const officePhone = phones[0]?.toString() ?? ''
  const mobilePhone = phones[1]?.toString() ?? ''
  return (
    <div tw="shadow-lg rounded-2xl p-4 bg-gray-800 w-full">
      <div tw="flex flex-row items-start gap-4">
        <img src={img} tw="w-20 h-20 rounded-lg" />
        <div tw="w-full flex flex-col justify-between">
          <div>
            <p tw="text-white text-xl font-medium">{name}</p>
            <p tw="text-gray-500 text-xs">{position}</p>
            <p tw="text-gray-500 text-xs">
              O: {officePhone.substring(0, officePhone.length - 2) ?? ''}
              <b>{officePhone.substring(officePhone.length - 2, officePhone.length)}</b>
            </p>
            <p tw="text-gray-500 text-xs">{mobilePhone && <span>M: {mobilePhone}</span>}</p>
          </div>
        </div>
        <div tw="flex flex-col justify-around space-y-2">
          <Tooltip title="Call" position="left" arrow interactiveBorder={20} delay={250} distance={20} theme="transparent">
            <a
              href={`tel:${phones[0]}`}
              target="_blank"
              rel="noopener noreferer"
              tw="text-sm text-newtelco-500 py-1 px-2 rounded-md border border-newtelco-600 flex items-center hocus:(outline-none ring-4 ring-newtelco-500 ring-opacity-20) transition-shadow duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="24"
                width="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          </Tooltip>
          <Tooltip title="Email" position="left" arrow interactiveBorder={20} delay={250} distance={20} theme="transparent">
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferer"
              tw="text-sm text-newtelco-500 py-1 px-2 rounded-md border border-newtelco-600 flex items-center hocus:(outline-none ring-4 ring-newtelco-500 ring-opacity-20) transition-shadow duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="24"
                width="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default UserCard
