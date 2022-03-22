import React from 'react'
import { ludoAction } from '../../store'
import { useDispatch } from 'react-redux'
import { rollDice } from '../roll'

const rules = {
  blue: { start: 1, end: 51 }, // 1 and 51
  red: { start: 40, end: 38 },
  yellow: { start: 14, end: 12 },
  green: { start: 27, end: 25 }
}

const wordForm = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' }

function Roll (props) {
  const { turn, rollEnabled, position } = { ...props }

  const dispatch = useDispatch()

  const rollHandler = () => {
    const newDice = rollDice()
    dispatch(ludoAction.rollDice(newDice))
    dispatch(ludoAction.rollDisable())
    dispatch(ludoAction.diceWhereLocation(turn))
    const blocked = checkBlockHandler(newDice)
    dispatch(ludoAction.playerChoices(blocked))
  }

  function checkBlockHandler (dice) {
    // check same position

    const samePosArr = samePos(turn)
    return blocked(samePosArr, turn, dice)

    // check if block
  }
  function samePos (notColor) {
    const color = ['red', 'blue', 'yellow', 'green'].filter(
      (c) => c !== notColor
    )
    const result = []
    for (const index in color) {
      for (let i = 1; i < 4; i++) {
        for (let ii = i + 1; ii < 5; ii++) {
          if (
            position[color[index]][wordForm[i]] &&
            position[color[index]][wordForm[i]] ===
              position[color[index]][wordForm[ii]]
          ) {
            result.push(position[color[index]][wordForm[i]])
            // todo: remove duplicate if any
          }
        }
      }
    }
    return [...new Set(result)]
  }

  function blocked (samePosArr, color, dice) {
    let blocked = 0

    // loop thru all the peices to see if there are any blocks
    for (let i = 1; i < 5; i++) {
      dispatch(ludoAction.enablePiece({ color: color, pieceNum: wordForm[i] }))

      let currentPos = position[color][wordForm[i]]

      // block from home
      if (typeof currentPos !== 'number') {
        currentPos = currentPos.replace(/H/, '')
        // can't go over home and update choice
        const addDice = +currentPos + dice
        if (addDice > 6) {
          dispatch(
            ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
          )
          blocked++
        }
        continue
      }

      const addDice = currentPos + dice

      for (let ii = 0; ii < samePosArr.length; ii++) {
        const disabledLogic =
          currentPos < samePosArr[ii] && addDice >= samePosArr[ii]

        if (currentPos === 0) continue

        if (
          addDice > samePosArr[ii] &&
          samePosArr[ii] > rules[color].end &&
          samePosArr[ii] > rules[color].end &&
          rules[color].end + 5 > samePosArr[ii]
        ) {
          // this won't work with blue
          continue
        }

        if (addDice > 52 && samePosArr[ii] <= addDice - 52) {
          dispatch(
            ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
          )
          blocked++
        }

        if (disabledLogic) {
          dispatch(
            ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
          )
          blocked++
        }
      }
    }
    return blocked
  }

  return (
    <div
    className={
      'roll ' + turn + 'Roll' + (rollEnabled ? ' rollEnabled' : '')
    }
    onClick={rollHandler}
  >
    ROLL
  </div>
  )
}

export default Roll
