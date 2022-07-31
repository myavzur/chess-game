import React, { useEffect, useState } from "react"

import CellComponent from "./CellComponent"
import { Board } from "models/Board"
import { Cell } from "models/Cell";
import { Player } from "models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    highlightAvailableCells()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])

  function onClick(cell: Cell) {
    if (
      selectedCell && selectedCell !== cell // Not the same cell
      && 
      selectedCell.figure?.canMove(cell) // Selected figure can move on target
    ) {
      selectedCell.moveFigure(cell) // Move figure on the target
      swapPlayer()
      setSelectedCell(null)
    } else {
      // Can't select black figures if you are white
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  } 

  function highlightAvailableCells() {
    board.highlightAvailableCells(selectedCell) // Make logic inside of the model...
    
    updateBoard() // ...then rerender component to see model changes!
  }

  function updateBoard() {
    const newBoard = board.getBoardCopy()
    setBoard(newBoard)
  }

  // ! Fragment as wrapper for row of 8 cells
  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map(cell => (
            <CellComponent
              key={cell.id}
              cell={cell}
              isSelected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              onClick={onClick}
            />  
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default BoardComponent
