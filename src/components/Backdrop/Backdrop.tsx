import React, { DOMAttributes, ReactNode } from "react";
import styles from "./Backdrop.css";

interface BackdropProps extends DOMAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Backdrop({ children, ...rest }: BackdropProps) {
  return (
    <div {...rest} className={styles.backdrop}>
      {children}
    </div>
  );
}
