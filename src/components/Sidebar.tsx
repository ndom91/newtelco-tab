import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useGlobalContext } from './ActiveCategory'
import { Tooltip } from 'react-tippy'
import { motion } from 'framer-motion'
import tw from 'twin.macro'

const Sidebar = (): React.ReactElement => {
  const { data: session } = useSession()
  const { activeCategory, setActiveCategory } = useGlobalContext()

  return (
    <div tw="flex flex-row h-full">
      <nav tw="flex flex-col justify-between w-14 sm:w-20 h-screen bg-transparent">
        <div tw="mb-10 mt-4 sm:mt-10 justify-center">
          <img // eslint-disable-line @next/next/no-img-element
            alt="Profile Image"
            src={session?.user.image ?? '/favicon.png'}
            height="40px"
            width="40px"
            tw="mb-3 mx-auto w-10 h-10 rounded-full"
          />
          <div tw="mt-10">
            <ul>
              <li tw="my-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tw="flex items-center justify-center mx-auto w-8 h-8 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
                  css={[
                    activeCategory === 'general' &&
                      tw`ring-4 ring-opacity-20 ring-newtelco-500`,
                  ]}
                  onClick={() => setActiveCategory('general')}
                >
                  {/* @ts-ignore */}
                  <Tooltip
                    title="General"
                    position="right"
                    arrow
                    interactiveBorder={20}
                    delay={250}
                    distance={20}
                    theme="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      name="Briefcase"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </Tooltip>
                </motion.button>
              </li>
              <li tw="my-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tw="flex items-center justify-center mx-auto w-8 h-8 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
                  css={[
                    activeCategory === 'technik' &&
                      tw`ring-4 ring-opacity-20 ring-newtelco-500`,
                  ]}
                  onClick={() => setActiveCategory('technik')}
                >
                  {/* @ts-ignore */}
                  <Tooltip
                    title="Tech"
                    position="right"
                    arrow
                    interactiveBorder={20}
                    delay={250}
                    distance={20}
                    theme="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      name="Chip"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </Tooltip>
                </motion.button>
              </li>
              <li tw="my-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tw="flex items-center justify-center mx-auto w-8 h-8 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
                  css={[
                    activeCategory === 'order' &&
                      tw`ring-4 ring-opacity-20 ring-newtelco-500`,
                  ]}
                  onClick={() => setActiveCategory('order')}
                >
                  {/* @ts-ignore */}
                  <Tooltip
                    title="Order"
                    position="right"
                    arrow
                    interactiveBorder={20}
                    delay={250}
                    distance={20}
                    theme="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      name="Calculator"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </Tooltip>
                </motion.button>
              </li>
              <li tw="my-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tw="flex items-center justify-center mx-auto w-8 h-8 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
                  css={[
                    activeCategory === 'billing' &&
                      tw`ring-4 ring-opacity-20 ring-newtelco-500`,
                  ]}
                  onClick={() => setActiveCategory('billing')}
                >
                  {/* @ts-ignore */}
                  <Tooltip
                    title="Billing"
                    position="right"
                    arrow
                    interactiveBorder={20}
                    delay={250}
                    distance={20}
                    theme="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      name="Euro"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Tooltip>
                </motion.button>
              </li>
              <li tw="my-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  tw="flex items-center justify-center mx-auto w-8 h-8 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
                  css={[
                    activeCategory === 'marketing' &&
                      tw`ring-4 ring-opacity-20 ring-newtelco-500`,
                  ]}
                  onClick={() => setActiveCategory('marketing')}
                >
                  {/* @ts-ignore */}
                  <Tooltip
                    title="Marketing"
                    position="right"
                    arrow
                    interactiveBorder={20}
                    delay={250}
                    distance={20}
                    theme="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      name="Megaphone"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </Tooltip>
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
        <div tw="flex justify-center mb-6">
          {/* @ts-ignore */}
          <Tooltip
            title="Sign Out"
            position="right"
            arrow
            interactiveBorder={20}
            delay={350}
            distance={20}
            offset={15}
            theme="transparent"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => signOut()}
              tw="flex items-center justify-center mx-auto my-auto w-6 h-6 text-gray-500 hover:text-newtelco-500 rounded outline-none focus:outline-none transition-all duration-500 hocus:ring-red-400 hocus:ring-offset-gray-900 hocus:ring-opacity-20 hocus:ring-4"
            >
              <svg
                tw="mx-auto w-5 h-5 text-gray-300 hover:text-red-500 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                  fill="currentColor"
                ></path>
              </svg>
            </motion.button>
          </Tooltip>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
