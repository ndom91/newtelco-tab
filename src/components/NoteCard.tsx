import React, { useState } from 'react'
import { graphQLClient } from '../utils/graphql-client'
import { Tooltip } from 'react-tippy'
import { Loader } from '@/components/index'
import { gql } from 'graphql-request'

type IKeepNote = {
  note: {
    _id: number
    body: string
    title: string
    createdAt: string
    updatedAt: string
  }
  handleDelete: (id: number) => void
}

const KeepNote: React.FC<IKeepNote> = ({
  note,
  handleDelete,
}): React.ReactElement => {
  const [loading, setLoading] = useState(false)

  const dbDelete = async () => {
    setLoading(true)
    const query = gql`
      mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) {
          _id
        }
      }
    `

    try {
      await graphQLClient.request(query, { id: note._id })
      handleDelete(note._id)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  return (
    <div tw="p-4 font-thin bg-gray-900">
      <div tw="flex items-center justify-between">
        <span tw="text-gray-700 text-sm font-light">
          {new Date(note.createdAt).toLocaleString('de-DE')}
        </span>
        <Tooltip
          title="Delete"
          position="left"
          size="small"
          arrow
          interactiveBorder={20}
          delay={250}
          distance={20}
          theme="transparent"
        >
          <button
            tw="hover:(ring-4 ring-opacity-20) px-1 h-6 text-white text-sm font-bold rounded focus:outline-none cursor-pointer transform transition-shadow duration-500 ring-newtelco-500"
            onClick={dbDelete}
          >
            {loading ? (
              <Loader extrasmall />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="16"
                width="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </Tooltip>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: note.body.replace(/\r\n|\r|\n/g, '</br>'),
        }}
      />
    </div>
  )
}

export default KeepNote
