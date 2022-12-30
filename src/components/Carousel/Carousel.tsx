import React, { CSSProperties, ReactNode } from "react";
import styles from "./Card.css";
import cx from "classnames";

interface CardProps {
  children?: ReactNode;
  shadow?: boolean;
  imageBackground?: string;
  style?: CSSProperties;
}

export default function Card({
  children,
  shadow = false,
  imageBackground,
  style,
}: CardProps) {
  const classes = cx(styles.card, {
    [styles.shadow]: shadow,
    [styles["image-cover"]]: imageBackground,
  });

  const backgroundImage =
    imageBackground &&
    `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("${imageBackground}")`;

  return (
    <>
      <div className={classes} style={{ ...style, backgroundImage }}>
        {children}
      </div>
    </>
  );
}
