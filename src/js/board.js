
export class MinesweeperBoard {
  constructor(rows, columns, mines) {
    this.rows = rows;
    this.columns = columns;
    this.mines = mines;
    this.grid = [];
    this.revealedCount = 0;
    this.flaggedCount = 0;
    this.hasExploded = false;
    this.#createGrid();
    this.#placeMines();
    this.#calculateNeighborMines();
  }

  #createGrid() {
    this.grid = Array.from({ length: this.rows }, (_, row) => (
      Array.from({ length: this.columns }, (_, column) => ({
        row,
        column,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    ));
  }

  #placeMines() {
    let minesPlaced = 0;

    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const column = Math.floor(Math.random() * this.columns);
      const cell = this.grid[row][column];

      if (!cell.isMine) {
        cell.isMine = true;
        minesPlaced += 1;
      }
    }
  }

  #calculateNeighborMines() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let column = 0; column < this.columns; column += 1) {
        const cell = this.grid[row][column];
        if (!cell.isMine) {
          cell.neighborMines = this.getNeighbors(row, column)
            .filter((neighbor) => neighbor.isMine)
            .length;
        }
      }
    }
  }

  isInside(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  getCell(row, column) {
    return this.isInside(row, column) ? this.grid[row][column] : null;
  }

  getNeighbors(row, column) {
    const neighbors = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) {
          continue;
        }

        const neighborRow = row + rowOffset;
        const neighborColumn = column + columnOffset;

        if (this.isInside(neighborRow, neighborColumn)) {
          neighbors.push(this.grid[neighborRow][neighborColumn]);
        }
      }
    }

    return neighbors;
  }

  toggleFlag(row, column) {
    const cell = this.getCell(row, column);

    if (!cell || cell.isRevealed) {
      return null;
    }

    cell.isFlagged = !cell.isFlagged;
    this.flaggedCount += cell.isFlagged ? 1 : -1;

    return {
      type: 'flag-toggled',
      cell,
      minesLeft: this.mines - this.flaggedCount,
    };
  }

  revealCell(row, column) {
    const firstCell = this.getCell(row, column);

    if (!firstCell || firstCell.isRevealed || firstCell.isFlagged || this.hasExploded) {
      return { type: 'ignored' };
    }

    if (firstCell.isMine) {
      firstCell.isRevealed = true;
      this.hasExploded = true;
      return {
        type: 'mine',
        explodedCell: firstCell,
        mines: this.getAllMines(),
      };
    }

    const revealedCells = [];
    const pendingCells = [firstCell];

    while (pendingCells.length > 0) {
      const currentCell = pendingCells.pop();

      if (currentCell.isRevealed || currentCell.isFlagged) {
        continue;
      }

      currentCell.isRevealed = true;
      this.revealedCount += 1;
      revealedCells.push(currentCell);

      if (currentCell.neighborMines === 0) {
        for (const neighbor of this.getNeighbors(currentCell.row, currentCell.column)) {
          if (!neighbor.isRevealed && !neighbor.isMine && !neighbor.isFlagged) {
            pendingCells.push(neighbor);
          }
        }
      }
    }

    return {
      type: this.hasWon() ? 'win' : 'safe',
      revealedCells,
      mines: this.hasWon() ? this.getAllMines() : [],
    };
  }

  hasWon() {
    return this.revealedCount === (this.rows * this.columns) - this.mines;
  }

  getAllMines() {
    return this.grid.flat().filter((cell) => cell.isMine);
  }
}
