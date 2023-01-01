import React, { useState } from "react";
import { useMove } from "react-aria";

export default function Playground() {
  const CONTAINER_SIZE = 200;
  const BALL_SIZE = 30;

  let [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  let clamp = (pos: number) =>
    Math.min(Math.max(pos, 0), CONTAINER_SIZE - BALL_SIZE);

  let { moveProps } = useMove({
    onMoveStart() {
      console.log("moveStart");
    },
    onMove(e) {
      setPosition(({ x, y }) => {
        // Normally, we want to allow the user to continue
        // dragging outside the box such that they need to
        // drag back over the ball again before it moves.
        // This is handled below by clamping during render.
        // If using the keyboard, however, we need to clamp
        // here so that dragging outside the container and
        // then using the arrow keys works as expected.
        if (e.pointerType === "keyboard") {
          x = clamp(x);
          y = clamp(y);
        }

        x += e.deltaX;
        y += e.deltaY;
        return { x, y };
      });

      console.log(
        `move with pointerType = ${e.pointerType}, deltaX = ${e.deltaX}, deltaY = ${e.deltaY}`
      );
    },
    onMoveEnd(e) {
      console.log("moveEnd");
    },
  });

  return (
    <>
      <div
        style={{
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
          background: "white",
          border: "1px solid black",
          position: "relative",
          touchAction: "none",
        }}
      >
        <div
          {...moveProps}
          tabIndex={0}
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: "100%",
            position: "absolute",
            left: clamp(position.x),
            background: "black",
          }}
        />
      </div>
    </>
  );
}
