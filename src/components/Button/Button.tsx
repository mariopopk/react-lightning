import React, { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}
