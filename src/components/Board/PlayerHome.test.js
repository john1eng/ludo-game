// test disable
// test color
// test number of pieces
// test positions

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import PlayerHome from "./PlayerHome";
// import { render} from '../../utils/test-utils'
import { moveToBoard } from '../../store/actions';

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock("../../store/actions");

// }))
describe("test PlayerHome", () => {
  const useSelectorMock = reactRedux.useSelector;
  const useDispatchMock = reactRedux.useDispatch;

  // useSelectorMock.mockImplementation(selector => selector(mockStore));

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  test("went roll 6, blue (turnColor) pieces is enable, while the rest is disable", () => {
    const mockStore = {
      players: ["red", "blue"],
      positions: {
        blue: { one: 0, two: 0, three: 0, four: 0 },
        red: { one: 0, two: 0, three: 0, four: 0 }
      },
      dice: 6,
      rollStateDisable: true,
      turnColor: "blue"
    };
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
    const { container } = render(<PlayerHome />);
    expect(container.getElementsByClassName("blue").length).toBe(4);
    expect(container.getElementsByClassName("red disabled").length).toBe(4);
    expect(container.getElementsByClassName("blue disabled").length).toBe(0);
  });

  test("only when pieces position is 0 is showed", () => {
    const mockStore = {
      players: ["red", "blue"],
      positions: {
        blue: { one: 0, two: 0, three: 1, four: 1 },
        red: { one: 0, two: 4, three: 4, four: 4 }
      },
      dice: 6,
      rollStateDisable: true,
      turnColor: "blue"
    };
    useSelectorMock.mockImplementation(selector => selector(mockStore));
    const { container } = render(<PlayerHome />);
    expect(container.getElementsByClassName('blue').length).toBe(2);
    expect(container.getElementsByClassName('red').length).toBe(1);
  });

  test("disabled when dice is not 6", () => {
    const mockStore = {
      players: ["red", "blue"],
      positions: {
        blue: { one: 0, two: 0, three: 0, four: 0 },
        red: { one: 0, two: 0, three: 0, four: 0 }
      },
      dice: 4,
      rollStateDisable: true,
      turnColor: "blue"
    };
    useSelectorMock.mockImplementation(selector => selector(mockStore));
    const { container } = render(<PlayerHome />);
    expect(container.getElementsByClassName('blue disabled').length).toBe(4);
    expect(container.getElementsByClassName('red disabled').length).toBe(4);
  });

  test("when rollStateDisable is true, all is disabled", () => {
    const mockStore = {
      players: ["red", "blue"],
      positions: {
        blue: { one: 0, two: 0, three: 0, four: 0 },
        red: { one: 0, two: 0, three: 0, four: 0 }
      },
      dice: 6,
      rollStateDisable: false,
      turnColor: "blue"
    };
    useSelectorMock.mockImplementation(selector => selector(mockStore));
    const { container } = render(<PlayerHome />);
    expect(container.getElementsByClassName('blue disabled').length).toBe(4);
    expect(container.getElementsByClassName('red disabled').length).toBe(4);
  });

  test("when button is click, moveToBoard action is called", () => {
    useDispatchMock.mockImplementation(() => jest.fn());
    const mockStore = {
      players: ["red", "blue"],
      positions: {
        blue: { one: 0, two: 0, three: 0, four: 0 },
        red: { one: 0, two: 0, three: 0, four: 0 }
      },
      dice: 6,
      rollStateDisable: true,
      turnColor: "blue"
    };
    useSelectorMock.mockImplementation(selector => selector(mockStore));
    const { container } = render(<PlayerHome />);

    const buttonElement = container.getElementsByClassName('blue')[0];
    userEvent.click(buttonElement);
    expect(moveToBoard.mock.calls.length).toBe(1);
  });
});
