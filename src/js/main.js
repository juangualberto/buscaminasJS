
import { MinesweeperBoard } from './board.js';
import { calculatePoints, clearScores, renderScores, saveScore } from './scores.js';

const DIFFICULTIES = {
  easy: { rows: 8, columns: 8, mines: 5, label: 'Fácil' },
  medium: { rows: 12, columns: 12, mines: 24, label: 'Normal' },
  hard: { rows: 16, columns: 16, mines: 40, label: 'Difícil' },
};

const elements = {
  panels: document.querySelectorAll('.panel'),
  menuButtons: document.querySelectorAll('[data-panel]'),
  board: document.getElementById('tablero'),
  mines: document.getElementById('minas'),
  timer: document.getElementById('reloj'),
  face: document.getElementById('carita'),
  status: document.getElementById('estadoPartida'),
  title: document.getElementById('tituloPartida'),
  scores: document.getElementById('tablaPuntuaciones'),
  clearScores: document.getElementById('borrarPuntuaciones'),
  scoreDialog: document.getElementById('dialogoPuntuacion'),
  scoreForm: document.getElementById('formPuntuacion'),
  playerName: document.getElementById('nombreJugador'),
  cancelSave: document.getElementById('cancelarGuardar'),
};

const state = {
  currentPanelId: 'panel_inicio',
  board: null,
  difficultyKey: null,
  timerId: null,
  seconds: 0,
  isGameOver: true,
  currentPoints: 0,
};

function showPanel(panelId) {
  if (state.currentPanelId === 'panel_partida' && panelId !== 'panel_partida') {
    leaveGame();
  }

  for (const panel of elements.panels) {
    panel.classList.toggle('hidden', panel.id !== panelId);
  }

  state.currentPanelId = panelId;

  if (panelId === 'panel_puntuaciones') {
    renderScores(elements.scores);
  }
}

function updateTimerDisplay() {
  elements.timer.textContent = String(state.seconds);
}

function updateMinesDisplay() {
  const minesLeft = state.board ? state.board.mines - state.board.flaggedCount : 0;
  elements.mines.textContent = String(Math.max(0, minesLeft));
}

