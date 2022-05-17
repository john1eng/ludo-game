const wordForm = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' }

export function samePos (notColor, position) {
  console.log('samePos')
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

const rules = {
  blue: { start: 1, end: 51 }, // 1 and 51
  red: { start: 40, end: 38 },
  yellow: { start: 14, end: 12 },
  green: { start: 27, end: 25 }
}

/** different block senerio
    1. pieces at home can't reach to final destination
    2. pieces are blocked within the range

    pieces won't be block
    1. going to home instead of around the board
    2. pieces are just not blocked
  **/
export function blocked (samePosArr, color, dice, position) {
  let blocked = 0
  const blockedPieces = []

  // loop thru all the peices to see if there are any blocks
  for (let i = 1; i < 5; i++) {
    //   dispatch(ludoAction.enablePiece({ color: color, pieceNum: wordForm[i] }))

    let currentPos = position[color][wordForm[i]]

    // block from home
    if (typeof currentPos !== 'number') {
      if (currentPos === '6H') {
        continue
      }
      currentPos = currentPos.replace(/H/, '')
      // can't go over home and update choice
      const addDice = +currentPos + dice
      if (addDice > 6) {
        //   dispatch(
        //     ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
        //   )
        blockedPieces.push({ color, pieceNum: wordForm[i] })
        blocked++
      }
      continue
    }

    const addDice = currentPos + dice

    for (let ii = 0; ii < samePosArr.length; ii++) {
      if (currentPos === 0) break

      if (pieceGoToHomeWontBeBlocked(color, addDice, samePosArr[ii])) break

      if (addDice > 52 && samePosArr[ii] <= addDice - 52) {
        //   dispatch(
        //     ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
        //   )
        blockedPieces.push({ color, pieceNum: wordForm[i] })
        blocked++
        break
      }

      const disabledLogic =
        currentPos < samePosArr[ii] && addDice >= samePosArr[ii]

      if (disabledLogic) {
        //   dispatch(
        //     ludoAction.disablePiece({ color: color, pieceNum: wordForm[i] })
        //   )
        blockedPieces.push({ color, pieceNum: wordForm[i] })
        blocked++
        break
      }
    }
  }
  return { blocked, blockedPieces }
}

export function pieceGoToHomeWontBeBlocked (color, addDice, samePosition) {
  if (
    color === 'blue' &&
    addDice > 52 &&
    (samePosition === 52 || samePosition < 5)
  ) {
    return true
  }
  if (
    addDice > samePosition &&
    samePosition > rules[color].end &&
    rules[color].end + 5 > samePosition
  ) {
    return true
  }
  return false
}

export function checkBlock (dice, turn, position) {
  // check same position

  const samePosArr = samePos(turn, position)
  // return blocked(samePosArr, turn, dice)
  return blocked(samePosArr, turn, dice, position)

  // check if block
}
