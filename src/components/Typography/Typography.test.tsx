import React from "react";
import { render } from "@testing-library/react";

import Typography from "./Typography";

describe("Typography", () => {
  it("renders successfully", () => {
    const { getByText } = render(<Typography children="Hello World!" />);
    expect(getByText("Hello World!")).toBeInTheDocument();
  });
});
