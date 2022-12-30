import React from "react";
import { render } from "@testing-library/react";

import Carousel from "./Carousel";

describe("Carousel", () => {
  it("renders successfully", () => {
    render(<Carousel />);
  });
});
