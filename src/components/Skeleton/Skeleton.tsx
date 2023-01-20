import React, { CSSProperties } from "react";
import styles from "./Skeleton.css";

interface BaseSkeletonProps {
  style?: CSSProperties;
}

interface SkeletonProps extends BaseSkeletonProps {
  variant?: "text" | "rectangular" | "rounded";
}

export default function Skeleton({
  variant = "rectangular",
  ...rest
}: SkeletonProps) {
  return (
    <>
      {variant === "rectangular" && <BlockSkeleton {...rest} />}
      {variant === "rounded" && <BlockSkeleton {...rest} />}
      {variant === "text" && <TextSkeleton {...rest} />}
    </>
  );
}

function TextSkeleton({ ...rest }: BaseSkeletonProps) {
  return <span className={styles.Skeleton} {...rest}></span>;
}

function BlockSkeleton({ ...rest }: BaseSkeletonProps) {
  return <div className={styles.Skeleton} {...rest}></div>;
}
