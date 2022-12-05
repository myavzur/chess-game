import React, { useEffect, useLayoutEffect, useState } from "react"
import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Physics } from '@react-three/cannon'

import Helpers from 'components/Helpers'
import CellComponent from "components/Cell"
import { Board } from "models/Board"
import { Cell } from "models/Cell"

interface Props {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<Props> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const boardOffset = (-board?.cells.length + 1) * 0.5

  const updateBoard = () => {
    if (board) {
      const newBoard = board.getBoardCopy()
      setBoard(newBoard)
    }
  }

  const highlightAvailableCells = () => {
    if (board) {
      board.highlightAvailableCells(selectedCell) // Make logic inside of the model...
      updateBoard() // ...then rerender component to see model changes!
    }
  }

  const handleCellSelect = (cell: Cell) => {
    if (
      selectedCell && (selectedCell !== cell) // Not the same cell
      && 
      selectedCell.figure?.canMove(cell) // Selected figure can move on target
    ) {
      selectedCell.moveFigure(cell) // Move figure on the target
      return setSelectedCell(null)
    } 
    
    return setSelectedCell(cell)
  }

  // * Highlights available cells after selecting cell
  useEffect(() => {
    highlightAvailableCells()
  }, [selectedCell])

  return (
    <group position={[boardOffset, 0, boardOffset]}>
      {board?.cells.map((row, posZ) => {
        return (
          <group 
            key={posZ}
            position={[0, 0, posZ]}
          >
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                onClick={handleCellSelect}
                isSelected={
                  (selectedCell?.x === cell.x) && (selectedCell?.y === cell.y)
                }
                key={cell.id}
              />
            ))}
          </group>
        )
      })}
    </group>
  )
}

const Chess: React.FC = () => {
  const [board, setBoard] = useState<Board | null>(null)
  
  useLayoutEffect(() => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }, [])

  return (
    <React.Suspense fallback="Loading...">
      <Canvas
        shadows
        style={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Helpers.Grid />
        <Helpers.Axis />

        <OrbitControls
          target={[0, 0, 0]}
          maxPolarAngle={ 1.45 }
          maxDistance={10}
          minDistance={6.5}
        />
        <PerspectiveCamera 
          position={[0, 10, 10]}
          makeDefault
          fov={70}
        />

        <color 
          args={[0,0,0]}      // RGB
          attach="background" // Применяем к canvas.background, потому что используется внутри Canvas компонента
        />
        
        
        <ambientLight color={'white'}/>
        <pointLight position={[10, 10, 10]} color="hotpink"/>

        <Physics >
          <BoardComponent
            board={board!}
            setBoard={setBoard}
          />
        </Physics>
      </Canvas>
      <Loader/>
    </React.Suspense>
  )
}

export default Chess