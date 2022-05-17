import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './PlayerHome.module.css'
import { moveToBoard } from '../../store/actions'

function PlayerHome () {
  const positions = useSelector((state) => state.positions)
  const players = useSelector((state) => state.players)
  const diceN = useSelector((state) => state.dice)
  const rollStateDisable = useSelector((state) => state.rollStateDisable)
  const turnColor = useSelector((state) => state.turnColor)

  const dispatch = useDispatch()

  function moveToBoardHandler (color, pieceNum) {
    dispatch(moveToBoard(color, pieceNum))
    // dispatch(ludoAction.moveToBoard({ color: color, pieceNum: pieceNum }));
    // dispatch(ludoAction.diceWhereLocation(""));
  }

  const display = []
  players.forEach((color) => {
    const disableLogic =
      color !== turnColor || !rollStateDisable || diceN !== 6
    for (const [key, value] of Object.entries(positions[color])) {
      if (value === 0) {
        display.push(
          <div
            key={
              styles[color] +
              ' ' +
              styles[color + 'Start_' + [key]] +
              ' ' +
              styles.pieceForm
            }
            className={
              styles[color] +
              ' ' +
              styles[color + 'Start_' + [key]] +
              ' ' +
              styles.pieceForm +
              (disableLogic ? ' disabled' : '')
            }
            // + (disableLogic ? " disabled" : "")
            onClick={() => moveToBoardHandler(color, key)}
          ></div>
        )
      }
    }
  })

  return <div>{display}</div>
}

export default PlayerHome
