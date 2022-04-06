import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ludoAction } from '../../store';
import styles from './StartBoard.module.css';

function StartBoard () {
  const [players, setPlayers] = useState([]);
  const [trans, setTrans] = useState({ green: false });
  const dispatch = useDispatch();
  const transparent = (color) => {
    setTrans((p) => {
      const t = { ...p };
      t[color] = !t[color];
      // return {green:true}
      console.log(players, color);
      let temp = [...players];
      if (t[color]) {
        // players.push(color)
        temp.push(color);
        setPlayers(temp);
      } else {
        temp = temp.filter((i) => i !== color);
        setPlayers(temp);
      }
      return t;
    });
  };

  function startGame () {
    dispatch(ludoAction.setPlayers(players));
  }

  return (
    <div>
      <div
        className={
          styles.green + (!trans.green ? '' : ' ' + styles.transparent)
        }
        onClick={() => transparent('green')}
      ></div>
      <div
        className={styles.red + (!trans.red ? '' : ' ' + styles.transparent)}
        onClick={() => transparent('red')}
      ></div>
      <div
        className={
          styles.yellow + (!trans.yellow ? '' : ' ' + styles.transparent)
        }
        onClick={() => transparent('yellow')}
      ></div>
      <div
        className={styles.blue + (!trans.blue ? '' : ' ' + styles.transparent)}
        onClick={() => transparent('blue')}
      ></div>
      <div className={styles.start}>
        <div className={styles.heading}>
          <p>Choose&emsp;&emsp;</p> <p>&emsp;&emsp;Players</p>
        </div>
        <button
          className={
            styles.button + (!(players.length > 1) ? ' ' + styles.hidden : '')
          }
          onClick={startGame}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StartBoard;
