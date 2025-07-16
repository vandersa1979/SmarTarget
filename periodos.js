// periodos.js
const periodosKey = 'smarTargetPeriodos';
function loadPeriodos() {
  const list = document.getElementById('periodosList');
  list.innerHTML = '';
  const periodos = JSON.parse(localStorage.getItem(periodosKey) || '[]');
  periodos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nome} (${p.inicio} → ${p.fim})`;
    list.appendChild(li);
  });
}
document.getElementById('periodoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('periodoNome').value.trim();
  const inicio = document.getElementById('periodoInicio').value;
  const fim = document.getElementById('periodoFim').value;
  if (!nome||!inicio||!fim) { alert('Preencha todos os campos'); return; }
  const periodos = JSON.parse(localStorage.getItem(periodosKey) || '[]');
  periodos.push({nome, inicio, fim});
  localStorage.setItem(periodosKey, JSON.stringify(periodos));
  loadPeriodos();
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => loadPeriodos());
