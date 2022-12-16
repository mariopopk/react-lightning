import React, { ReactNode } from "react";
import styles from "./Button.css";
import cx from "classnames";

export interface ButtonProps {
  children?: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className={cx(styles.btn, styles.btnPrimary)}>{children}</button>
  );
}
