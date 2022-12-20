import React, { ReactNode, useRef } from "react";
import styles from "./Button.css";
// import cx from "classnames";

export interface ButtonProps {
  children?: ReactNode;
  variant?: any;
  size?: any;
  color?: any;
}

export default function Button({
  children,
  variant = "filled",
  size = "md",
  color = "primary",
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  // const classes = cx(styles.btn, {
  //   [styles[variant]]: variant,
  //   [styles[color]]: color,
  //   [styles[size]]: size,
  // });

  console.log(styles);

  return (
    <button {...rest} ref={ref}>
      {children}
    </button>
  );
}
