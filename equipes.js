// equipes.js
const equipesKey = 'smarTargetEquipes';
document.getElementById('equipeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('equipeName').value.trim();
  const area = document.getElementById('equipeAreaSelect').value;
  if (!name || !area) { alert('Preencha nome e área'); return; }
  const eqs = JSON.parse(localStorage.getItem(equipesKey) || '[]');
  eqs.push({name, area});
  localStorage.setItem(equipesKey, JSON.stringify(eqs));
  loadEquipes();
});
function loadEquipes() {
  const list = document.getElementById('equipesList');
  list.innerHTML = '';
  const eqs = JSON.parse(localStorage.getItem(equipesKey) || '[]');
  eqs.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.name} – ${e.area}`;
    list.appendChild(li);
  });
}
window.addEventListener('DOMContentLoaded', () => {
  loadEquipes();
});
