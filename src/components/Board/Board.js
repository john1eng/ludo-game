import React from 'react'
import { ludoAction } from "../../store";
import MoveButton from '../MoveButton';
import { useDispatch } from "react-redux";
import styles from "./Board.module.css"

function HomeBoard(props) {

    const {color, board} = {...props};

    const dispatch = useDispatch()

    const displayBoard = (color, board) => {
        return board.map((i, index) =>{
          return (
          <span className={styles[color + "Board_" + (index + 1)] + " board"}>
            {i.map((ii) => {
              if (i.length > 1) {
                dispatch(ludoAction.reducePieceSize(ii));
              }
              if (i.length === 1 && ii.color) {
                dispatch(ludoAction.increasePieceSize(ii));
              }
              if (ii.color) return <MoveButton properties={ii} />;
              // else return ii.component;
              else return ""
            })}
          </span>
          )

        }  
        );
      };

      const display = displayBoard(color, board);

  return (
    <div>
        {display}
    </div>
  )
}

export default HomeBoard