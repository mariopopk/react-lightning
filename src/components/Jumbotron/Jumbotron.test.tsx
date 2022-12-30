import React from "react";
import { render } from "@testing-library/react";

import Jumbotron from "./Jumbotron";

describe("Jumbotron", () => {
  it("renders successfully", () => {
    const { getByText } = render(
      <Jumbotron
        horizontalAlignment="right"
        verticalAlignment="middle"
        children="Hello World!"
      />
    );
    expect(getByText("Hello World!")).toBeInTheDocument();
  });
});