function startTimer() {
  stopTimer();
  state.timerId = window.setInterval(() => {
    state.seconds += 1;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (state.timerId !== null) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function resetTimer() {
  state.seconds = 0;
  updateTimerDisplay();
}

function setFace(value) {
  elements.face.textContent = value;
}

function leaveGame() {
  stopTimer();
  resetTimer();
  state.board = null;
  state.isGameOver = true;
  state.currentPoints = 0;
  setFace('🙂');
  updateMinesDisplay();
  elements.status.textContent = 'Partida detenida. Elige una dificultad para volver a jugar.';
}

function createCellButton(cell) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'cell';
  button.dataset.row = String(cell.row);
  button.dataset.column = String(cell.column);
  button.setAttribute('role', 'gridcell');
  button.setAttribute('aria-label', `Fila ${cell.row + 1}, columna ${cell.column + 1}`);
  paintCell(button, cell);
  return button;
}

function paintCell(button, cell) {
  button.className = 'cell';
  button.textContent = '';

  if (cell.isFlagged) {
    button.classList.add('cell--flagged');
    button.textContent = '🚩';
    return;
  }

  if (!cell.isRevealed) {
    return;
  }

  button.classList.add('cell--revealed');

  if (cell.isMine) {
    button.classList.add('cell--mine');
    button.textContent = '💣';
    return;
  }

  if (cell.neighborMines === 0) {
    button.classList.add('cell--empty');
    button.textContent = '·';
    return;
  }

  button.classList.add(`cell--n${cell.neighborMines}`);
  button.textContent = String(cell.neighborMines);
}

function renderBoard() {
  elements.board.innerHTML = '';

  if (!state.board) {
    return;
  }

  elements.board.style.gridTemplateColumns = `repeat(${state.board.columns}, var(--cell-size))`;

  for (const row of state.board.grid) {
    for (const cell of row) {
      elements.board.append(createCellButton(cell));
    }
  }

  updateMinesDisplay();
}

function getButtonFromCell(cell) {
  return elements.board.querySelector(`[data-row="${cell.row}"][data-column="${cell.column}"]`);
}

function revealMines(mines, explodedCell = null) {
  for (const mine of mines) {
    const button = getButtonFromCell(mine);
    if (!button) {
      continue;
    }
    mine.isRevealed = true;
    paintCell(button, mine);
  }

  if (explodedCell) {
    const explodedButton = getButtonFromCell(explodedCell);
    if (explodedButton) {
      explodedButton.classList.add('cell--exploded');
    }
  }
}

function startGame(difficultyKey) {
  const settings = DIFFICULTIES[difficultyKey];
  state.board = new MinesweeperBoard(settings.rows, settings.columns, settings.mines);
  state.difficultyKey = difficultyKey;
  state.isGameOver = false;
  state.currentPoints = 0;
  elements.title.textContent = `Partida ${settings.label}`;
  elements.status.textContent = 'Partida en curso. ¡Suerte!';
  showPanel('panel_partida');
  renderBoard();
  resetTimer();
  startTimer();
  setFace('🙂');
}

function handleReveal(row, column) {
  if (!state.board || state.isGameOver) {
    return;
  }

  const result = state.board.revealCell(row, column);

  if (result.type === 'ignored') {
    return;
  }

  if (result.revealedCells) {
    for (const cell of result.revealedCells) {
      const button = getButtonFromCell(cell);
      if (button) {
        paintCell(button, cell);
      }
    }
  }

  if (result.type === 'mine') {
    stopTimer();
    state.isGameOver = true;
    elements.status.textContent = 'Has perdido. Has pulsado una mina.';
    setFace('😵');
    revealMines(result.mines, result.explodedCell);
    return;
  }

  if (result.type === 'win') {
    stopTimer();
    state.isGameOver = true;
    setFace('😎');
    revealMines(result.mines);
    state.currentPoints = calculatePoints({
      rows: state.board.rows,
      columns: state.board.columns,
      mines: state.board.mines,
      seconds: state.seconds,
    });
    elements.status.textContent = `¡Has ganado! Puntuación: ${state.currentPoints}`;
    elements.playerName.value = '';
    elements.scoreDialog.showModal();
  }
}

function handleFlag(row, column) {
  if (!state.board || state.isGameOver) {
    return;
  }

  const result = state.board.toggleFlag(row, column);
  if (!result) {
    return;
  }

  const button = getButtonFromCell(result.cell);
  if (button) {
    paintCell(button, result.cell);
  }

  updateMinesDisplay();
}

function handleBoardClick(event) {
  const cellButton = event.target.closest('.cell');
  if (!cellButton) {
    return;
  }

  const row = Number(cellButton.dataset.row);
  const column = Number(cellButton.dataset.column);
  handleReveal(row, column);
}

function handleBoardContextMenu(event) {
  const cellButton = event.target.closest('.cell');
  if (!cellButton) {
    return;
  }

  event.preventDefault();
  const row = Number(cellButton.dataset.row);
  const column = Number(cellButton.dataset.column);
  handleFlag(row, column);
}

function bindMenuEvents() {
  for (const button of elements.menuButtons) {
    button.addEventListener('click', () => {
      const difficultyKey = button.dataset.difficulty;
      if (difficultyKey) {
        startGame(difficultyKey);
        return;
      }
      showPanel(button.dataset.panel);
    });
  }
}

function bindBoardEvents() {
  elements.board.addEventListener('click', handleBoardClick);
  elements.board.addEventListener('contextmenu', handleBoardContextMenu);
}

function bindScoreEvents() {
  elements.clearScores.addEventListener('click', () => {
    clearScores();
    renderScores(elements.scores);
  });

  elements.cancelSave.addEventListener('click', () => {
    elements.scoreDialog.close();
  });

  elements.scoreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const playerName = elements.playerName.value.trim() || 'Anónimo';
    const settings = DIFFICULTIES[state.difficultyKey];

    saveScore({
      name: playerName,
      difficultyLabel: settings.label,
      points: state.currentPoints,
      seconds: state.seconds,
      date: new Date().toISOString(),
    });

    elements.scoreDialog.close();
    renderScores(elements.scores);
    showPanel('panel_puntuaciones');
  });
}

function bindFaceButton() {
  elements.face.addEventListener('click', () => {
    if (state.difficultyKey) {
      startGame(state.difficultyKey);
    } else {
      showPanel('panel_inicio');
    }
  });
}

const navbarCollapse = document.querySelector('#navbarBuscaminas');

document.querySelectorAll('.navbar-nav button').forEach(btn => {

  btn.addEventListener('click', () => {

    const collapse = bootstrap.Collapse.getInstance(navbarCollapse);

    if (collapse) {
      collapse.hide();
    }

  });

});

function init() {
  bindMenuEvents();
  bindBoardEvents();
  bindScoreEvents();
  bindFaceButton();
  renderScores(elements.scores);
  showPanel('panel_inicio');
  resetTimer();
  updateMinesDisplay();
}

init();
