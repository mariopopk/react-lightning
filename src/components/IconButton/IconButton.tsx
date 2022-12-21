import React, { ReactNode, useRef } from "react";
import { Variant, Size, Color } from "../../theme/variables";

export interface IconButtonProps {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  color?: Color;
}

export function IconButton({
  children,
  variant = "filled",
  size = "md",
  color = "primary",
  ...rest
}: IconButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button {...rest} ref={ref}>
      {children}
    </button>
  );
}
