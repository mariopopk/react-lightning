import React, { ReactNode } from "react";
import styles from "./Container.css";
import cx from "classnames";

interface ContainerProps {
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  children?: ReactNode;
}

export default function Container({
  breakpoint = "xs",
  children,
}: ContainerProps) {
  const classes = cx({
    [styles[breakpoint]]: breakpoint,
  });

  return (
    <div
      className={classes}
      style={{
        border: "1px solid red",
      }}
    >
      {children}
    </div>
  );
}
