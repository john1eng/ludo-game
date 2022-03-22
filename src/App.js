
import './App.css'
import React from 'react'
import { useSelector } from 'react-redux'
import Dice from './components/Dice/Dice'
import StartBoard from './components/StartBoard/StartBoard'
import PlayerHome from './components/Board/PlayerHome'
import WinnerMsg from './components/WinnerMsg/WinnerMsg'
import HomeBoard from './components/Board/Board'
import Roll from './components/Roll/Roll'

function App () {
  const positionR = useSelector((state) => state.positions)
  const dice = useSelector((state) => state.dice)
  const boardR = useSelector((state) => state.board)
  const homeBoardR = useSelector((state) => state.homeBoard)
  const turn = useSelector((state) => state.turnColor)
  const home = useSelector((state) => state.pieces[turn].home)
  const rollEnabled = useSelector((state) => state.rollEnabled)
  const players = useSelector((state) => state.players)

  // useEffect(() => {
  //   if (home === 4) alert(turn + " wins");
  // }, [home, turn]);

  return (
    <div className="App">
      {home === 4 && <WinnerMsg color={turn} />}
      <div className="ludo_board">
        <HomeBoard color="" board={boardR} />
        <HomeBoard color="blue" board={homeBoardR.blue} />
        <HomeBoard color="red" board={homeBoardR.red} />
        <HomeBoard color="yellow" board={homeBoardR.yellow} />
        <PlayerHome />
        <Roll turn={turn} rollEnabled={rollEnabled} position={positionR} />
        <Dice dice={dice} color={turn} />
        {!players.length ? <StartBoard /> : ''}
      </div>
    </div>
  )
}

export default App
