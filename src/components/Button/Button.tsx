import React, { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = ({ children }) => {
  return <button>{children} imported from ENTRATA</button>;
};

export default Button;
