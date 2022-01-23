import React from 'react'
import { Tooltip } from 'react-tippy'
import { motion } from 'framer-motion'

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
    <motion.div
      tw="p-4 w-full bg-gray-800 rounded-2xl shadow-lg"
      whileHover={{ scale: 1.03 }}
    >
      <div tw="flex flex-row gap-4 items-start">
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img alt="User Profile Picture" src={img} tw="w-20 h-20 rounded-lg" />
        <div tw="flex flex-col justify-between w-full">
          <div>
            <p tw="text-white text-xl font-medium">{name}</p>
            <p tw="text-gray-500 text-xs">{position}</p>
            <p tw="text-gray-500 text-xs">
              O: {officePhone.substring(0, officePhone.length - 2) ?? ''}
              <b>
                {officePhone.substring(
                  officePhone.length - 2,
                  officePhone.length,
                )}
              </b>
            </p>
            <p tw="text-gray-500 text-xs">
              {mobilePhone && <span>M: {mobilePhone}</span>}
            </p>
          </div>
        </div>
        <div tw="flex flex-col self-stretch justify-around space-y-2">
          <Tooltip
            title="Call"
            size="small"
            position="left"
            arrow
            interactiveBorder={20}
            delay={250}
            distance={20}
            theme="transparent"
          >
            <a
              href={`tel:${phones[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              tw="flex items-center px-1 py-1 text-white text-sm rounded-md outline-none hocus:outline-none transition-shadow duration-500 ease-in-out hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="20"
                width="20"
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
          <Tooltip
            title="Email"
            size="small"
            position="left"
            arrow
            interactiveBorder={20}
            delay={250}
            distance={20}
            theme="transparent"
          >
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              tw="flex items-center px-1 py-1 text-white text-sm rounded-md outline-none hocus:outline-none transition-shadow duration-500 ease-in-out hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="20"
                width="20"
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
    </motion.div>
  )
}

export default UserCard
