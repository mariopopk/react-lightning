import React from "react";
import { render } from "@testing-library/react";

import Typography from "./Typography";

describe("Typography", () => {
  it("renders successfully", () => {
    const { getByText } = render(<Typography children="Hello World" />);
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as an H1 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h1" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as an H2 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h2" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as an H3 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h3" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as an H4 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h4" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });
  it("renders successfully as an H5 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h5" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as an H6 component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="h6" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders successfully as a SPAN component", () => {
    const { getByText } = render(
      <Typography children="Hello World" component="span" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
