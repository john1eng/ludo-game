import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { rollDice } from "./components/roll";
import { useSelector, useDispatch } from "react-redux";
import { ludoAction } from "./store";
import Dice from "./components/Dice/Dice";
import MoveButton from "./components/MoveButton";
import StartBoard from "./components/StartBoard/StartBoard";
import PlayerHome from "./components/Board/PlayerHome";
import WinnerMsg from "./components/WinnerMsg/WinnerMsg";
import HomeBoard from "./components/Board/Board";
import Roll from "./components/Roll/Roll";

const wordForm = { 1: "one", 2: "two", 3: "three", 4: "four" };

const refNum = {
  blue: {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  },
  red: {
    one: 5,
    two: 6,
    three: 7,
    four: 8,
  },
};

const initialPieces = {
  blue: {
    start: 4,
    board: 0,
    home: 0,
  },
  red: {
    start: 4,
    board: 0,
    home: 0,
  },
};

const initialPositions = {
  blue: {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  },
  red: {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  },
};

const homeB = {
  blue: new Array(10).fill(0).map((v, i) => i + 1),
  red: new Array(10).fill(0).map((v, i) => i + 1),
};

const rules = {
  blue: { start: 1, end: 51 }, //1 and 51
  red: { start: 40, end: 38 },
  yellow: { start: 14, end: 12 },
  green: { start: 27, end: 25 },
};

function App() {
  const refPiece = useRef([]);
  const refPiece1 = useRef([]);
  const dispatch = useDispatch();

  const positionR = useSelector((state) => state.positions);
  const dice = useSelector((state) => state.dice);
  const boardR = useSelector((state) => state.board);
  const homeBoardR = useSelector((state) => state.homeBoard);
  const turn = useSelector((state) => state.turnColor);
  const home = useSelector((state) => state.pieces[turn]["home"]);
  const rollEnabled = useSelector((state) => state.rollEnabled);
  const players = useSelector((state) => state.players);

  // useEffect(() => {
  //   if (home === 4) alert(turn + " wins");
  // }, [home, turn]);

  return (
    <div className="App">
      {home === 4 && <WinnerMsg color={turn} />}
      <div className="ludo_board">
        <HomeBoard color="" board={boardR} />
        <HomeBoard color="blue" board={homeBoardR.blue} />
        <HomeBoard color="red" board={homeBoardR.red} />
        <HomeBoard color="yellow" board={homeBoardR.yellow} />
        <PlayerHome />
        <Roll turn={turn} rollEnabled={rollEnabled} position={positionR} />
        <Dice dice={dice} color={turn} />
        {!players.length ? <StartBoard /> : ""}
      </div>
    </div>
  );
}

export default App;
