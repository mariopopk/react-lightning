import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Navbar.css";
import cx from "classnames";

interface NavbarProps {
  children?: ReactNode;
}

// TODO:  Update Hook to improve performance (throttle)
export default function Navbar({ children }: NavbarProps) {
  const top = 0;
  const [isAtTop, setIsAtTop] = useState(window.scrollY === top);

  const classes = cx(styles.navbar, {
    [styles["navbar-scroll"]]: !isAtTop,
  });

  useEffect(() => {
    const updateScroll = (e: Event) => {
      if (scrollY !== top) {
        if (isAtTop) {
          console.log("Update - false", isAtTop);
          setIsAtTop(false);
        }
      } else {
        console.log("Update - true", isAtTop);
        setIsAtTop(true);
      }
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  });

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
}
