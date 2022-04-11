import * as reactRedux from "react-redux";
import StartBoard from "./StartBoard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ludoAction } from "../../store";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("test StartBoard", () => {
  const useDispatchMock = reactRedux.useDispatch;

  test("test all the colors section and start are in place", () => {
    const { container } = render(<StartBoard />);
    const greenElementClass = container.getElementsByClassName("green");
    const blueElementClass = container.getElementsByClassName("blue");
    const yellowElementClass = container.getElementsByClassName("yellow");
    const redElementClass = container.getElementsByClassName("red");
    const startElementClass = container.getElementsByClassName("start");
    expect(greenElementClass.length).toBe(1);
    expect(blueElementClass.length).toBe(1);
    expect(yellowElementClass.length).toBe(1);
    expect(redElementClass.length).toBe(1);
    expect(startElementClass.length).toBe(1);
  });
  test("test specific ones click will change to transparent", () => {
    const { container } = render(<StartBoard />);
    const greenElementClass =
      container.getElementsByClassName("green transparent");
    const blueElementClass =
      container.getElementsByClassName("blue transparent");
    const yellowElementClass =
      container.getElementsByClassName("yellow transparent");
    const redElementClass = container.getElementsByClassName("red transparent");
    const startElementClass = container.getElementsByClassName("start");
    expect(greenElementClass.length).toBe(0);
    expect(blueElementClass.length).toBe(0);
    expect(yellowElementClass.length).toBe(0);
    expect(redElementClass.length).toBe(0);
    const greenElement = screen.getByText("green");
    const blueElement = screen.getByText("blue");
    const yellowElement = screen.getByText("yellow");
    const redElement = screen.getByText("red");
    expect(greenElement).toBeInTheDocument();
    expect(blueElement).toBeInTheDocument();
    expect(yellowElement).toBeInTheDocument();
    expect(redElement).toBeInTheDocument();
    userEvent.click(greenElement);
    userEvent.click(blueElement);
    userEvent.click(blueElement);
    expect(greenElementClass.length).toBe(1);
    expect(blueElementClass.length).toBe(0);
    expect(yellowElementClass.length).toBe(0);
    expect(redElementClass.length).toBe(0);
  });
  test("test start button will show when two or more is choosen", () => {
    const { container } = render(<StartBoard />);
    const startElementClass = container.getElementsByClassName("button hidden");
    const greenElement = screen.getByText("green");
    const blueElement = screen.getByText("blue");
    const yellowElement = screen.getByText("yellow");
    const redElement = screen.getByText("red");
    const startElement = screen.getByText("Start");
    expect(startElementClass.length).toBe(1);
    userEvent.click(greenElement);
    expect(startElementClass.length).toBe(1);
    userEvent.click(blueElement);
    expect(startElementClass.length).toBe(0);
    userEvent.click(blueElement);
    expect(startElementClass.length).toBe(1);
    userEvent.click(yellowElement);
    expect(startElementClass.length).toBe(0);
    userEvent.click(redElement);
    expect(startElementClass.length).toBe(0);
  });
  test("click start will call setPlayers reducer", () => {
    useDispatchMock.mockImplementation(() => jest.fn());
    const mockSetPlayer = jest
      .spyOn(ludoAction, "setPlayers")
      .mockImplementation(() => jest.fn());
    render(<StartBoard />);
    const yellowElement = screen.getByText("yellow");
    const redElement = screen.getByText("red");
    const startElement = screen.getByText("Start");
    userEvent.click(yellowElement);
    userEvent.click(redElement);
    userEvent.click(startElement);
    expect(mockSetPlayer).toHaveBeenCalled();
    expect(mockSetPlayer.mock.calls[0][0]).toEqual(['yellow', 'red']);
  });
});
