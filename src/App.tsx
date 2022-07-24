import React, { useEffect, useState } from 'react';

import './App.sass'
import BoardComponent from 'components/BoardComponent';
import { Board } from 'models/Board';
import { Player } from 'models/Player';
import { Colors } from 'models/Colors';
import Timer from 'components/Timer';

const App = () => {
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer)

  const [board, setBoard] = useState(new Board())

  const boardClassName = currentPlayer.color === Colors.BLACK ? 'game__board game__board_rotated' : 'game__board'

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <div className="game">
        <div className="game__timer">
          <Timer currentPlayer={currentPlayer} restart={restart} />
        </div>

        <div className="game__connector"></div>

        <div className={boardClassName}>
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
