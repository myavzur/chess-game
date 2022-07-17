import React, { useEffect, useState } from 'react';

import './App.sass'
import BoardComponent from 'components/BoardComponent';
import { Board } from 'models/Board';
import { Player } from 'models/Player';
import { Colors } from 'models/Colors';
import LostFigures from 'components/LostFigures';
import Timer from 'components/Timer';

const App = () => {
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const [board, setBoard] = useState(new Board())

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
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <h3>
        Current player {currentPlayer?.color}
      </h3>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title="Lost Black"
          figures={board.lostFiguresBlack}
        />
        <LostFigures
          title='Lost White'
          figures={board.lostFiguresWhite}
        />
      </div>
    </div>
  );
};

export default App;
