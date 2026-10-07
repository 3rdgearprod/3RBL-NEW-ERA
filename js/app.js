const TOTAL_SEASONS = 14;
const stage = document.getElementById('season-stage');

function setActiveSeason(season) {
  document.querySelectorAll('.season-pick').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.season) === season);
  });
}

async function loadSeason(season, updateHash = true) {
  season = Number(season);
  if (!Number.isInteger(season) || season < 1 || season > TOTAL_SEASONS) return;

  setActiveSeason(season);
  stage.innerHTML = `<div class="season-loading">LOADING SEASON ${season}…</div>`;

  try {
    const response = await fetch(`seasons/season-${String(season).padStart(2,'0')}.html`, {cache:'no-store'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    stage.innerHTML = await response.text();
    initializeSeasonTabs(season);
    if (updateHash) history.replaceState(null, '', `#season-${season}`);
  } catch (error) {
    console.error(error);
    stage.innerHTML = `<div class="season-loading">COULD NOT LOAD SEASON ${season}. CHECK THE /seasons FOLDER.</div>`;
  }
}

function initializeSeasonTabs(season) {
  const card = document.getElementById(`s${season}`);
  if (!card) return;
  const buttons = card.querySelectorAll('.tab-btn');
  const tabs = card.querySelectorAll('.tab-content');
  buttons.forEach((btn, index) => btn.classList.toggle('active', index === 0));
  tabs.forEach((tab, index) => tab.classList.toggle('active', index === 0));
}

function showTab(season, tab, btn) {
  const card = document.getElementById(season);
  if (!card) return;
  card.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  card.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`${season}-${tab}`);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

function seasonFromHash() {
  const match = location.hash.match(/^#season-(\d+)$/i);
  return match ? Number(match[1]) : 14;
}

window.addEventListener('hashchange', () => {
  const season = seasonFromHash();
  if (season >= 1 && season <= TOTAL_SEASONS) loadSeason(season, false);
});

loadSeason(seasonFromHash(), false);
