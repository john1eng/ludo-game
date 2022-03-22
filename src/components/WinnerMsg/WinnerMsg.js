import React from "react";
import styles from "./WinnerMsg.module.css";
import trophy from "../../img/trophy-resize.png";

function WinnerMsg(props) {

    const color = props.color;
  return (
    <div className={styles.WinnerMsg}>
      <div className={styles.overlay}></div>
      <div className={styles.winnerMsg}>
        <h2>Congratuation <span className={styles[color]}>Player</span> Won!</h2>
        <img className={styles.trophyImg} src={trophy} alt=""/>
      </div>
    </div>
  );
}

export default WinnerMsg;
