// areas.js
const areasKey = 'smarTargetAreas';
function loadAreas() {
  const list = document.getElementById('areasList');
  list.innerHTML = '';
  const areas = JSON.parse(localStorage.getItem(areasKey) || '[]');
  areas.forEach((a,i) => {
    const li = document.createElement('li');
    li.textContent = a;
    list.appendChild(li);
  });
}
document.getElementById('areaSelect').addEventListener('change', function() {
  if (this.value === 'Outros') {
    document.getElementById('customAreaDiv').style.display = 'block';
  } else {
    document.getElementById('customAreaDiv').style.display = 'none';
  }
});
document.getElementById('areaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let area = document.getElementById('areaSelect').value;
  if (area === 'Outros') {
    area = document.getElementById('customArea').value.trim();
    if (!area) { alert('Informe o nome da nova área'); return; }
  }
  const areas = JSON.parse(localStorage.getItem(areasKey) || '[]');
  if (!areas.includes(area)) {
    areas.push(area);
    localStorage.setItem(areasKey, JSON.stringify(areas));
    loadAreas();
    atualizarEquipeAreas();
  } else {
    alert('Área já cadastrada');
  }
});
function atualizarEquipeAreas() {
  const sel = document.getElementById('equipeAreaSelect');
  if (!sel) return;
  const areas = JSON.parse(localStorage.getItem(areasKey) || '[]');
  sel.innerHTML = '';
  areas.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a; opt.textContent = a;
    sel.appendChild(opt);
  });
}
window.addEventListener('DOMContentLoaded', () => {
  loadAreas();
  atualizarEquipeAreas();
});
