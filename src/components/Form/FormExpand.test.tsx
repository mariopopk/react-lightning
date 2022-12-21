import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormExpand from "./FormExpand";
import userEvent from "@testing-library/user-event";

describe("<FormExpand/>", () => {
  it("renders succesfully", () => {
    const { getByText } = render(
      <FormExpand label="Search" displayLabel="Search" />
    );
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("expands (displays) input field when it receives focus via click or keyboard interaction. Input disappears when blur occurs", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(
      <FormExpand label="Search" displayLabel="Search" />
    );
    expect(getByRole("button")).toBeInTheDocument();
    expect(queryByRole("textbox")).not.toBeInTheDocument();

    // Receives Focus
    await user.click(screen.getByRole("button", { name: /Search/i }));

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(queryByRole("button")).not.toBeInTheDocument();

    // Loses Focus - Blur
    fireEvent.blur(getByRole("textbox"));

    expect(getByRole("button")).toBeInTheDocument();
    expect(queryByRole("textbox")).not.toBeInTheDocument();
  });
});
