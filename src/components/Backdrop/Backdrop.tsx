import cx from 'classnames'
import React, { DOMAttributes, ReactNode } from 'react'
import styles from './Backdrop.css'

interface BackdropProps extends DOMAttributes<HTMLDivElement> {
  children?: ReactNode
  invisible?: boolean
  variant?: 'modal' | 'menu'
}

export default function Backdrop({
  children,
  variant = 'menu',
  invisible = true,
  ...rest
}: BackdropProps) {
  const classes = cx(styles.backdrop, {
    [styles[`${variant}`]]: variant,
    [styles.dark]: !invisible,
  })

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
