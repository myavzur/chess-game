import { Figure, FigureNames } from "./Figure";
import { Cell } from "models/Cell";
import { Colors } from "models/Colors";

import blackLogo from 'assets/black-knight.png'
import whiteLogo from 'assets/white-knight.png'

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false

    const deltaX = Math.abs(this.cell.x - target.x)
    const deltaY = Math.abs(this.cell.y - target.y)

    return (deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)
  }
}