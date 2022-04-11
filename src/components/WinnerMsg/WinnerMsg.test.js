//show one button to continue game and the other to reset game
//clicking the button will trigger the apropiate function

import { render, screen } from "@testing-library/react";
import WinnerMsg from "./WinnerMsg";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
})
);

describe("test WinnerMsg", () => {
  test("show msg when it trigger", () => {
    const { container } = render(<WinnerMsg color="red" show= { true } />);
    const msgBoard = screen.getByText("Player");
    expect(container.getElementsByClassName("red").length).toBe(1);
    expect(msgBoard).toBeInTheDocument();
  });
  test("show the color of the specific prop passed on", () => {
    const { container, rerender } = render(<WinnerMsg color="red" show= { true } />);
    expect(container.getElementsByClassName("red").length).toBe(1);
    expect(container.getElementsByClassName("yellow").length).toBe(0);
    rerender(<WinnerMsg color="yellow" show= { true } />);
    expect(container.getElementsByClassName("red").length).toBe(0);
    expect(container.getElementsByClassName("yellow").length).toBe(1);
  });
  test("does not show msg when not trigger", () => {
    render(<WinnerMsg color="red" show= { false } />);
    const msgBoard = screen.queryByText("Player");
    expect(msgBoard).not.toBeInTheDocument();
  });
});
