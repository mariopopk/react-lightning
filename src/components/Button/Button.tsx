import React, { ReactNode, useRef } from "react";
import { useButton, AriaButtonProps, PressHookProps } from "react-aria";
import styles from "./Button.scss";
import cx from "classnames";
import { Color, Size, Variant } from "../../theme/variables";

export interface BaseButtonProps {
  variant?: Variant;
  size?: Size;
  bgColor?: Color;
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PressHookProps,
    BaseButtonProps {
  children?: ReactNode;
}

export default function Button({
  children,
  variant = "filled",
  size = "md",
  bgColor = "transparent",
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(rest as AriaButtonProps, ref);

  const classes = cx(styles.btn, {
    [styles[variant]]: variant,
    [styles[bgColor]]: bgColor,
    [styles[size]]: size,
  });

  return (
    <button {...buttonProps} ref={ref} className={classes}>
      {children}
    </button>
  );
}
