import React from "react";
import { render } from "@testing-library/react";
import Backdrop from "./Backdrop";

describe("<Backdrop/>", () => {
  it("renders succesfully", () => {
    const { getByText } = render(<Backdrop>Children</Backdrop>);
    expect(getByText("Children")).toBeInTheDocument();
  });
});
