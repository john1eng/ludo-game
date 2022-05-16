/* eslint-disable */
import React from "react";
import styles from "./WinnerMsg.module.css";
import trophy from "../../img/trophy-resize.png";
import { CSSTransition } from "react-transition-group";
import { ludoAction } from "../../store";
import { useDispatch } from "react-redux";

const animationTimming = {
  enter: 400,
  exit: 1000,
};
export function WinnerMsg(props) {
  const color = props.color;
  const dispatch = useDispatch();

  const continueGame = () => {
    dispatch(ludoAction.turnChange2());
    dispatch(ludoAction.removePlayer(color));
    props.closeMsg();
  };

  const newGame = () => {
    dispatch(ludoAction.resetGame());
    props.closeMsg();
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTimming}
      classNames={{
        enter: "",
        enterActive: styles.winnerMsgOpen,
        exit: "",
        exitActive: styles.winnerMsgClose,
      }}
    >
      <div className={styles.WinnerMsg}>
        <div className={styles.winnerMsg}>
          <h2>
            Congratuation <span className={styles[color]}>Player</span> Won!
          </h2>
          <img className={styles.trophyImg} src={trophy} alt="" />
          <div className={styles.buttons}>
            <button onClick={continueGame}>Continue</button>
            <button onClick={newGame}>New game</button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default WinnerMsg;
