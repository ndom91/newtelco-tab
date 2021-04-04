import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/client'

import styles from './Header.module.css'

const Header: React.FC = (): React.ReactElement => {
  const [session] = useSession()
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Image className={styles.userpic} src={session.user.image} width={48} height={48} priority alt="User Profile Picture" />
      </nav>
    </header>
  )
}

export default Header
