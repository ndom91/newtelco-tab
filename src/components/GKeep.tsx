import React, { useEffect, useState } from 'react'
import { Loader, KeepNote, RequireLogin } from '@/components/index'
import { graphQLClient } from '../utils/graphql-client'
import { useSession } from 'next-auth/react'
import { Tooltip } from 'react-tippy'
import { motion } from 'framer-motion'
import { gql } from 'graphql-request'

const item = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const GKeep: React.FC = () => {
  // @ts-ignore
  const { data: session } = useSession()
  const [keep, setKeep] = useState({
    notes: [],
    currentNote: '',
    loading: false,
    submitLoading: false,
    loginRequired: false,
    error: '',
  })

  if (!session?.user) {
    // setKeep({ ...keep, loading: false, loginRequired: true })
    return (
      <motion.div
        tw="relative p-4 w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden"
        css="height: auto;max-height: 650px"
        variants={item}
      >
        <div tw="flex items-center justify-between mb-4 p-4 w-full">
          <div tw="flex justify-center align-middle text-center text-white text-xl font-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="36"
              width="36"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span tw="ml-2 leading-9">Personal Notes</span>
          </div>
        </div>
        <div tw="flex flex-col justify-center align-middle h-48 text-center font-thin space-y-4">
          <p>Login to view notes</p>
          <RequireLogin />
        </div>
      </motion.div>
    )
  }

  const username = session.user.email.split('@')[0]

  useEffect(() => {
    setKeep({ ...keep, loading: true })
    const fetcher = async () => {
      const data = await graphQLClient.request(
        gql`
          query($createdBy: String!) {
            findNoteByUser(createdBy: $createdBy) {
              data {
                _id
                body
                createdBy
                createdAt
              }
            }
          }
        `,
        {
          createdBy: username,
        },
      )
      setKeep({
        ...keep,
        notes: data.findNoteByUser.data,
      })
    }
    void fetcher()
    setKeep({ ...keep, loading: false })
  }, [])

  const handleInput = (input) => {
    const value = input.target.value

    setKeep({
      ...keep,
      currentNote: value,
    })
  }

  const handleDelete = (id: number) => {
    const newNotes = keep.notes.filter((notes) => notes._id !== id)
    setKeep({
      ...keep,
      notes: newNotes,
    })
  }

  const handleSubmit = async () => {
    setKeep({ ...keep, submitLoading: true })
    const query = gql`
      mutation CreateNote(
        $body: String!
        $username: String!
        $datetime: Time!
      ) {
        createNote(
          data: { body: $body, createdBy: $username, createdAt: $datetime }
        ) {
          _id
          body
          createdBy
          createdAt
        }
      }
    `

    try {
      const data = await graphQLClient.request(query, {
        body: keep.currentNote,
        username: username,
        datetime: new Date().toISOString(),
      })
      setKeep({
        ...keep,
        currentNote: '',
        submitLoading: false,
        notes: [
          {
            _id: data.createNote._id,
            body: keep.currentNote,
            username: username,
            createdAt: new Date().toISOString(),
          },
          ...keep.notes,
        ],
      })
    } catch (error) {
      console.error(error)
      setKeep({
        ...keep,
        currentNote: '',
        submitLoading: false,
      })
    }
  }

  return (
    <motion.div
      tw="relative p-4 w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden"
      css="height: auto;max-height: 650px"
      variants={item}
    >
      <div tw="flex items-center justify-between mb-4 p-4 w-full">
        <div tw="flex justify-center align-middle text-center text-white text-xl font-normal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="36"
            width="36"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span tw="ml-2 leading-9">Personal Notes</span>
        </div>
      </div>
      <div tw="focus-within:(ring-4 ring-opacity-20) relative flex mx-8 whitespace-pre-wrap rounded-lg transition-shadow duration-500 ease-in-out ring-newtelco-500">
        <textarea
          id="note"
          value={keep.currentNote}
          placeholder="Note"
          onChange={(input) => handleInput(input)}
          tw="placeholder-gray-600 flex-1 px-4 py-2 w-full h-12 text-gray-200 text-base font-thin bg-gray-800 border border-gray-800 focus:border-transparent rounded-l-lg focus:outline-none shadow-sm appearance-none"
        />
        <Tooltip
          title="Save"
          position="top"
          arrow
          interactiveBorder={20}
          delay={250}
          distance={20}
          theme="transparent"
        >
          <button
            tw="px-4 py-3 h-full text-gray-100 text-sm font-medium tracking-wider hover:bg-gray-600 focus:bg-gray-600 bg-gray-700 rounded-r-lg focus:outline-none transform uppercase transition-colors duration-200"
            onClick={handleSubmit}
          >
            {keep.submitLoading ? (
              <Loader small />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        </Tooltip>
      </div>
      {keep.loading ? (
        <Loader />
      ) : (
        <div
          tw="flex flex-col justify-start m-4 p-4 divide-gray-500 divide-opacity-20 divide-y overflow-y-scroll space-y-4"
          css="height: calc(100vh - 450px);max-height:550px;"
        >
          {keep.notes.length > 0 ? (
            keep.notes
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((note) => (
                <KeepNote
                  key={note._id}
                  handleDelete={handleDelete}
                  note={note}
                />
              ))
          ) : (
            <div tw="flex flex-col justify-center align-middle h-48 text-center font-thin space-y-4">
              {keep.loginRequired ? (
                <div tw="flex flex-col justify-center align-middle h-48 text-center font-thin space-y-4">
                  <p>Login to view notes</p>
                  <RequireLogin />
                </div>
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default GKeep
