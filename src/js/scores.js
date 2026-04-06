
const STORAGE_KEY = 'buscaminas_scores_v2026';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function loadScores() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    const parsedValue = JSON.parse(rawValue || '[]');
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function saveScore(score) {
  const scores = loadScores();
  scores.push(score);
  scores.sort((left, right) => right.points - left.points || left.seconds - right.seconds);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 10)));
}

export function clearScores() {
  localStorage.removeItem(STORAGE_KEY);
}

export function calculatePoints({ rows, columns, mines, seconds }) {
  const safeSeconds = Math.max(1, seconds);
  return Math.round((rows * columns * mines * 100) / safeSeconds);
}

export function renderScores(container) {
  const scores = loadScores();

  if (scores.length === 0) {
    container.innerHTML = '<p>Todavía no hay puntuaciones guardadas.</p>';
    return;
  }

  const rows = scores.map((score, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(score.name)}</td>
      <td>${escapeHtml(score.difficultyLabel)}</td>
      <td>${score.points}</td>
      <td>${score.seconds}</td>
      <td>${escapeHtml(new Date(score.date).toLocaleString('es-ES'))}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <table class="score-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Dificultad</th>
          <th>Puntos</th>
          <th>Tiempo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}
