import { Cell } from "models/Cell"
import React from "react"

interface CellProps {
  cell: Cell;
  isSelected: boolean;
  onClick: (cell: Cell) => void;
  children?: React.ReactNode;
}

const CellComponent: React.FC<CellProps> = ({cell, isSelected, onClick}) => {
  return (
    <div
      onClick={() => onClick(cell)}
      className={[
        'cell',
        cell.color,
        isSelected ? 'selected' : '',
        cell.isAvailable && cell.figure ? "can-be-beaten" : ""
      ].join(' ')}
    >
      {cell.isAvailable && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
    </div>
  )
}

export default CellComponent