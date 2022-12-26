import React, { ReactNode } from "react";
import styles from "./MenuItem.css";

interface MenuItemProps {
  children: ReactNode;
}

export default function MenuItem({ children }: MenuItemProps) {
  return <div className={styles.menuItem}>{children}</div>;
}
