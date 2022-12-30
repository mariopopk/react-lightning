import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./Menu";
import userEvent from "@testing-library/user-event";
import MenuItem from "../MenuItem";

const mockOnClose = jest.fn();

describe("<Menu/>", () => {
  it("renders succesfully", () => {
    const { queryByText } = render(
      <Menu isOpen={true} onClose={mockOnClose}>
        <MenuItem>
          <a href="/">Home</a>
        </MenuItem>
      </Menu>
    );

    expect(queryByText("Home")).toBeInTheDocument();
  });

  it("does not render children items when 'isOpen' prop is set to false", () => {
    const { queryByText } = render(
      <Menu isOpen={false} onClose={mockOnClose}>
        <MenuItem>
          <a href="/">Home</a>
        </MenuItem>
      </Menu>
    );

    expect(queryByText("Home")).toBeNull();
  });

  it("it runs onClose function when backdrop is clicked", async () => {
    const user = userEvent.setup();

    const { queryByText, getByTestId } = render(
      <Menu isOpen={true} onClose={mockOnClose}>
        <MenuItem>
          <a href="/">Home</a>
        </MenuItem>
      </Menu>
    );

    expect(queryByText("Home")).toBeInTheDocument();
    expect(getByTestId("backdrop")).toBeInTheDocument();
    await user.click(screen.getByTestId("backdrop"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
