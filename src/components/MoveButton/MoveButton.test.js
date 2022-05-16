import { render, screen } from "@testing-library/react";
import MoveButton from "./MoveButton";
import * as reactRedux from "react-redux";
import userEvent from "@testing-library/user-event";
import { ludoAction } from "../../store/";

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

const mockTurnChange = jest
  .spyOn(ludoAction, "turnChange")
  .mockImplementation(() => jest.fn());
const mockMovePlayer = jest
  .spyOn(ludoAction, "movePlayer")
  .mockImplementation(() => jest.fn());
const mockDiceWhereLocation = jest
  .spyOn(ludoAction, "diceWhereLocation")
  .mockImplementation(() => jest.fn());

describe("test MoveButton", () => {
  const mockUseSelector = reactRedux.useSelector;
  const mockUseDispatch = reactRedux.useDispatch;

  test("render MoveButton", () => {
    const mock = {
      turnColor: "blue",
      rollStateDisable: false,
      enable: { blue: { one: true } },
      reduce: { blue: { one: true } },
    };
    mockUseSelector.mockImplementation((selector) => selector(mock));
    const props = { properties: { color: "blue", pieceNum: "one" } };
    render(<MoveButton {...props} />);
    expect(mockUseSelector).toHaveBeenCalled();
  });
  test("trigger movePlayer function after click", () => {
    // mockUseDispatch.mockImplementation(() => () => jest.fn());
    const mock = {
      turnColor: "blue",
      rollStateDisable: true,
      enable: { blue: { one: true } },
      reduce: { blue: { one: true } },
    };
    mockUseSelector.mockImplementation((selector) => selector(mock));
    const props = { properties: { color: "blue", pieceNum: "one" } };
    const { container } = render(<MoveButton {...props} />);
    expect(mockUseSelector).toHaveBeenCalled();
    console.debug(screen.debug());
    const clickElement = screen.getByText("click");
    userEvent.click(clickElement);
    expect(mockTurnChange).toHaveBeenCalled();
    expect(mockMovePlayer).toHaveBeenCalled();
    expect(mockDiceWhereLocation).toHaveBeenCalled();
  });
});
