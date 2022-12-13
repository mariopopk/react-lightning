import React, { ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  children?: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button className="button">{children}</button>;
}
