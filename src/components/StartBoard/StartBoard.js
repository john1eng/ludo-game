import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ludoAction } from '../../store'
import styles from './StartBoard.module.css'

function StartBoard () {
  const [players, setPlayers] = useState([])
  const [trans, setTrans] = useState({ green: false })
  const dispatch = useDispatch()

  const transparent = (color) => {
    setTrans((p) => {
      const t = { ...p }
      t[color] = !t[color]
      let temp = [...players]
      if (t[color]) {
        temp.push(color)
        setPlayers(temp)
      } else {
        temp = temp.filter((i) => i !== color)
        setPlayers(temp)
      }
      return t
    })
  }

  function startGame () {
    dispatch(ludoAction.setPlayers(players))
  }

  return (
    <div>
      <div
        className={
          styles.green + (!trans.green ? '' : ' ' + styles.transparent)
        }
        onClick={() => transparent('green')}
      ><span style={{ display: 'none' }}>green</span></div>
      <div
        className={styles.red + (!trans.red ? '' : ' ' + styles.transparent)}
        onClick={() => transparent('red')}
      ><span style={{ display: 'none' }}>red</span></div>
      <div
        className={
          styles.yellow + (!trans.yellow ? '' : ' ' + styles.transparent)
        }
        onClick={() => transparent('yellow')}
      ><span style={{ display: 'none' }}>yellow</span></div>
      <div
        className={styles.blue + (!trans.blue ? '' : ' ' + styles.transparent)}
        onClick={() => transparent('blue')}
      ><span style={{ display: 'none' }}>blue</span></div>
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
  )
}

export default StartBoard
