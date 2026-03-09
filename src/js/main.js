import GameController from './game-controller.js';
import ScoreRepository from './score-repository.js';
import { DIFFICULTIES } from './constants.js';

function closeNavbarOnClick() {
  const navbar = document.querySelector('.navbar-collapse');
  if (!navbar || !window.bootstrap?.Collapse) {
    return;
  }

  const menus = document.querySelectorAll('.navbar-nav a');
  for (const menu of menus) {
    menu.addEventListener('click', () => {
      if (!menu.classList.contains('dropdown-toggle')) {
        const collapse = window.bootstrap.Collapse.getOrCreateInstance(navbar);
        collapse.hide();
      }
    });
  }
}

function getRequiredElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`No se encontró el elemento ${selector}`);
  }
  return element;
}

document.addEventListener('DOMContentLoaded', () => {
  closeNavbarOnClick();

  controller.init('panel_inicio');

  const game = new GameController({
    timerElement: getRequiredElement('#reloj'),
    minesElement: getRequiredElement('#minas'),
    faceElement: getRequiredElement('#carita'),
    scorePanelElement: getRequiredElement('#panel_puntuaciones'),
    winModalElement: document.querySelector('#modalGanar'),
    scoreRepository: new ScoreRepository(),
  });

  const controller = new PanelRouter({
    onLeaveGame: () => game.leaveGame()
  });

  game.renderScoreboard();

  const difficultyMenuMap = {
    '#menu_partida_facil': DIFFICULTIES.facil,
    '#menu_partida_medio': DIFFICULTIES.medio,
    '#menu_partida_dificil': DIFFICULTIES.dificil,
  };

  for (const [selector, config] of Object.entries(difficultyMenuMap)) {
    const menu = getRequiredElement(selector);
    menu.addEventListener('click', (event) => {
      event.preventDefault();
      controller.activate(config.panelId);
      game.setBoardMount(getRequiredElement(`#${config.panelId}`));
      game.startGame(config);
    });
  }

  getRequiredElement('#carita').addEventListener('click', () => {
    game.restartCurrentGame();
  });

  document.addEventListener('click', (event) => {
    const cell = event.target.closest('.ms-cell');
    if (!cell) {
      return;
    }
    game.revealFromElement(cell);
  });

  document.addEventListener('contextmenu', (event) => {
    const cell = event.target.closest('.ms-cell');
    if (!cell) {
      return;
    }
    event.preventDefault();
    game.toggleFlagFromElement(cell);
  });

  const saveButton = document.querySelector('#salvarPuntos');
  const playerNameInput = document.querySelector('#nombreJugador');

  if (saveButton && playerNameInput) {
    saveButton.addEventListener('click', () => {
      game.saveCurrentScore(playerNameInput.value);
      controller.activate('panel_puntuaciones');
    });
  }


  window.addEventListener('beforeunload', () => game.destroy());
});