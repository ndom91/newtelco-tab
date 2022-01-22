import React from 'react'
import { motion } from 'framer-motion'

type ProjectProps = {
  project: {
    id: number
    status: string
    description: string
  }
}

const CrmProject = ({ project }: ProjectProps): React.ReactElement => {
  return (
    <motion.div tw="py-1" whileHover={{ x: 10 }}>
      <a
        tw="flex items-start"
        href={`https://crm.newtelco.de/projects/order/search?searchProjectId=${project.id}`}
        target="_blank"
        rel="noopener noreferer"
      >
        <span tw="p-2 text-newtelco-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
        </span>
        <div tw="flex items-center justify-between w-full">
          <div tw="flex flex-col items-start justify-between ml-2 w-full text-sm">
            <h3 tw="mr-1 text-xl font-medium">DS{project.id}</h3>
            <p tw="text-neutral-200 font-thin">{project.status}</p>
            <p tw="text-neutral-500 font-thin">{project.description}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </motion.div>
  )
}

export default CrmProject
