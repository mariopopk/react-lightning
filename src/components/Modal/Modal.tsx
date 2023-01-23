import React, { ReactNode, useEffect } from 'react'
import styles from './Modal.css'
import { usePress } from 'react-aria'
import Backdrop from '../Backdrop'
import cx from 'classnames'
import Paper from '../Paper'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const { pressProps } = usePress({
    onPress: (event) => {
      onClose?.()
    },
  })

  return (
    <>
      {isOpen && (
        <>
          <Backdrop
            className={styles.fadeIn}
            variant="modal"
            invisible={false}
            data-testid="backdrop"
            {...pressProps}
          />

          <div className={styles.Modal}>
            <Paper>{children}</Paper>
          </div>
        </>
      )}
    </>
  )
}
