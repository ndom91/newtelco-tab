import React from 'react'

import styles from './Footer.module.css'

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className={styles.footer}>
      <span>I'm here to stay (Footer)</span>
    </footer>
  )
}

export default Footer
