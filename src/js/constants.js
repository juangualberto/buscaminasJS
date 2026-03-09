export const DIFFICULTIES = {
  facil: { rows: 5, columns: 5, mines: 3, panelId: 'panel_partida_facil', label: 'Fácil' },
  medio: { rows: 8, columns: 8, mines: 10, panelId: 'panel_partida_medio', label: 'Normal' },
  dificil: { rows: 10, columns: 10, mines: 18, panelId: 'panel_partida_dificil', label: 'Pesadilla' },
};

export const STORAGE_KEY = 'buscaminas.puntuaciones';

export const FACE_CLASSES = {
  ready: 'caraFeliz',
  playing: 'caraBanderita',
  won: 'caraGanar',
  lost: 'caraPerder',
};

export const CELL_CLASS_BY_VALUE = {
  0: 'nothingCell',
  1: 'oneCell',
  2: 'twoCell',
  3: 'threeCell',
  4: 'fourCell',
  5: 'fiveCell',
  6: 'sixCell',
  7: 'sevenCell',
  8: 'eightCell',
};

export const GAME_STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};