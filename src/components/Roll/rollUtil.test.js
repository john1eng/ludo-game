import { samePos, pieceGoToHomeWontBeBlocked, blocked } from './rollUtil'

describe('test samePos Function', () => {
  test('color with a same position of same color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 2,
        four: 2
      },
      red: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      yellow: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('blue', position)
    expect(result).toEqual([])
  })

  test('color with a sane position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 2,
        four: 2
      },
      red: {
        one: 51,
        two: 0,
        three: 0,
        four: 0
      },
      yellow: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('red', position)
    expect(result).toEqual([1, 2])
  })

  test('color with a sane position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 2,
        four: 2
      },
      red: {
        one: 51,
        two: 0,
        three: 0,
        four: 0
      },
      yellow: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('red', position)
    expect(result).toEqual([1, 2])
  })
  test('color with a sane position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 3,
        four: 4
      },
      red: {
        one: 51,
        two: 0,
        three: 0,
        four: 0
      },
      yellow: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('red', position)
    expect(result).toEqual([1])
  })

  test('color with multiple position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 2,
        four: 2
      },
      red: {
        one: 51,
        two: 0,
        three: 0,
        four: 0
      },
      yellow: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('red', position)
    expect(result).toEqual([1, 2])
  })
  test('color with 3 pieces in the same position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 1,
        three: 2,
        four: 2
      },
      red: {
        one: 41,
        two: 41,
        three: 41,
        four: 0
      },
      yellow: {
        one: 7,
        two: 0,
        three: 0,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('yellow', position)
    expect(result).toEqual([41, 1, 2])
  })
  test('color with non same position of different color', () => {
    const position = {
      blue: {
        one: 1,
        two: 2,
        three: 3,
        four: 4
      },
      red: {
        one: 5,
        two: 6,
        three: 7,
        four: 0
      },
      yellow: {
        one: 9,
        two: 0,
        three: 10,
        four: 0
      },
      green: {
        one: 0,
        two: 0,
        three: 0,
        four: 0
      }
    }
    const result = samePos('green', position)
    expect(result).toEqual([])
  })
})

// samePos, dice, color
// test red color
// if one red is 48, rolled 6, 2 is blocked, then block increase and red piece at 48 is blocked, but rolled 5 will not
// if one red is 20, rolled 6, 26 is blocked, than block increase and red peice at 20 is blocked, but rolled 5 will not
// if one red is 34, rolled 6, 39 is blocked, than block will not incrase and red piece is not blocked
// test with red pieces when same position and not
// if one red is at 3H, rolled 4, then block increases and that piece is blocked, but roll 3 will not

describe('test blocked function', () => {
  test('blocked from home', () => {
    const samePosArr = [2, 4, 5]
    const position = { red: { one: '3H', two: '1H', three: '4H', four: 0 } }
    const result = blocked(samePosArr, 'red', 5, position)
    expect(result).toEqual({ blocked: 2, blockedPieces: [{ color: 'red', pieceNum: 'one' }, { color: 'red', pieceNum: 'three' }] })
  })
  test('blocked from within the range', () => {
    const samePosArr = [3, 16, 6, 22]
    const position = { red: { one: 1, two: 10, three: 52, four: 21 } }
    const result = blocked(samePosArr, 'red', 6, position)
    expect(result).toEqual({ blocked: 4, blockedPieces: [{ color: 'red', pieceNum: 'one' }, { color: 'red', pieceNum: 'two' }, { color: 'red', pieceNum: 'three' }, { color: 'red', pieceNum: 'four' }] })
  })
  test('pieces are going home instead of blocked', () => {
    const samePosArr = [39]
    const position = { red: { one: 35, two: 34, three: 52, four: 21 } }
    const result = blocked(samePosArr, 'red', 6, position)
    expect(result).toEqual({ blocked: 0, blockedPieces: [] })
  })
})

// red at 35, rolled 5, samePiece at 39, then is not blocked
// red at 35, rolled 5, samePiece at 38, then is blocked
// red at 35, rolled 5, samePiece at 41, then is not blocked
// blue at 48, rolled 5, samePiece at 52, then is not blocked
// blue at 48, rolled 5, samePiece at 51, then is blocked
// blue at 48, rolled 5, samePiece at 3, then is not blocked
// yellow at 9, rolled 5, samePiece at 13, then is not blocked
// yellow at 9, rolled 5, samePiece at 12, then is blocked
// yellow at 9, rolled 5, samePiece at 19, then is not blocked
// green at 23, rolled 5, samePiece at 26, then is not blocked
// green at 23, rolled 5, samePiece at 25, then is blocked
// green at 23, rolled 5, samePiece at 32, then is not blocked
// if the first part is other color
// color, addDice, samePosition
describe('test PieceGoToHomeWontBeBlocked function', () => {
  test('red at 35, rolled 5, samePiece at 39, then is satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('red', 40, 39)
    expect(result).toBe(true)
  })
  test('red at 35, rolled 5, samePiece at 38, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('red', 40, 38)
    expect(result).toBe(false)
  })
  test('red at 35, rolled 5, samePiece at 41, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('red', 40, 41)
    expect(result).toBe(false)
  })
  test('yellow at 35, rolled 5, samePiece at 39, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('yellow', 40, 39)
    expect(result).toBe(false)
  })

  test('blue at 48, rolled 5, samePiece at 52, then is satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('blue', 53, 52)
    expect(result).toBe(true)
  })
  test('blue at 48, rolled 5, samePiece at 51, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('blue', 53, 51)
    expect(result).toBe(false)
  })
  test('blue at 48, rolled 5, samePiece at 3, then is satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('blue', 53, 3)
    expect(result).toBe(true)
  })
  test('blue at 48, rolled 5, samePiece at 1, then is satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('blue', 53, 1)
    expect(result).toBe(true)
  })
  test('blue at 51, rolled 4, samePiece at 2, then is satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('blue', 55, 2)
    expect(result).toBe(true)
  })
  test('yellow at 9, rolled 5, samePiece at 13, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('yellow', 14, 13)
    expect(result).toBe(true)
  })
  test('yellow at 9, rolled 5, samePiece at 12, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('yellow', 14, 12)
    expect(result).toBe(false)
  })
  test('yellow at 9, rolled 5, samePiece at 19, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('yellow', 14, 19)
    expect(result).toBe(false)
  })
  test('green at 23, rolled 5, samePiece at 26, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('green', 28, 26)
    expect(result).toBe(true)
  })
  test('green at 23, rolled 5, samePiece at 25, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('green', 28, 25)
    expect(result).toBe(false)
  })
  test('green at 23, rolled 5, samePiece at 32, then is not satisfied', () => {
    const result = pieceGoToHomeWontBeBlocked('green', 28, 32)
    expect(result).toBe(false)
  })
})
