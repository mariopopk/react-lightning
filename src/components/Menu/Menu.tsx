import React, { ReactNode } from "react";
import styles from "./Menu.css";
import { usePress } from "react-aria";
import Backdrop from "../Backdrop";

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// TODO: Improve accessibility
export default function Menu({ isOpen, children, onClose }: MenuProps) {
  const { pressProps } = usePress({
    onPress: () => {
      onClose?.();
    },
  });

  return (
    <>
      {isOpen && (
        <>
          <Backdrop {...pressProps} />
          <div className={styles.menu}>{children}</div>
        </>
      )}
    </>
  );
}
