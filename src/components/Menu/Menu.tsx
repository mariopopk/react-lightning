import React, { ReactNode } from "react";
import styles from "./Menu.css";
import { usePress } from "react-aria";
import Backdrop from "../Backdrop";
import cx from "classnames";

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // position will be controlled by popper later
  position?: "left" | "right";
}

// TODO: Improve accessibility
// TODO: Add Popper
export default function Menu({
  isOpen,
  children,
  onClose,
  position = "left",
}: MenuProps) {
  const classes = cx(styles.menu, {
    [styles[position]]: position,
  });

  const { pressProps } = usePress({
    onPress: () => {
      onClose?.();
    },
  });

  return (
    <>
      {isOpen && (
        <>
          <Backdrop data-testid="backdrop" {...pressProps} />
          <div style={{ position: "relative" }}>
            <div className={classes}>{children}</div>
          </div>
        </>
      )}
    </>
  );
}
