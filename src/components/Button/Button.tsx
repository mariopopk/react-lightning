import React, {
  ForwardedRef,
  forwardRef,
  useRef,
  ButtonHTMLAttributes,
} from "react";
import { useButton, AriaButtonProps, PressHookProps } from "react-aria";
import styles from "./Button.css";
import "../../style/Colors.css";
import "../../style/Utilities.css";

import cx from "classnames";
import { Color, FontWeight, Size, Variant } from "../../theme/variables";

export interface BaseButtonProps {
  variant?: Variant;
  size?: Size;
  color?: Color;
  backgroundColor?: Color;
  fontWeight?: FontWeight;
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    PressHookProps {}

function Button(
  {
    children,
    variant = "filled",
    size = "md",
    backgroundColor = "transparent",
    fontWeight = "semibold",
    color = "dark",
    onPress,
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const domRef = useRef(ref as HTMLButtonElement | null);
  const { buttonProps } = useButton(
    { ...rest, onPress } as AriaButtonProps,
    domRef
  );

  const classes = cx(
    styles.btn,
    styles[variant],
    styles[backgroundColor],
    styles[size],
    { [`text-${color}`]: color, [`font-weight-${fontWeight}`]: fontWeight }
  );

  return (
    <button {...rest} {...buttonProps} ref={domRef} className={classes}>
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
