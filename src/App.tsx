import React, { useCallback, useEffect, useState } from 'react';

import './App.sass'
import BoardComponent from 'components/BoardComponent';
import { Board } from 'models/Board';
import { Player } from 'models/Player';
import { Colors } from 'models/Colors';
import Timer from 'components/Timer';
import Chess from 'components/Chess';

const App = () => {
  const [whitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const [board, setBoard] = useState(new Board())

  const swapPlayer = useCallback(() => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }, [whitePlayer, blackPlayer, currentPlayer])
  
  const restart = useCallback(() => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }, [whitePlayer])

  useEffect(() => {
    restart()
  }, [restart])

  return (
    // <div className='app'>
    //   <BoardComponent
    //     board={board}
    //     setBoard={setBoard}
    //     currentPlayer={currentPlayer}
    //     swapPlayer={swapPlayer}
    //   />
    //   <Timer
    //     currentPlayer={currentPlayer}
    //     restart={restart}
    //   />
    // </div>
    <Chess/>
  );
};

export default App;
