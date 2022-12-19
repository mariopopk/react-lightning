import React, { ReactNode } from "react";
import styles from "./Button.css";
import cx from "classnames";
import { Variant, Size, Color } from "../../theme/variables";

export interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  color?: Color;
}

export function Button({
  children,
  variant = "filled",
  size = "md",
  color = "primary",
  ...rest
}: ButtonProps) {
  const classes = cx(styles.btn, {
    [styles[variant]]: variant,
    [styles[color]]: color,
    [styles[size]]: size,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
