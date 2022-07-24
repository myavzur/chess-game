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
    const handleEscapeHotkey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { // escape key maps to keycode `27`
        setSelectedCell(null)
      }
    }

    document.addEventListener("keyup", handleEscapeHotkey)
    return () => {
      document.removeEventListener("keyup", handleEscapeHotkey)
    }
  }, [])

  useEffect(() => {
    highlightAvailableCells()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])

  function onClick(cell: Cell) {
    const isSameCell = cell === selectedCell
    const canMoveToCell = selectedCell?.figure?.canMove(cell)

    if (selectedCell && !isSameCell && canMoveToCell) {
      selectedCell?.moveFigure(cell) // Move figure on the target
      swapPlayer()
      setSelectedCell(null)
    } else {
      const canSelectCell = cell.figure?.color === currentPlayer?.color
      if (!canSelectCell) return
      setSelectedCell(cell)
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

  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map(cell => (
            <CellComponent
              key={cell.id}
              cell={cell}
              isSelected={
                cell.id === selectedCell?.id
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
