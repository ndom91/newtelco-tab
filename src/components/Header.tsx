import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/client'

const Header: React.FC = (): React.ReactElement => {
  const [session] = useSession()
  return (
    <header>
      <nav>
        <h1>Hello Next.js 👋</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Image src={session.user.image} width={64} height={64} priority alt="User Profile Picture" />
      </nav>
    </header>
  )
}

export default Header
