import React, { CSSProperties, ReactNode } from "react";
import { Color, FontWeight, TextVariant } from "../../theme/variables";
import styles from "./Typography.css";
import "../../style/Typography.css";
import "../../style/Utilities.css";
import "../../style/Colors.css";

import cx from "classnames";

export interface TypographyProps {
  children: ReactNode;
  variant?: TextVariant;
  component?: TextVariant | "span";
  color?: Color;
  fontWeight?: FontWeight;
  style?: CSSProperties;
}

export default function Typography({
  children,
  component = "base",
  variant = "base",
  color = "dark",
  fontWeight = "normal",
  style,
}: TypographyProps) {
  const classes = cx(styles.text, {
    [`text-${variant}`]: variant,
    [`text-${color}`]: color,
    [`font-weight-${fontWeight}`]: color,
  });

  switch (component) {
    case "h1":
      return (
        <h1 className={classes} style={style}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classes} style={style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classes} style={style}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={classes} style={style}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={classes} style={style}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={classes} style={style}>
          {children}
        </h6>
      );
    case "span":
      return (
        <span className={classes} style={style}>
          {children}
        </span>
      );
    case "base":
    case "inherit":
    case "caption":
    default:
      return (
        <p className={classes} style={style}>
          {children}
        </p>
      );
  }
}
