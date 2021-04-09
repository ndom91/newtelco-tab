import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tippy'
import { motion } from 'framer-motion'
import { gql } from 'graphql-request'
import { useSession } from 'next-auth/client'
import RequireLogin from '@/components/RequireLogin'
import Loader from '@/components/Loader'
import KeepNote from '@/components/KeepNote'
import { graphQLClient } from '../utils/graphql-client'

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

const Gkeep: React.FC = () => {
  const [session] = useSession()
  const [keep, setKeep] = useState({
    notes: [],
    currentNote: '',
    loading: false,
    loginRequired: false,
    error: '',
  })

  if (!session) {
    setKeep({ ...keep, loading: false, loginRequired: true })
    return (
      <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
        <p>Login to view notes</p>
        <RequireLogin />
      </div>
    )
  }

  const username = session.user.email.split('@')[0]

  useEffect(() => {
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
    const query = gql`
      mutation CreateNote($body: String!, $username: String!, $datetime: Time!) {
        createNote(data: { body: $body, createdBy: $username, createdAt: $datetime }) {
          body
          createdBy
          createdAt
        }
      }
    `

    try {
      await graphQLClient.request(query, {
        body: keep.currentNote,
        username: username,
        datetime: new Date().toISOString(),
      })
      setKeep({
        ...keep,
        notes: [
          {
            body: keep.currentNote,
            username: username,
            createdAt: new Date().toISOString(),
          },
          ...keep.notes,
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <motion.div
      tw="shadow-lg rounded-xl p-4 bg-gray-900 relative overflow-hidden w-full"
      css="height: auto;max-height: 650px"
      variants={item}
    >
      <div tw="w-full flex items-center justify-between mb-4 p-4">
        <div tw="text-white text-xl font-normal flex align-middle justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          <span tw="leading-9 ml-2">Personal Notes</span>
        </div>
      </div>
      <div tw="mx-8 flex relative focus-within:(ring-4 ring-newtelco-500 ring-opacity-20) transition-shadow ease-in-out duration-500 rounded-lg">
        <textarea
          id="note"
          onChange={(input) => handleInput(input)}
          tw=" rounded-l-lg flex-1 appearance-none border border-gray-800 w-full py-2 px-4 bg-gray-800 text-gray-200 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:border-transparent h-20 font-thin"
          name="note"
          placeholder="Note"
        />
        <Tooltip title="Save" position="top" arrow interactiveBorder={20} delay={250} distance={20} theme="transparent">
          <button
            tw="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none rounded-r-lg h-full"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </Tooltip>
      </div>
      {keep.loading ? (
        <Loader />
      ) : (
        <div
          tw="flex flex-col justify-start p-4 m-4 overflow-y-scroll space-y-4 divide-y divide-gray-500 divide-opacity-20"
          css="height: calc(100vh - 450px);max-height:550px;"
        >
          {/* {data?.findNoteByUser?.data.length > 0 ? (
            data.findNoteByUser.data */}
          {keep.notes.length > 0 ? (
            keep.notes
              .sort((a, b) => {
                if (a.createdAt > b.createdAt) {
                  return -1
                }
                return 1
              })
              .map((note) => <KeepNote key={note.id} handleDelete={handleDelete} note={note} />)
          ) : (
            <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
              {keep.loginRequired ? (
                <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
                  <p>Login to view notes</p>
                  <RequireLogin />
                </div>
              ) : (
                <p>No notes found</p>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default Gkeep
