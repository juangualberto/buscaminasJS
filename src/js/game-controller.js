import BoardModel from './board-model.js';
import BoardRenderer from './board-renderer.js';
import { FACE_CLASSES, GAME_STATUS } from './constants.js';

function calculateScore({ rows, columns, mines, seconds }) {
  const safeSeconds = Math.max(seconds, 1);
  const densityFactor = mines / (rows * columns);
  const rawScore = ((rows * columns) * densityFactor * 10000) / safeSeconds;
  return Math.max(1, Math.floor(rawScore));
}

export default class GameController {
  constructor({
    timerElement,
    minesElement,
    faceElement,
    scorePanelElement,
    winModalElement,
    scoreRepository,
  }) {
    this.timerElement = timerElement;
    this.minesElement = minesElement;
    this.faceElement = faceElement;
    this.scorePanelElement = scorePanelElement;
    this.winModalElement = winModalElement;
    this.scoreRepository = scoreRepository;

    this.boardMount = null;
    this.renderer = null;
    this.board = null;
    this.status = GAME_STATUS.READY;
    this.timerId = null;
    this.elapsedSeconds = 0;
    this.currentConfig = null;
    this.currentPanelId = null;
    this.lastScore = null;
    this.winModal = this.#createModal(winModalElement);
  }

  setBoardMount(container) {
    this.boardMount = container;
    this.renderer = new BoardRenderer(container);
  }

  startGame(config) {
    if (!this.boardMount) {
      throw new Error('No se ha configurado el contenedor del tablero');
    }

    this.currentConfig = { ...config };
    this.currentPanelId = config.panelId;
    this.board = new BoardModel(config.rows, config.columns, config.mines);
    this.elapsedSeconds = 0;
    this.status = GAME_STATUS.PLAYING;
    this.lastScore = null;

    this.#render();
    this.#updateFace(FACE_CLASSES.playing);
    this.#startTimer();
  }

  restartCurrentGame() {
    if (!this.currentConfig) {
      return;
    }

    this.startGame(this.currentConfig);
  }

  revealFromElement(element) {
    if (!this.#isInteractive()) {
      return;
    }

    const position = this.#extractPosition(element);
    if (!position) {
      return;
    }

    const result = this.board.revealCell(position.row, position.column);

    if (result.type === 'noop') {
      return;
    }

    if (result.type === 'mine') {
      this.status = GAME_STATUS.LOST;
      this.board.revealAll();
      this.#stopTimer();
      this.#updateFace(FACE_CLASSES.lost);
      this.#render({ exploded: position });
      return;
    }

    if (this.board.hiddenSafeCells() === 0) {
      this.status = GAME_STATUS.WON;
      this.board.revealAll();
      this.#stopTimer();
      this.#updateFace(FACE_CLASSES.won);
      this.lastScore = this.#buildScore();
      this.#render();
      this.#fillWinModal();
      this.winModal?.show();
      return;
    }

    this.#render();
  }

  toggleFlagFromElement(element) {
    if (!this.#isInteractive()) {
      return;
    }

    const position = this.#extractPosition(element);
    if (!position) {
      return;
    }

    this.board.toggleFlag(position.row, position.column);
    this.#render();
  }

  saveCurrentScore(playerName) {
    if (!this.lastScore) {
      return;
    }

    const normalizedName = playerName.trim() || 'Anónimo';
    this.scoreRepository.save({
      ...this.lastScore,
      name: normalizedName,
    });
    this.renderScoreboard();
  }

  renderScoreboard() {
    const markup = this.scoreRepository.renderTable();
    this.scorePanelElement.innerHTML = markup;
    const listElement = document.querySelector('#listaJugadores');
    if (listElement) {
      listElement.innerHTML = markup;
    }
  }

  destroy() {
    this.#stopTimer();
  }

  #isInteractive() {
    return this.status === GAME_STATUS.PLAYING && this.board;
  }

  #extractPosition(element) {
    const button = element.closest('[data-row][data-column]');
    if (!button) {
      return null;
    }

    return {
      row: Number(button.dataset.row),
      column: Number(button.dataset.column),
    };
  }

  #buildScore() {
    return {
      rows: this.currentConfig.rows,
      columns: this.currentConfig.columns,
      mines: this.currentConfig.mines,
      seconds: this.elapsedSeconds,
      points: calculateScore({
        rows: this.currentConfig.rows,
        columns: this.currentConfig.columns,
        mines: this.currentConfig.mines,
        seconds: this.elapsedSeconds,
      }),
      savedAt: new Date().toISOString(),
    };
  }

  #fillWinModal() {
    if (!this.lastScore) {
      return;
    }

    const pointsElement = document.querySelector('#puntosJugador');
    const timeElement = document.querySelector('#tiempoJugador');
    const nameInput = document.querySelector('#nombreJugador');

    if (pointsElement) {
      pointsElement.textContent = String(this.lastScore.points);
    }
    if (timeElement) {
      timeElement.textContent = `${this.lastScore.seconds}s`;
    }
    if (nameInput) {
      nameInput.value = '';
      nameInput.focus();
    }
  }

  #render() {
    this.renderer.render(this.board);
    this.#renderExplodedMine();
    this.#updateHud();
  }

  #renderExplodedMine() {
    if (this.status !== GAME_STATUS.LOST) {
      return;
    }

    const buttons = this.boardMount.querySelectorAll('[data-row][data-column]');
    for (const button of buttons) {
      const row = Number(button.dataset.row);
      const column = Number(button.dataset.column);
      const cell = this.board.getCell(row, column);

      if (cell.hasMine) {
        button.className = `ms-cell ${cell.isFlagged ? 'bombaAnulada' : 'bomba'}`;
      }
    }
  }

  #updateHud() {
    const remainingMines = Math.max(this.currentConfig.mines - this.board.countFlags(), 0);
    this.minesElement.textContent = String(remainingMines);
    this.timerElement.textContent = String(this.elapsedSeconds);
  }

  #updateFace(faceClass) {
    this.faceElement.className = faceClass;
  }

  #startTimer() {
    this.#stopTimer();
    this.timerId = window.setInterval(() => {
      this.elapsedSeconds += 1;
      this.timerElement.textContent = String(this.elapsedSeconds);
    }, 1000);
  }

  #stopTimer() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  updateTimerDisplay(seconds = this.elapsedSeconds) {
    if (this.timerElement) {
      this.timerElement.textContent = String(seconds);
    }
  }

  resetTimer() {
    this.elapsedSeconds = 0;
    this.updateTimerDisplay(0);
  }


  leaveGame() {
    this.#stopTimer();
    this.resetTimer();
  }

  #createModal(element) {
    if (!element || !window.bootstrap?.Modal) {
      return null;
    }

    return window.bootstrap.Modal.getOrCreateInstance(element);
  }
}

export { calculateScore };
