import React from "react";
import { render } from "@testing-library/react";
import FormExpand from "./FormExpand";

describe("FormExpand", () => {
  test("renders the FormExpand component", () => {
    const { getByText } = render(
      <FormExpand label="Search" displayLabel="Search" />
    );

    expect(getByText("Search")).toBeInTheDocument();
  });
});
