import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = [] // 8 columns with rows
  lostFigures = {
    black: [] as Figure[],
    white: [] as Figure[]
  }

  addLostFigures(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostFigures.black.push(figure)
      : this.lostFigures.white.push(figure)
  }

  /** Makes board. No figures. For default chess, use board.addFigures. */
  public initCells() {
    // Making columns of 8 rows
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = []

      // Making row of 8 cells
      for (let x = 0; x < 8; x++) {
        if ((y + x) % 2 !== 0) {
          row.push(new Cell(x, y, Colors.BLACK, null, this)) // Black
        }
        else {
          row.push(new Cell(x, y, Colors.WHITE, null, this)) // White
        }
      }

      this.cells.push(row)
    }

    console.log(this.cells)
  }

  /** Use this method for rerenders after board's model changes (such as board.highlightAvailableCells). */
  public getBoardCopy(): Board {
    const newBoard = new Board()

    newBoard.cells       = [...this.cells]
    newBoard.lostFigures = {...this.lostFigures}

    return newBoard
  }

  /** Highlights cells (changes their "isAvailable" property) into which selected figure can move to. */
  public highlightAvailableCells(selectedCell: Cell | null) {
    for (let y = 0; y < this.cells.length; y++) {
      const row = this.cells[y]

      for (let x = 0; x < row.length; x++) {
        const target = row[x]
        target.isAvailable = !!selectedCell?.figure?.canMove(target) // Boolean
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x]
  }

  public addFigures() {
    this.addPawns()
    this.addKings()
    this.addQueens()
    this.addKnights()
    this.addBishops()
    this.addRooks()
  }

  private addPawns() {
    for (let x = 0; x < 8; x++) {
      new Pawn(Colors.BLACK, this.getCell(x, 1))
      new Pawn(Colors.WHITE, this.getCell(x, 6))
    }
  }
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))

  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
  }
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
  }
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(7, 0))
    new Rook(Colors.WHITE, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
  }
}