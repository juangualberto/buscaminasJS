function createCell() {
  return {
    hasMine: false,
    adjacentMines: 0,
    isRevealed: false,
    isFlagged: false,
  };
}

export default class BoardModel {
  constructor(rows, columns, mineCount) {
    if (!Number.isInteger(rows) || !Number.isInteger(columns) || !Number.isInteger(mineCount)) {
      throw new TypeError('rows, columns y mineCount deben ser enteros');
    }

    if (rows <= 0 || columns <= 0) {
      throw new RangeError('rows y columns deben ser mayores que cero');
    }

    const maxMines = rows * columns - 1;
    if (mineCount < 1 || mineCount > maxMines) {
      throw new RangeError(`mineCount debe estar entre 1 y ${maxMines}`);
    }

    this.rows = rows;
    this.columns = columns;
    this.mineCount = mineCount;
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => createCell()),
    );

    this.#placeMines();
    this.#calculateAdjacency();
  }

  revealCell(row, column) {
    if (!this.inBounds(row, column)) {
      return { type: 'noop' };
    }

    const cell = this.getCell(row, column);

    if (cell.isRevealed || cell.isFlagged) {
      return { type: 'noop' };
    }

    if (cell.hasMine) {
      cell.isRevealed = true;
      return { type: 'mine' };
    }

    const revealed = [];
    const pending = [[row, column]];
    const visited = new Set();

    while (pending.length > 0) {
      const [currentRow, currentColumn] = pending.pop();
      const key = `${currentRow}:${currentColumn}`;

      if (visited.has(key) || !this.inBounds(currentRow, currentColumn)) {
        continue;
      }
      visited.add(key);

      const currentCell = this.getCell(currentRow, currentColumn);

      if (currentCell.isFlagged || currentCell.isRevealed || currentCell.hasMine) {
        continue;
      }

      currentCell.isRevealed = true;
      revealed.push([currentRow, currentColumn]);

      if (currentCell.adjacentMines === 0) {
        for (const [nextRow, nextColumn] of this.getNeighbors(currentRow, currentColumn)) {
          pending.push([nextRow, nextColumn]);
        }
      }
    }

    return { type: 'revealed', revealed };
  }

  toggleFlag(row, column) {
    if (!this.inBounds(row, column)) {
      return false;
    }

    const cell = this.getCell(row, column);
    if (cell.isRevealed) {
      return false;
    }

    cell.isFlagged = !cell.isFlagged;
    return cell.isFlagged;
  }

  revealAll() {
    for (const row of this.grid) {
      for (const cell of row) {
        cell.isRevealed = true;
      }
    }
  }

  countFlags() {
    return this.grid.flat().filter((cell) => cell.isFlagged).length;
  }

  hiddenSafeCells() {
    return this.grid
      .flat()
      .filter((cell) => !cell.hasMine && !cell.isRevealed)
      .length;
  }

  getCell(row, column) {
    return this.grid[row][column];
  }

  inBounds(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  getNeighbors(row, column) {
    const neighbors = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) {
          continue;
        }

        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;

        if (this.inBounds(nextRow, nextColumn)) {
          neighbors.push([nextRow, nextColumn]);
        }
      }
    }

    return neighbors;
  }

  #placeMines() {
    const allPositions = [];

    for (let row = 0; row < this.rows; row += 1) {
      for (let column = 0; column < this.columns; column += 1) {
        allPositions.push([row, column]);
      }
    }

    for (let index = allPositions.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [allPositions[index], allPositions[randomIndex]] = [allPositions[randomIndex], allPositions[index]];
    }

    for (let index = 0; index < this.mineCount; index += 1) {
      const [row, column] = allPositions[index];
      this.grid[row][column].hasMine = true;
    }
  }

  #calculateAdjacency() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let column = 0; column < this.columns; column += 1) {
        const cell = this.grid[row][column];

        if (cell.hasMine) {
          continue;
        }

        cell.adjacentMines = this.getNeighbors(row, column)
          .filter(([nextRow, nextColumn]) => this.grid[nextRow][nextColumn].hasMine)
          .length;
      }
    }
  }
}