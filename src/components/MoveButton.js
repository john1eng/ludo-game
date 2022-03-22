import React from "react";
import { useDispatch } from "react-redux";
import { ludoAction } from "../store";
import { useSelector } from "react-redux";

const abrRule = { blue: "B", red: "R", green: "G", yellow: "Y" };
const pieceNumRule = {one: 1, two: 2, three: 3, four: 4};

const MoveButton = React.forwardRef((props, ref) => {
  const {color, pieceNum} = {...props.properties}
  
  const abr = abrRule[color];
  const diceN = useSelector((state) => state.dice);
  const turnColor = useSelector((state) => state.turnColor);
  const rollState = useSelector((state) => state.rollState);
  const pieceHome = useSelector((state)=> state.pieces[color].home)
  const enable = useSelector((state) => state.enable[color][pieceNum]);
  const reducePieceSize = useSelector((state) => state.reduce[color][pieceNum]);
  const dispatch = useDispatch();
  function movePlayerHandler() {
    dispatch(ludoAction.movePlayer(props.properties));
    dispatch(ludoAction.turnChange());
    dispatch(ludoAction.diceWhereLocation(""))
  }

  const disableLogic = (color !== turnColor || !rollState  || !enable);

  return (
    <div
      className={color + " pieceForm" + (disableLogic ? " disabled" : "") + (reducePieceSize ? " reduce" : "")}
      onClick={movePlayerHandler}
    >
      {/* {abr}
      {pieceNumRule[pieceNum]} */}
    </div>
  );
});

export default MoveButton;
