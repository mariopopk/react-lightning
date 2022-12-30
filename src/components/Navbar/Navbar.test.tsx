import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

// TODO: Test scroll interaction with different environment as JSDOM does not implement CSS layout features
describe("Navbar", () => {
  it("renders successfully", () => {
    const { getByText } = render(<Navbar children={"Foo"} />);
    expect(getByText("Foo")).toBeInTheDocument();
  });
});
