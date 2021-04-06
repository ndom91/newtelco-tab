import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import UserCard from '@/components/UserCard'
import Loader from '@/components/Loader'
import RequireLogin from '@/components/RequireLogin'

const Gdirectory: React.FC = () => {
  const [session] = useSession()
  const [people, setPeople] = useState({
    data: [],
    loading: false,
    loginRequired: false,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        setPeople({ ...people, loading: false, loginRequired: true })
        return true
      }

      setPeople({ ...people, loading: true, loginRequired: false })
      try {
        const response = await fetch('/api/directory')

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }

        const data = await response.json()
        const filteredPeople = data.people
          .reduce((acc, person) => {
            if (person?.phoneNumbers) {
              acc.push({
                name: person.names[0].displayName,
                phones: person.phoneNumbers?.map((phone) => phone.canonicalForm) ?? [],
                email: person.emailAddresses?.[0].value,
                position: person.organizations?.[0].title,
                department: person.organizations?.[0].department,
                img: person.photos?.[0].url,
              })
            }
            return acc
          }, [])
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1
            }
            return -1
          })

        setPeople({ ...people, data: filteredPeople, loading: false, loginRequired: false })
      } catch (e) {
        setPeople({ ...people, loading: false, loginRequired: true, error: e.message })
      }
    }

    void fetchData()
    // setPeople({ ...people, loading: true })
    // fetch('/api/directory')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       setPeople({ ...people, loading: false, loginRequired: true })
    //       return
    //     }
    //     const filteredPeople = data.people
    //       .reduce((acc, person) => {
    //         if (person?.phoneNumbers) {
    //           acc.push({
    //             name: person.names[0].displayName,
    //             phones: person.phoneNumbers?.map((phone) => phone.canonicalForm) ?? [],
    //             email: person.emailAddresses?.[0].value,
    //             position: person.organizations?.[0].title,
    //             department: person.organizations?.[0].department,
    //             img: person.photos?.[0].url,
    //           })
    //         }
    //         return acc
    //       }, [])
    //       .sort((a, b) => {
    //         if (a.name > b.name) {
    //           return 1
    //         }
    //         return -1
    //       })
    //     setPeople({ ...people, data: filteredPeople, loading: false })
    //   })
    //   .catch((err) => console.error(err))
  }, [session])

  return (
    <div tw="shadow-lg rounded-xl p-4 bg-gray-900 relative overflow-hidden w-full" css="max-height: 650px">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span tw="leading-9 ml-2">Contact Info</span>
        </div>
      </div>
      {people.loading ? (
        <Loader />
      ) : (
        <div tw="flex flex-col justify-between p-4 m-4 overflow-y-scroll space-y-4" css="max-height: 550px">
          {people.data.length > 0 ? (
            people.data.map((person) => <UserCard key={person.id} person={person} />)
          ) : (
            <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
              {people.loginRequired ? (
                <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
                  <p>Login to view contact directory</p>
                  <RequireLogin />
                </div>
              ) : (
                <p>No colleagues found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Gdirectory
