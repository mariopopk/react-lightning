import React, { ReactNode } from "react";
import styles from "./Button.css";
import cx from "classnames";
import { Variant } from "../../theme/variables";

export interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
}

export function Button({ children, variant = "primary" }: ButtonProps) {
  const classes = cx(
    styles.btn,
    {
      [styles[variant]]: variant,
    }
    // className
  );

  return <button className={classes}>{children}</button>;
}
