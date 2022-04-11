import React from 'react';
import { ludoAction } from '../../store';
import { useDispatch } from 'react-redux';
import { rollDice } from '../../utils/roll';
import { checkBlock } from './rollUtil';

function Roll (props) {
  const { turn, rollEnabled, position } = { ...props };

  const dispatch = useDispatch();

  /** once roll is clicked, this will be trigger:
    1. get new dice number
    2. roll is disable
    3. set the dice location
    4. check to see if there are any block
  **/
  const rollHandler = () => {
    const newDice = rollDice();
    dispatch(ludoAction.rollDice(newDice));
    dispatch(ludoAction.rollDisable());
    dispatch(ludoAction.diceWhereLocation(turn));
    const { blocked, blockedPieces } = checkBlock(newDice, turn, position);
    console.log({ blocked, blockedPieces });
    dispatch(ludoAction.resetDisablePieces(turn));
    dispatch(ludoAction.disablePieces(blockedPieces));
    dispatch(ludoAction.playerChoices(blocked));
  };

  return (
    <button
    className={
      'roll ' + turn + 'Roll' + (rollEnabled ? ' rollEnabled' : '')
    }
    onClick={rollHandler}
  >
    ROLL
  </button>
  );
}

export default Roll;
