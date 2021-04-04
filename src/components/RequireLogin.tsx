import React from 'react'
import Layout from '@/components/Layout'
import { signIn, useSession } from 'next-auth/client'

import styles from './RequireLogin.module.css'

const RequireLogin: React.FC = () => {
  const [session] = useSession()
  return (
    <Layout>
      <div className={styles.loginWrapper}>
        <article className="card">
          {!session && (
            <>
              <p>Please Login</p>
              <div className="flex flex-row-reverse flex-wrap m-auto block">
                <button
                  type="button"
                  className="focus:outline-none text-newtelco-600 text-sm py-2.5 px-5 rounded-md border border-newtelco-600 hover:bg-newtelco-50 flex items-center block"
                  onClick={() => signIn()}
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  Login
                </button>
              </div>
            </>
          )}
        </article>
      </div>
    </Layout>
  )
}

export default RequireLogin
