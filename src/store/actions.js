import { ludoAction } from "./index";

export function moveToBoard (color, pieceNum) {
  console.log("moveToBoard");
  return (dispatch) => {
    dispatch(ludoAction.moveToBoard({ color: color, pieceNum: pieceNum }));
    dispatch(ludoAction.diceWhereLocation(""));
  };
}
