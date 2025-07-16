// okrs.js
const okrsKey = 'smarTargetOKRs';
function loadOKRs() {
  const list = document.getElementById('okrsList');
  list.innerHTML = '';
  const okrs = JSON.parse(localStorage.getItem(okrsKey) || '[]');
  okrs.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `[${o.pilar}] ${o.desc} (${o.periodo})`;
    list.appendChild(li);
  });
}
function populateOKRSelects() {
  const pilarSel = document.getElementById('okrPilar');
  pilarSel.innerHTML = '';
  ['Comercial','Financeiro','Operação','RH','Tecnologia','Administração'].forEach(p => {
    const opt = document.createElement('option'); opt.value = p; opt.textContent = p; pilarSel.appendChild(opt);
  });
  const perSel = document.getElementById('okrPeriodo');
  perSel.innerHTML = '';
  const periodos = JSON.parse(localStorage.getItem('smarTargetPeriodos') || '[]');
  periodos.forEach(p => {
    const opt = document.createElement('option'); opt.value = p.nome; opt.textContent = p.nome; perSel.appendChild(opt);
  });
}
document.getElementById('okrForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const pilar = document.getElementById('okrPilar').value;
  const desc = document.getElementById('okrDesc').value.trim();
  const periodo = document.getElementById('okrPeriodo').value;
  if (!pilar||!desc||!periodo) { alert('Preencha todos os campos'); return; }
  const okrs = JSON.parse(localStorage.getItem(okrsKey) || '[]');
  okrs.push({pilar, desc, periodo});
  localStorage.setItem(okrsKey, JSON.stringify(okrs));
  loadOKRs();
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => {
  populateOKRSelects();
  loadOKRs();
});
