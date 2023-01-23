import React from 'react'
import styles from './Spinner.css'

interface SpinnerProps {}

export default function Spinner({}: SpinnerProps) {
  return (
    <>
      <span className={styles.Spinner}></span>
    </>
  )
}
