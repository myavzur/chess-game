import { Cell } from "models/Cell"

export interface CellProps {
  cell: Cell;
  isSelected: boolean;
  onClick: (cell: Cell) => void;
}