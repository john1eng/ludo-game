import MyDrawer from "./MyDrawer";
import { MockWinner } from "./MockWinner";
import { render, screen } from "@testing-library/react";
import React from "react";
import { mocked } from "ts-jest/utils";

jest.mock("./MyDrawer", () => () => {
  const MockName = "helllo";
  return <MockName />;
});

describe("test MockWinner", () => {
  // beforeEach(() => {
  //   mockMyDrawer.mockClear();
  // });

  test("render WinnerMsg", () => {
    // let mockMyDrawer = MyDrawer.MyDrawer;
    // mockMyDrawer.mockImplementation(() => <div>hello</div>)
    render(<MockWinner />);
    console.debug(screen.debug());
    // expect(mocked(MyDrawer)).toHaveBeenCalled();
  });
});
