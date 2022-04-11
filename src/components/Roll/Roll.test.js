import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Roll from "./Roll";
import * as reactRedux from "react-redux";
import * as checkBlock from "./rollUtil";
import * as rollDice from "../../utils/roll";

// jest.mock("../../utils/roll", () => ({ rollDice: () => jest.fn() }));
// jest.mock("./rollUtil", () => ({ checkBlock: () => jest.fn() }));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

describe("render Roll component", () => {
  const useDispatchMock = reactRedux.useDispatch;
  test("it render with rollEnabled", () => {
    useDispatchMock.mockImplementation(() => jest.fn())
    const { container } = render(<Roll turn="blue" rollEnabled="true" />);
    const rollElement = screen.getByText(/ROLL/i);
    const rollElementClass = container.getElementsByClassName(
      "roll rollEnabled blueRoll"
    );
    expect(rollElement).toBeInTheDocument();
    expect(rollElementClass.length).toBe(1);
  });

  test("when click rollHander is called", () => {
    useDispatchMock.mockImplementation(() => jest.fn());
    const rollDiceMock = jest.spyOn(rollDice, "rollDice");
    const checkBlockMock = jest.spyOn(checkBlock, "checkBlock");
    checkBlockMock.mockImplementation(() => ({ blocked: 0, blockedPieces: 0 }));
    rollDiceMock.mockImplementation(jest.fn());
    render(<Roll turn="blue" rollEnabled="true" />);
    const rollElement = screen.getByText(/ROLL/i);
    expect(rollDiceMock).toHaveBeenCalledTimes(0);
    expect(checkBlockMock).toHaveBeenCalledTimes(0);
    userEvent.click(rollElement);
    expect(rollDiceMock).toHaveBeenCalledTimes(1);
    expect(checkBlockMock).toHaveBeenCalledTimes(1);
  })
});
