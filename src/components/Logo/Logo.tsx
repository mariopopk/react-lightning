import React from "react";
import styles from "./Logo.css";

interface LogoProps {
  type: "full" | "square";
}

export default function Logo({ type }: LogoProps) {
  return (
    <>
      {type === "square" ? (
        <img
          className={styles.logo}
          src="https://images.ctfassets.net/5hn1f663deh9/Cc8QUxxPCL7kkFfkoL6Nh/5dfa2296270691bf224adc70553e0ed3/Netflix-Symbol.png"
        />
      ) : (
        <img
          className={styles.logo}
          src="https://images.ctfassets.net/5hn1f663deh9/1KlLFUDGMSmYUvpP9C4GBV/9b4c6c1efc7489c7b38bc77867671fb4/Netflix-Brand-Logo.png"
        />
      )}
    </>
  );
}
