import cx from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Stack.css'

interface StackProps {
  children: ReactNode
  spacing?: number
}

export default function Stack({ children, spacing = 0 }: StackProps) {
  const classes = cx(styles.Stack, {
    [styles[`spacing-${spacing}`]]: spacing,
  })

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  )
}
