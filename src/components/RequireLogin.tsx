import React from 'react'
import Layout from '@/components/Layout'
import { signIn, useSession } from 'next-auth/client'

import styles from './RequireLogin.module.css'

const RequireLogin: React.FC = () => {
  const [session] = useSession()
  return (
    <Layout>
      <div className={styles.loginWrapper}>
        <article className="card red-900">
          {!session && (
            <>
              <p>Not signed in</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => signIn()}>
                Sign in
              </button>
            </>
          )}
        </article>
      </div>
    </Layout>
  )
}

export default RequireLogin
