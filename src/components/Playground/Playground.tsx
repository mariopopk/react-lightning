import React from "react";
import { FocusScope } from "react-aria";
import styles from "./Playground.css";

interface PlaygroundProps {}

export default function Playground({}: PlaygroundProps) {
  let [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {/* {isOpen && (
        <FocusScope contain>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </FocusScope>
      )} */}
    </>
  );
}
