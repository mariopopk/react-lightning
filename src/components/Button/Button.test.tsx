import React from "react";
import { render } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders successfully", () => {
    const { getByText } = render(<Button children="Hello world!" />);
    expect(getByText("Hello world!")).toBeInTheDocument();
  });
});
