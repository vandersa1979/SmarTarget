// cargos.js
const cargosKey = 'smarTargetCargos';
function loadCargos() {
  const list = document.getElementById('cargosList');
  list.innerHTML = '';
  const cargos = JSON.parse(localStorage.getItem(cargosKey) || '[]');
  cargos.forEach((c,i) => {
    const li = document.createElement('li');
    li.textContent = `${c.titulo} – ${c.descricao} (${c.area})`;
    list.appendChild(li);
  });
}
function populateCargoArea() {
  const sel = document.getElementById('cargoAreaSelect');
  sel.innerHTML = '';
  const areas = JSON.parse(localStorage.getItem('smarTargetAreas') || '[]');
  areas.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a; opt.textContent = a;
    sel.appendChild(opt);
  });
}
document.getElementById('cargoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const titulo = document.getElementById('cargoTitulo').value.trim();
  const descricao = document.getElementById('cargoDesc').value.trim();
  const area = document.getElementById('cargoAreaSelect').value;
  if (!titulo || !descricao || !area) { alert('Preencha todos os campos'); return; }
  const cargos = JSON.parse(localStorage.getItem(cargosKey) || '[]');
  cargos.push({titulo, descricao, area});
  localStorage.setItem(cargosKey, JSON.stringify(cargos));
  loadCargos();
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => {
  populateCargoArea();
  loadCargos();
});
