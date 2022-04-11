// render board space with out pieces
// render board space with pieces of specific color
// called reducePieceSize function
// called increasePieceSize function
// do the same with a homeboard

import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { ludoAction } from "../../store";
import * as MoveButton from "../MoveButton/MoveButton";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

describe("Render Broad", () => {
  let reducePieceSizeMock, increasePieceSizeMock, mockMoveButton;
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => jest.fn());
    reducePieceSizeMock = jest
      .spyOn(ludoAction, "reducePieceSize")
      .mockImplementation(() => jest.fn());
    increasePieceSizeMock = jest
      .spyOn(ludoAction, "increasePieceSize")
      .mockImplementation(() => jest.fn());
    mockMoveButton = jest
      .spyOn(MoveButton, "default")
      .mockImplementation(() => <div>piece</div>);
    // useDispatchMock.mockClear();
  });
  const useDispatchMock = reactRedux.useDispatch;

  const board = new Array(52).fill(0).map((v, i) => {
    return [{ pieceNum: "", color: "", component: i + 1 }];
  });

  const homeBoard = {
    blue: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    red: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    yellow: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    green: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    })
  };

  test("render board space without peices", () => {
    const prop = { color: "", board };
    const { container } = render(<Board {...prop} />);
    expect(container.getElementsByClassName("Board_1").length).toBe(1);
    expect(container.getElementsByClassName("Board_52").length).toBe(1);
    expect(container.getElementsByClassName("Board_40").length).toBe(1);
    expect(container.getElementsByClassName("Board_70").length).toBe(0);
  });

  test("render 3 blue pieces on the board", () => {
    // let increasePieceSizeMock = jest.spyOn(ludoAction, "increasePieceSize").mockImplementation(()=>jest.fn());
    // let mockMoveButton = jest.spyOn(MoveButton, "default")
    // mockMoveButton.mockImplementation(()=><div>piece</div>)
    const updateBoard = [...board];
    updateBoard[0] = [{ pieceNum: "one", color: "blue", component: 1 }];
    updateBoard[1] = [{ pieceNum: "one", color: "blue", component: 2 }];
    updateBoard[2] = [{ pieceNum: "one", color: "blue", component: 3 }];
    const prop = { color: "", board: [...updateBoard] };
    const { container } = render(<Board {...prop} />);
    expect(increasePieceSizeMock).toHaveBeenCalledTimes(3);
    expect(screen.getAllByText("piece").length).toBe(3);
    // const length = mockMoveButton.mock.calls.length;
    // expect(length).toBe(3);
  });

  test("render 2 pieces in the same board space, which called reduceSize", () => {
    const updateBoard = [...board];
    updateBoard[0] = [
      { pieceNum: "one", color: "blue", component: 1 },
      { pieceNum: "two", color: "blue", component: 1 }
    ];
    const prop = { color: "", board: [...updateBoard] };
    const { container } = render(<Board {...prop} />);
    expect(reducePieceSizeMock).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText("piece").length).toBe(2);
  });

  test("render 3 blue pieces in the same board space, which called reduceSize and 2 red pieces, which called increasePieceSize", () => {
    const updateBoard = [...board];
    updateBoard[0] = [
      { pieceNum: "one", color: "blue", component: 1 },
      { pieceNum: "two", color: "blue", component: 1 }
    ];
    updateBoard[1] = [{ pieceNum: "one", color: "red", component: 2 }];
    updateBoard[2] = [{ pieceNum: "two", color: "red", component: 3 }];
    const prop = { color: "", board: [...updateBoard] };
    const { container } = render(<Board {...prop} />);
    expect(reducePieceSizeMock).toHaveBeenCalledTimes(2);
    expect(increasePieceSizeMock).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText("piece").length).toBe(4);
  });

  test("render 3 blue pieces in homeboard", () => {
    const updateHomeBoard = { ...homeBoard };
    updateHomeBoard.blue[0] = [{ pieceNum: "one", color: "blue", component: 1 }];
    updateHomeBoard.blue[1] = [{ pieceNum: "two", color: "blue", component: 2 }];
    updateHomeBoard.blue[5] = [{ pieceNum: "three", color: "blue", component: 6 }];
    const prop = { color: "blue", board: [...updateHomeBoard.blue] };
    const { container } = render(<Board {...prop} />);
    // console.debug(screen.debug())
    expect(increasePieceSizeMock).toHaveBeenCalledTimes(3);
    expect(screen.getAllByText("piece").length).toBe(3);
  });
});
