import React from "react";
import { render } from "@testing-library/react";

import Logo from "./Logo";

describe("Jumbotron", () => {
  it("renders successfully", () => {
    const { getByAltText } = render(<Logo type="full" />);
    expect(getByAltText("")).toBeInTheDocument();
  });
});
