import { createSlice, configureStore } from "@reduxjs/toolkit";
import { changeColor } from "../utils/changeColor";

const rules = {
  blue: { start: 1, end: 51 }, // 1 and 51
  red: { start: 40, end: 38 }, // 40 and 38
  yellow: { start: 14, end: 12 }, // 14 and 12
  green: { start: 27, end: 25 } // 27 and 25
};

const initialState = {
  positions: {
    blue: {
      one: 0,
      two: 0,
      three: 0,
      four: 0
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
  },
  pieces: {
    blue: {
      start: 4,
      board: 0,
      home: 0
    },
    red: {
      start: 4,
      board: 0,
      home: 0
    },
    yellow: {
      start: 4,
      board: 0,
      home: 0
    },
    green: {
      start: 4,
      board: 0,
      home: 0
    }
  },
  homeBoard: {
    blue: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    red: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    yellow: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    }),
    green: new Array(6).fill(0).map((v, i) => {
      return [{ pieceNum: "", color: "", component: i + 1 }];
    })
  },
  board: new Array(52).fill(0).map((v, i) => {
    return [{ pieceNum: "", color: "", component: i + 1 }];
  }),
  dice: 0,
  choices: {
    blue: 0,
    red: 0
  },
  turnColor: "red",
  rollStateDisable: true,
  enable: {
    blue: {
      one: true,
      two: true,
      three: true,
      four: true
    },
    red: {
      one: true,
      two: true,
      three: true,
      four: true
    },
    yellow: {
      one: true,
      two: true,
      three: true,
      four: true
    },
    green: {
      one: true,
      two: true,
      three: true,
      four: true
    }
  },
  rollEnabled: true,
  reduce: {
    blue: {
      one: false,
      two: false,
      three: false,
      four: false
    },
    red: {
      one: false,
      two: false,
      three: false,
      four: false
    },
    yellow: {
      one: false,
      two: false,
      three: false,
      four: false
    },
    green: {
      one: false,
      two: false,
      three: false,
      four: false
    }
  },
  diceWhere: "",
  players: []
};

