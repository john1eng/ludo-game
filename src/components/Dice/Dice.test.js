import { render, screen, prettyDOM, waitFor } from "@testing-library/react";
import * as reactRedux from "react-redux";
import Dice from "./Dice";

describe("Dice component", () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
  });
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

  test("render dice component", () => {
    const { queryByTestId } = render(<Dice dice={4} />);
    expect(queryByTestId("dice")).toBeInTheDocument();
  });

  test("render die 1", async () => {
    useSelectorMock.mockReturnValue("blue");
    const { container, baseElement } = render(<Dice dice={1} />);
    const diceElement = screen.getByText(1);
    expect(diceElement).toBeInTheDocument();
  });

  test("render die 6", async () => {
    useSelectorMock.mockReturnValue("blue");
    const { container, baseElement } = render(<Dice dice={6} />);
    const diceElement = screen.getByText(6);
    expect(diceElement).toBeInTheDocument();
  });

  test("render disable dice", () => {
    useSelectorMock.mockReturnValue("");
    const { container } = render(<Dice dice={1} />);
    expect(container.getElementsByClassName("diceDisable").length).toBe(1);
  });

  test("render red die", () => {
    useSelectorMock.mockReturnValue("red");
    const { container } = render(<Dice dice={1} />);
    expect(container.getElementsByClassName("redDice").length).toBe(1);
  });
});
