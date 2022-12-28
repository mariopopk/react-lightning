import React, { ReactNode } from "react";
import styles from "./Jumbotron.css";
import cx from "classnames";

interface JumbotronProps {
  children: ReactNode;
  verticalAlignment?: "top" | "middle" | "bottom";
  horizontalAlignment?: "left" | "center" | "right";
  innerWidth?: string;
}

export default function Jumbotron({
  children,
  verticalAlignment = "top",
  horizontalAlignment = "left",
  innerWidth = "45%",
}: JumbotronProps) {
  const containerClasses = cx(styles["jumbotron-container"], {
    [styles[verticalAlignment]]: verticalAlignment,
    [styles[horizontalAlignment]]: horizontalAlignment,
  });

  return (
    <div className={containerClasses}>
      <div
        className={styles["jumbotron-content"]}
        style={{ width: innerWidth }}
      >
        {children}
      </div>
    </div>
  );
}