export const ludoSlice = createSlice({
  name: "ludo",
  initialState: { ...initialState },
  reducers: {
    resetGame (state) {
      return initialState;
    },
    removePlayer (state, action) {
      if (state.players === []) {
        return;
      }
      state.players = state.players.filter(
        (player) => player !== action.payload
      );
    },
    setPlayers (state, action) {
      const p = action.payload;
      state.players = p;
      state.turnColor = p[0];
    },
    diceWhereLocation (state, action) {
      const color = action.payload;
      console.log(color);
      state.diceWhere = color;
    },
    reducePieceSize (state, action) {
      const { color, pieceNum } = { ...action.payload };
      state.reduce[color][pieceNum] = true;
    },
    increasePieceSize (state, action) {
      const { color, pieceNum } = { ...action.payload };
      state.reduce[color][pieceNum] = false;
    },
    rollDisable (state) {
      state.rollEnabled = false;
    },
    turnChange2 (state) {
      const colorChange = changeColor(state.turnColor, state.players);
      state.turnColor = colorChange;
    },
    turnChange (state) {
      if (state.pieces[state.turnColor].home === 4 || state.dice === 6) {
        return;
      }

      console.log(state.turnColor, ...state.players);
      const colorChange = changeColor(state.turnColor, state.players);
      state.turnColor = colorChange;
      // for(let i = 0; i<state.players.length; i++)
      // {
      //   const color = state.players[i]
      //   console.log(color)
      //   if(color === state.turnColor){
      //     const temp = (state.players.length-1 === i) ? 0 : i + 1;
      //     console.log(temp)
      //     state.turnColor = state.players[temp];
      //     return
      //   }

      // }
    },
    rollDice (state, action) {
      state.dice = action.payload;
    },
    moveToBoard (state, action) {
      const { color, pieceNum } = { ...action.payload };

      // there are three senerio
      // 1) no pieces -
      // 2) your piece -
      // 3) your opponent piece -
      // 4) multiple opponet piece -
      // 5) there's no pieces to start -
      // 6) dice is no six

      const colorStart = rules[color].start;
      const firstStart = state.board[colorStart - 1][0];
      state.rollEnabled = true;
      // if (state.dice !== 6){
      //   return
      // }

      // there's no pieces to start
      if (state.pieces[color].start === 0) {
        return;
      }

      // if no pieces
      if (firstStart.color === "") {
        state.board[colorStart - 1] = [
          {
            color: color,
            pieceNum: pieceNum
          }
        ];
        state.pieces[color].board = state.pieces[color].board + 1;
        state.pieces[color].start = state.pieces[color].start - 1;
        state.positions[color][pieceNum] = colorStart;
        state.rollStateDisable = false;
        return;
      }

      // if your piece is already there
      if (firstStart.color === color) {
        state.board[colorStart - 1].push({
          color: color,
          pieceNum: pieceNum
        });
        state.pieces[color].board = state.pieces[color].board + 1;
        state.pieces[color].start = state.pieces[color].start - 1;
        state.positions[color][pieceNum] = colorStart;
        state.rollStateDisable = false;
        return;
      }

      // if two opponnent piece is there, return
      if (
        state.board[colorStart - 1].length > 1 &&
        state.board[colorStart - 1][1] !== color
      ) {
        console.log("two oppon");
        return;
      }

      // if other oppenent piece is there, replace it
      if (firstStart.color !== color) {
        console.log("other player");
        const opponentColor = firstStart.color;
        const opponentPiece = firstStart.pieceNum;
        state.board[colorStart - 1] = [
          {
            color: color,
            pieceNum: pieceNum
          }
        ];

        state.pieces[opponentColor].start =
          state.pieces[opponentColor].start + 1;
        state.pieces[opponentColor].board =
          state.pieces[opponentColor].board - 1;
        state.positions[opponentColor][opponentPiece] = 0;

        state.pieces[color].board = state.pieces[color].board + 1;
        state.pieces[color].start = state.pieces[color].start - 1;
        state.positions[color][pieceNum] = colorStart;
        state.rollStateDisable = false;
      }
    },
    movePlayer (state, action) {
      const { color, pieceNum } = { ...action.payload };
      state.rollEnabled = true;
      // move piece already in homebase
      if (typeof state.positions[color][pieceNum] !== "number") {
        console.log(color, pieceNum);
        const num = state.positions[color][pieceNum].replace(/H/, "");
        // can't go over home and update choice
        const newPosNum = +num + state.dice;
        if (newPosNum > 6) return;

        removePieceFromHome(num);

        movePieceFromHome(newPosNum);

        // update position
        state.positions[color][pieceNum] = newPosNum + "H";

        // if (state.dice !== 6 && state.pieces[color].home !== 4)
        //   state.turnColor = state.turnColor === "blue" ? "red" : "blue"

        state.rollStateDisable = false;
        return;
      }

      const colorEnd = rules[color].end;
      // move piece to homebase
      if (
        state.positions[color][pieceNum] + state.dice > colorEnd &&
        state.positions[color][pieceNum] <= colorEnd
      ) {
        //   moveToBase
        const toBase = state.dice + state.positions[color][pieceNum] - colorEnd;
        console.log(toBase);
        movePieceFromHome(toBase);
        const homePos = state.positions[color][pieceNum];
        removePieceFromBoard(homePos);
        state.positions[color][pieceNum] = toBase + "H";
        state.rollStateDisable = false;
        return;
      }
      // move piece on board
      const currentPos = state.positions[color][pieceNum];
      console.log(currentPos, color, pieceNum);
      let newPos = currentPos + state.dice;
      // manage duplicate pieces
      removePieceFromBoard(currentPos);
      // state.pieces[color].home = 4

      // move piece from beginning
      if (state.board.length >= newPos) {
        movePieceFromBoard(newPos);
        // move piece that react to the ending
      } else {
        newPos = newPos - state.board.length;
        movePieceFromBoard(newPos);
      }
      state.positions[color][pieceNum] = newPos;
      state.rollStateDisable = false;
      // if (state.dice !== 6 )
      // state.turnColor = state.turnColor === "blue" ? "red" : "blue"

      function movePieceFromHome (num) {
        console.log(num, color);
        state.homeBoard[color][num - 1][0].pieceNum === ""
          ? (state.homeBoard[color][num - 1] = [
              {
                color: color,
                pieceNum: pieceNum,
                component: num
              }
            ])
          : state.homeBoard[color][num - 1].push({
            color: color,
            pieceNum: pieceNum,
            component: num
          });
        if (num === 6) {
          state.pieces[color].home = state.pieces[color].home + 1;
        }
      }

      function removePieceFromHome (num) {
        const homeBoardPieces = state.homeBoard[color][num - 1];

        if (homeBoardPieces.length > 1) {
          // if there are multiple pieces subtract one of the piece
          state.homeBoard[color][num - 1] = homeBoardPieces.filter(
            (obj) => obj.pieceNum !== pieceNum
          );
        } else {
          // or replace with initial state
          state.homeBoard[color][num - 1] = [{ pieceNum: "", component: +num }];
        }
      }

      function movePieceFromBoard (num) {
        // if different color, the other color will replace and increase piece start
        console.log("move piece from board");
        console.log(state.board[num - 1][0].pieceNum);

        if (
          state.board[num - 1][0].color !== color &&
          state.board[num - 1][0].color !== ""
        ) {
          const opponentColor = state.board[num - 1][0].color;
          const opponentPos = state.board[num - 1][0].pieceNum;
          state.board[num - 1] = [
            {
              color: color,
              pieceNum: pieceNum
            }
          ];
          state.pieces[opponentColor].start =
            state.pieces[opponentColor].start + 1;
          state.pieces[opponentColor].board =
            state.pieces[opponentColor].board - 1;
          state.positions[opponentColor][opponentPos] = 0;
          console.log(opponentColor, opponentPos);
          return;
        }

        state.board[num - 1][0].pieceNum === ""
          ? (state.board[num - 1] = [
              {
                color: color,
                pieceNum: pieceNum
              }
            ])
          : state.board[num - 1].push({
            color: color,
            pieceNum: pieceNum
          });
      }

      function removePieceFromBoard (num) {
        if (state.board[num - 1].length > 1) {
          state.board[num - 1] = state.board[num - 1].filter(
            (obj) => obj.pieceNum !== pieceNum
          );
        } else {
          state.board[num - 1] = [{ pieceNum: "", color: "", component: num }];
        }
      }
    },
    playerChoices (state, action) {
      console.log("playerChoices");
      console.log(action);
      let c = 0;
      const piecesOnStart = state.pieces[state.turnColor].start;
      const piecesOnBoard = state.pieces[state.turnColor].board;
      console.log(piecesOnStart, piecesOnBoard);
      console.log(piecesOnStart, piecesOnBoard);
      if (state.dice === 6 && piecesOnStart > 0) {
        c++;
      }
      c = c + piecesOnBoard - action.payload;
      state.choices[state.turnColor] = c;
      console.log(c);
      if (c === 0 && state.dice === 6) {
        state.rollStateDisable = false;
        state.rollEnabled = true;
        state.diceWhere = "";
        return;
      }

      if (c === 0 && state.dice !== 6) {
        const colorChange = changeColor(state.turnColor, state.players);
        state.turnColor = colorChange;
        state.rollStateDisable = false;
        state.rollEnabled = true;
        return;
      }

      state.rollStateDisable = true;
    },
    enablePiece (state, action) {
      const { color, pieceNum } = { ...action.payload };
      state.enable[color][pieceNum] = true;
    },
    disablePiece (state, action) {
      const { color, pieceNum } = { ...action.payload };
      state.enable[color][pieceNum] = false;
    },
    disablePieces (state, action) {
      const disablePieceArray = [...action.payload];
      disablePieceArray.forEach((piece) => state.enable[piece.color][piece.pieceNum] = false);
    },
    resetDisablePieces (state, action) {
      const color = action.payload;

      for (const key of Object.keys(state.enable[color])) {
        state.enable[color][key] = 'true';
      }
    },
    fastTest (state, action) {
      state.board[1] = [{ pieceNum: "one", color: "yellow", component: 2 }, { pieceNum: "two", color: "yellow", component: 2 }];
      state.board[4] = [{ pieceNum: "three", color: "yellow", component: 5 }];
      state.board[0] = [{ pieceNum: "one", color: "blue", component: 1 }];
      state.board[50] = [{ pieceNum: "two", color: "blue", component: 51 }];
      state.board[24] = [{ pieceNum: "one", color: "green", component: 25 }];
      state.positions.yellow.one = 2;
      state.positions.yellow.two = 2;
      state.positions.yellow.three = 5;
      state.positions.blue.one = 1;
      state.positions.blue.two = 51;
      state.positions.green.one = 25;
      state.rollEnabled = true;
      state.diceWhere = 'yellow';
      state.turnColor = "blue";
      state.players = ["yellow", "blue", "green"];
      state.pieces.blue.start = 2;
      state.pieces.blue.board = 2;
      state.pieces.yellow.start = 1;
      state.pieces.yellow.board = 3;
      state.pieces.green.start = 3;
      state.pieces.green.board = 1;
    }
  }
});

const store = configureStore({
  reducer: ludoSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const ludoAction = ludoSlice.actions;

export default store;
