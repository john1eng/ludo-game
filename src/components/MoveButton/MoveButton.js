import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ludoAction } from '../../store'

const MoveButton = (props) => {
  const { color, pieceNum } = { ...props.properties }
  const turnColor = useSelector((state) => state.turnColor)
  const rollStateDisable = useSelector((state) => state.rollStateDisable)
  const enable = useSelector((state) => state.enable[color][pieceNum])
  const reducePieceSize = useSelector((state) => state.reduce[color][pieceNum])
  const dispatch = useDispatch()
  function movePlayerHandler () {
    dispatch(ludoAction.movePlayer(props.properties))
    dispatch(ludoAction.turnChange())
    dispatch(ludoAction.diceWhereLocation(''))
  }

  const cssStyle = [color, 'pieceForm']
  const disableLogic = color !== turnColor || !rollStateDisable || !enable
  disableLogic && cssStyle.push('disabled')
  reducePieceSize && cssStyle.push('reduce')
  console.log(rollStateDisable)

  return <div className={cssStyle.join(' ')} onClick={movePlayerHandler}><noscript>click</noscript></div>
}

export default MoveButton
