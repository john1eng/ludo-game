/* eslint-disable */
import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dice from "./components/Dice/Dice";
import StartBoard from "./components/StartBoard/StartBoard";
import PlayerHome from "./components/Board/PlayerHome";
import WinnerMsg from "./components/WinnerMsg/WinnerMsg";
import HomeBoard from "./components/Board/Board";
import Roll from "./components/Roll/Roll";
import Overlay from "./components/Layout/Overlay";
import FastTest from "./FastTest";

function App() {
  const positionR = useSelector((state) => state.positions);
  const dice = useSelector((state) => state.dice);
  const boardR = useSelector((state) => state.board);
  const homeBoardR = useSelector((state) => state.homeBoard);
  const turn = useSelector((state) => state.turnColor);
  const home = useSelector((state) => state.pieces[turn].home);
  const rollEnabled = useSelector((state) => state.rollEnabled);
  const players = useSelector((state) => state.players);

  //StartBoard used to cover the starting section
  
  const [show, setShow] = useState(false); //show when theres a winner
  useEffect(() => {
    if (home === 4) setShow(true);
  }, [home]);

  function closeMsg() {
    setShow(!show);
  }
  // if(home===4){
  //   setShow(true)
  // }
  return (
    <div className="App">
      <div className="ludo_board">
        <WinnerMsg color={turn} show={show} closeMsg={closeMsg} />
        <HomeBoard color="" board={boardR} />
        <HomeBoard color="blue" board={homeBoardR.blue} />
        <HomeBoard color="red" board={homeBoardR.red} />
        <HomeBoard color="yellow" board={homeBoardR.yellow} />
        <HomeBoard color="green" board={homeBoardR.green} />
        <PlayerHome />
        <Roll turn={turn} rollEnabled={rollEnabled} position={positionR} />
        <Dice dice={dice} color={turn} />
        {!players.length ? <StartBoard /> : ""}
        {show && <Overlay />}
      </div>
      {/* <FastTest /> */}
    </div>
  );
}

export default App;
