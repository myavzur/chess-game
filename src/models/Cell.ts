import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  id: number;
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  /** Determines which figure is placed on this cell. */
  figure: Figure | null;
  /** Stores the object of the board to which this cell belongs. */
  board: Board;
  /** Determines whether the selected figure can move to this cell. (empty cell, no figures here) */
  isAvailable: boolean;

  constructor(x: number, y: number, color: Colors, figure: Figure | null, board: Board) {
    this.x = x
    this.y = y
    this.color  = color
    this.figure = figure
    this.board  = board
    this.isAvailable = false
    this.id = Math.random()
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color
    }

    return false
  }

  /** Any figures at the given cell? */
  isEmpty() {
    return this.figure === null
  }

  /** Checks if there is any figure on line to the top/bottom from given figure*/
  isEmptyVertical(target: Cell): boolean { // x  y      x  y             x y      x  y
    if (this.x !== target.x) return false // (5, 1) to (6, 1) - FALSE | (5,1) to (5, 6) - TRUE
  
    const min = Math.min(this.y, target.y) 
    const max = Math.max(this.y, target.y) 

    console.log(min, max)

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) return false // Vartical not empty
    }

    return true
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false // Same as vertical but with Y coordinate
  
    const min = Math.min(this.x, target.x) // From
    const max = Math.max(this.x, target.x) // To

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) return false // Vartical not empty
    }

    return true
  }

  /*
    (0, 1), (1, 1)  between Y=1 and Y=2, Y=3 and Y=2 - difference is always = 1. Same for X
    (0, 2), (1, 2)
    (0, 3), (1, 3)
  */
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x)
    const absY = Math.abs(target.y - this.y)

    if (absY !== absX) return false // Not diagonal

    const directionY = this.y < target.y ? 1 : -1
    const directionX = this.x < target.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if (
        !this.board.getCell(
          this.x + directionX * i,
          this.y + directionY * i
        ).isEmpty()
      ) {
        return false
      }
    }

    return true
  }

  /** Due to the ring dependence of the figure, it is also necessary to set the object of the new cell */
  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  moveFigure(target: Cell) {
    /*
      * If there is a figure on this cell and...
      * ...selected figure can move to the target, then move it
    */
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target)
      
      if (target.figure) {
        this.board.addLostFigures(target.figure)
      }

      // Replace figure to the target cell.
      target.setFigure(this.figure)

      // Clear previous position
      this.figure   = null
    }
    
  }
} 