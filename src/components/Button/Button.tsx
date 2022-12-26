import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import { useButton, AriaButtonProps, PressHookProps } from "react-aria";
import styles from "./Button.css";
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

function Button(
  {
    children,
    variant = "filled",
    size = "md",
    bgColor = "transparent",
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const domRef = useRef(ref as HTMLButtonElement | null);
  let { buttonProps } = useButton(rest as AriaButtonProps, domRef);

  const classes = cx(styles.btn, {
    [styles[variant]]: variant,
    [styles[bgColor]]: bgColor,
    [styles[size]]: size,
  });

  return (
    <button {...buttonProps} ref={domRef} className={classes}>
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
