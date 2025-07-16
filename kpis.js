// kpis.js
const kpisKey = 'smarTargetKPIs';
function loadKPIs() {
  const list = document.getElementById('kpisList');
  list.innerHTML = '';
  const kpis = JSON.parse(localStorage.getItem(kpisKey) || '[]');
  kpis.forEach(k => {
    const status = k.realizado >= k.target ? '✅' : '❌';
    const li = document.createElement('li');
    li.textContent = `${status} ${k.name} [${k.okr}] - ${k.realizado}/${k.target} (${k.freq})`;
    list.appendChild(li);
  });
}
function populateKPIOKR() {
  const sel = document.getElementById('kpiOKR');
  sel.innerHTML = '';
  const okrs = JSON.parse(localStorage.getItem('smarTargetOKRs') || '[]');
  okrs.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o.desc;
    opt.textContent = `[${o.pilar}] ${o.desc}`;
    sel.appendChild(opt);
  });
}
document.getElementById('kpiForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('kpiName').value.trim();
  const formula = document.getElementById('kpiFormula').value.trim();
  const resp = document.getElementById('kpiResp').value.trim();
  const freq = document.getElementById('kpiFreq').value.trim();
  const okr = document.getElementById('kpiOKR').value;
  const target = parseFloat(document.getElementById('kpiTarget').value);
  const real = parseFloat(document.getElementById('kpiReal').value);
  if (!name||!formula||!resp||!freq||!okr) { alert('Preencha todos os campos'); return; }
  const kpis = JSON.parse(localStorage.getItem(kpisKey) || '[]');
  kpis.push({name, formula, resp, freq, okr, target, real});
  localStorage.setItem(kpisKey, JSON.stringify(kpis));
  loadKPIs();
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => {
  populateKPIOKR();
  loadKPIs();
});
