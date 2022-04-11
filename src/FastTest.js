import React from "react";
import { useDispatch } from "react-redux";
import { ludoAction } from "./store";

function FastTest() {
  const dispatch = useDispatch();

  const fastTestHandler = () => {
    dispatch(ludoAction.fastTest());
  };

  const fastWinHandler = () => {
    dispatch(ludoAction.fastWinTest());
  };

  return (
    <>
      <button onClick={fastTestHandler}>FastTest</button>
      <button onClick={fastWinHandler}>FastWin</button>
    </>
  );
}

export default FastTest;
