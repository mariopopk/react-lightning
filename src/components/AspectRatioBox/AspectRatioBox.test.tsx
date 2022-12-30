import React from "react";
import { render } from "@testing-library/react";
import AspectRatioBox from "./AspectRatioBox";

describe("<AspectRatioBox/>", () => {
  it("renders succesfully", () => {
    const { getByText } = render(
      <AspectRatioBox aspectRatio={{ w: 1, h: 2 }}>Children</AspectRatioBox>
    );
    expect(getByText("Children")).toBeInTheDocument();
  });
});
