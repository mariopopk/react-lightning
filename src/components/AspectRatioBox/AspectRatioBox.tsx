import React, { ReactNode } from "react";

interface AspectRatioBoxProps {
  children?: ReactNode;
  aspectRatio: {
    w: number;
    h: number;
  };
}

export default function AspectRatioBox({
  children,
  aspectRatio,
}: AspectRatioBoxProps) {
  return (
    <div
      style={{
        paddingTop: `calc(${aspectRatio.h} / ${aspectRatio.w} * 100%)`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
