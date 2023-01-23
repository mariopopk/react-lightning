import cx from 'classnames'
import React, { DOMAttributes, ReactNode } from 'react'
import styles from './Backdrop.css'

interface BackdropProps extends DOMAttributes<HTMLDivElement> {
  children?: ReactNode
  invisible?: boolean
  className: string
  variant?: 'modal' | 'menu'
}

export default function Backdrop({
  children,
  variant = 'menu',
  invisible = true,
  className,
  ...rest
}: BackdropProps) {
  const classes = cx(styles.backdrop, className, {
    [styles[`${variant}`]]: variant,
    [styles.dark]: !invisible,
  })

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
