import { Cell }   from "models/Cell";
import { Colors } from "models/Colors";

import logo from 'assets/black-king.png'

export enum FigureNames {
  FIGURE = '',
  BISHOP = 'Слон',
  KING   = 'Король',
  KNIGHT = 'Конь',
  PAWN   = 'Пешка',
  QUEEN  = 'Ферзь',
  ROOK   = 'Ладья',
}

export class Figure {
  id: number // For React keys
  name: FigureNames;
  color: Colors;
  logo: typeof logo | null;  
  Model: React.FC | null;

  cell: Cell;

  constructor(color: Colors, cell: Cell) {
    this.id   = Math.random()
    this.name = FigureNames.FIGURE;
    this.color = color;
    this.logo = null;
    this.Model = null

    this.cell  = cell;
    this.cell.figure = this; 
  } 

  moveFigure(target: Cell) {}

  /** Common rules (Black couldn't beat black, etc...). */
  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false // White beats black
    if (target.figure?.name === FigureNames.KING) return false
    return true
  }
}