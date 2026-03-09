import { CELL_CLASS_BY_VALUE } from './constants.js';

export default class BoardRenderer {
  constructor(container) {
    this.container = container;
  }

  render(board) {
    this.container.replaceChildren(this.#createBoardElement(board));
  }

  #createBoardElement(board) {
    const table = document.createElement('table');
    table.className = 'ms-board';
    table.setAttribute('role', 'grid');
    table.setAttribute('aria-label', 'Tablero de Buscaminas');

    const tbody = document.createElement('tbody');

    for (let row = 0; row < board.rows; row += 1) {
      const tr = document.createElement('tr');

      for (let column = 0; column < board.columns; column += 1) {
        const td = document.createElement('td');
        td.append(this.#createCellButton(board, row, column));
        tr.append(td);
      }

      tbody.append(tr);
    }

    table.append(tbody);
    return table;
  }

  #createCellButton(board, row, column) {
    const button = document.createElement('button');
    const cell = board.getCell(row, column);
    const baseClass = 'ms-cell';

    button.type = 'button';
    button.className = `${baseClass} ${this.#resolveCellClass(cell)}`.trim();
    button.dataset.row = String(row);
    button.dataset.column = String(column);
    button.setAttribute('aria-label', this.#resolveAriaLabel(cell, row, column));

    if (cell.isRevealed || cell.isFlagged) {
      button.setAttribute('aria-pressed', String(cell.isFlagged));
    }

    return button;
  }

  #resolveCellClass(cell) {
    if (!cell.isRevealed) {
      return cell.isFlagged ? 'bandera' : 'vacio';
    }

    if (cell.hasMine) {
      return 'bomba';
    }

    return CELL_CLASS_BY_VALUE[cell.adjacentMines] ?? 'nothingCell';
  }

  #resolveAriaLabel(cell, row, column) {
    if (cell.isFlagged) {
      return `Fila ${row + 1}, columna ${column + 1}, marcada con bandera`;
    }

    if (!cell.isRevealed) {
      return `Fila ${row + 1}, columna ${column + 1}, oculta`;
    }

    if (cell.hasMine) {
      return `Fila ${row + 1}, columna ${column + 1}, mina`;
    }

    if (cell.adjacentMines === 0) {
      return `Fila ${row + 1}, columna ${column + 1}, vacía`;
    }

    return `Fila ${row + 1}, columna ${column + 1}, ${cell.adjacentMines} minas alrededor`;
  }
}