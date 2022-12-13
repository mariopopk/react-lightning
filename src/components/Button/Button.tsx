import React, { ReactNode } from "react";
import styles from "./button.css";
import cx from "classnames";

export interface ButtonProps {
  children?: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className={cx(styles.button, styles.buttonPrimary)}>
      {children}
    </button>
  );
}
