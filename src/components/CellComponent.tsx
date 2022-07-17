import { Cell } from "models/Cell"
import React from "react"

interface CellProps {
  cell: Cell;
  isSelected: boolean;
  onClick: (cell: Cell) => void;
}

const CellComponent: React.FC<CellProps> = ({cell, isSelected, onClick, children}) => {
  return (
    <div 
      onClick={() => onClick(cell)}
      className={[
        'cell', 
        cell.color, 
        isSelected ? 'selected' : '' 
      ].join(' ')}
      style={{backgroundColor: cell.isAvailable && cell.figure ? 'green' : ''}} // Can I beat opponent figure on this cell?
    >
      {cell.isAvailable && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
    </div>
  )
}

export default CellComponent