import React, {
  ForwardedRef,
  forwardRef,
  useRef,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { useButton, AriaButtonProps, PressHookProps } from "react-aria";
import styles from "./Button.css";
import "../../style/Colors.css";
import "../../style/Utilities.css";

import cx from "classnames";
import { Color, FontWeight, Size, ButtonVariant } from "../../theme/variables";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: Size;
  color?: Color;
  backgroundColor?: Color;
  fontWeight?: FontWeight;
  icon?: ReactNode;
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
    icon,
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
    styles[size]
  );

  const innerClasses = cx(styles.inner, {
    [styles.innerWithIcon]: icon,
    [`font-weight-${fontWeight}`]: fontWeight,
    [`text-${color}`]: color,
  });

  return (
    <button {...rest} {...buttonProps} ref={domRef} className={classes}>
      {icon ? icon : null}
      <div className={innerClasses}>{children}</div>
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
