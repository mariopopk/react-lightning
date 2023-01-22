import React, { ReactNode } from 'react'
import styles from './Paper.css'

interface PaperProps {
  children: ReactNode
}

export default function Paper({ children }: PaperProps) {
  return (
    <>
      <div className={styles.Paper}>{children}</div>
    </>
  )
}
