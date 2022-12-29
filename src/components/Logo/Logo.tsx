import React from "react";
import styles from "./Logo.css";
import cx from "classnames";

interface LogoProps {
  type: "full" | "square";
}

export default function Logo({ type }: LogoProps) {
  const classNames = cx(styles.logo);

  return (
    <>
      {type === "square" ? (
        <img
          alt=""
          className={classNames}
          src="https://images.ctfassets.net/5hn1f663deh9/6pwsInFLqcBKTRBH6a2Kxi/06759f4d09317e2e5d84c0007fb52aaf/netflix-1-logo-svgrepo-com.svg.png"
        />
      ) : (
        <img
          alt=""
          className={classNames}
          src="https://images.ctfassets.net/5hn1f663deh9/RUH9IwHOPRtf78AAT7k5S/0df2bf4cc3ee89e16fea708836c8dfdc/Netflix_2015_logo.svg"
        />
      )}
    </>
  );
}
