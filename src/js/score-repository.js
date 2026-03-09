import { STORAGE_KEY } from './constants.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export default class ScoreRepository {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  getAll() {
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      const scores = raw ? JSON.parse(raw) : [];
      return Array.isArray(scores)
        ? scores.toSorted((left, right) => right.points - left.points)
        : [];
    } catch {
      return [];
    }
  }

  save(score) {
    const scores = this.getAll();
    scores.push(score);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(scores.toSorted((left, right) => right.points - left.points)));
  }

  renderTable(limit = 20) {
    const rows = this.getAll()
      .slice(0, limit)
      .map((score, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(score.name)}</td>
          <td>${score.points}</td>
          <td>${score.seconds}s</td>
          <td>${score.rows}x${score.columns}</td>
          <td>${score.mines}</td>
        </tr>
      `)
      .join('');

    return `
      <table class="table marcadores">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Puntos</th>
            <th>Tiempo</th>
            <th>Tablero</th>
            <th>Minas</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Todavía no hay puntuaciones.</td></tr>'}</tbody>
      </table>
    `;
  }
}