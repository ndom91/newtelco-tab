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
  console.log(person)
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
        <img
          alt="User Profile Picture"
          src={
            img === '' || !img || img.includes('AATXAJ')
              ? `https://avatars.dicebear.com/api/croodles/${email}-${position}.svg?backgroundColor=white`
              : img
          }
          tw="w-[5.5rem] h-[5.5rem] rounded-lg"
        />
        <div tw="flex justify-between w-full">
          <div tw="flex flex-col">
            <p tw="text-gray-300 text-xl text-xl font-light">
              {name}
              &nbsp; (-
              <span tw="text-gray-300">
                {officePhone.substring(
                  officePhone.length - 2,
                  officePhone.length,
                )}
              </span>
              )
            </p>
            <p tw="text-gray-500 text-lg font-light">{position}</p>
          </div>
          <div tw="flex flex-col justify-around h-full text-right">
            <p tw="mb-1">
              <span tw="text-lg font-light text-gray-400">
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            </p>
            <p tw="text-gray-500 text-base font-light">
              <svg
                tw="w-4 h-4 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {officePhone}
            </p>
            <p tw="text-gray-500 text-base font-light">
              {mobilePhone && (
                <span>
                  <svg
                    tw="w-4 h-4 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  {mobilePhone}
                </span>
              )}
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
              tw="flex items-center p-2 text-white text-sm rounded-md outline-none hocus:outline-none transition-shadow duration-500 ease-in-out hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="w-6 h-6"
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
              tw="flex items-center p-2 text-white text-sm rounded-md outline-none hocus:outline-none transition-shadow duration-500 ease-in-out hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="w-6 h-6"
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
    </motion.div>
  )
}

export default UserCard
