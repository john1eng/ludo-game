import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ludoAction } from '../store'

const MoveButton = (props) => {
  const { color, pieceNum } = { ...props.properties }

  const turnColor = useSelector((state) => state.turnColor)
  const rollState = useSelector((state) => state.rollState)
  const enable = useSelector((state) => state.enable[color][pieceNum])
  const reducePieceSize = useSelector((state) => state.reduce[color][pieceNum])
  const dispatch = useDispatch()
  function movePlayerHandler () {
    dispatch(ludoAction.movePlayer(props.properties))
    dispatch(ludoAction.turnChange())
    dispatch(ludoAction.diceWhereLocation(''))
  }

  const disableLogic = (color !== turnColor || !rollState || !enable)

  return (
    <div
      className={color + ' pieceForm' + (disableLogic ? ' disabled' : '') + (reducePieceSize ? ' reduce' : '')}
      onClick={movePlayerHandler}
    >
    </div>
  )
}

export default MoveButton
