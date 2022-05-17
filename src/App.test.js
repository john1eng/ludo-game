import App from "./App";
import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { WinnerMsg } from "./components/WinnerMsg/WinnerMsg";
import { mocked } from 'ts-jest/utils';

//mock state
//mock components
jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));

jest.mock("./components/Board/Board", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

jest.mock("./components/Board/PlayerHome", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});
jest.mock("./components/Dice/Dice", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});
jest.mock("./components/StartBoard/StartBoard", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});
jest.mock("./components/WinnerMsg/WinnerMsg", () => {
  return (() => <div>hello</div>)
});
jest.mock("./components/Roll/Roll", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});
jest.mock("./components/Layout/Overlay", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});
jest.mock("./FastTest", () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

// const mockedWinnerMsg = mocked(WinnerMsg).mockImplementation(() => <div>Hello</div>);

describe("test App component", () => {
  const mockStore = {
    players: ["red", "blue"],
    positions: {
      blue: { one: 0, two: 0, three: 0, four: 0 },
      red: { one: 0, two: 0, three: 0, four: 0 }
    },
    dice: 6,
    rollStateDisable: true,
    turnColor: "blue",
    pieces:{ blue:{ home: 0 }},
    homeBoard: {blue: { pieceNum: "one", color: "blue", component: 1 }}
  };
  
  const useSelectorMock = reactRedux.useSelector;
  
  test("render App component", () => {
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
    const { container } = render(<App />)
    const classElement = container.getElementsByClassName("App");
    expect(classElement.length).toBe(1);
  })
  // test("render WinnerMsg (1), HomeBoard(5), PlayerHome(1), Roll(1), Dice(1)", () => {
  //   useSelectorMock.mockImplementation((selector) => selector(mockStore));  
  //   const { container } = render(<App />)
  //   expect(mockedWinnerMsg).toHaveBeenCalledTimes(1);
  // })
})