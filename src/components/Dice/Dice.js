import React, { useState, useEffect } from 'react'
import styles from './Dice.module.css'
import { rollDice } from '../roll'
import { useSelector } from 'react-redux'

function Dice (prop) {
  const die_one = (
    <div className={styles.dice + ' ' + styles.first_face}>
      <span className={styles.dot}> </span>
    </div>
  )
  const die_two = (
    <div className={styles.dice + ' ' + styles.second_face}>
      <span className={styles.dot}> </span>
      <span className={styles.dot}> </span>
    </div>
  )

  const die_three = (
    <div className={styles.dice + ' ' + styles.third_face}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  )

  const die_four = (
    <div className={styles.fourth_face + ' ' + styles.dice}>
      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  )

  const die_six = (
    <div className={styles.fourth_face + ' ' + styles.dice}>
      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  )

  const die_five = (
    <div
      className={
        styles.fifth_face + ' ' + styles.fourth_face + ' ' + styles.dice
      }
    >
      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>

      <div className={styles.column}>
        <span className={styles.dot}></span>
      </div>

      <div className={styles.column}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  )
  const die = {
    1: die_one,
    2: die_two,
    3: die_three,
    4: die_four,
    5: die_five,
    6: die_six
  }

  const [randomD, setRandomD] = useState(rollDice())

  const diceWhere = useSelector(state => state.diceWhere)

  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      counter += 1
      if (counter >= 4) {
        new Promise((resolve) => resolve(clearInterval(interval))).then(() =>
          setRandomD(prop.dice)
        )
      }
      setRandomD(rollDice())
    }, 200)
  }, [diceWhere, prop.dice])

  return (
    <div className={(diceWhere ? styles[diceWhere + 'Dice'] : styles.diceDisable)}>
      {die[randomD]}
    </div>
  )
}

export default Dice
