import React from "react";
import { render } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  it("renders successfully", () => {
    const { getByText } = render(<Card children="Hello World!" />);

    expect(getByText("Hello World!")).toBeInTheDocument();
  });
});
