// dashboard.js
function loadAdminDashboard() {
  const pendentes = document.getElementById('pendentesList');
  const status = document.getElementById('statusKPIs');
  pendentes.innerHTML = '';
  status.innerHTML = '';
  const users = JSON.parse(localStorage.getItem('smarTargetUsers') || '[]');
  const okrs = JSON.parse(localStorage.getItem('smarTargetOKRs') || '[]');
  const kpis = JSON.parse(localStorage.getItem('smarTargetKPIs') || '[]');
  // Colaboradores sem OKRs
  users.filter(u=>u.profile==='Colaborador').forEach(u=>{
    const hasOKR = okrs.some(o=>o.profile===u.email); // currently OKRs have no profile, skip
    if (!hasOKR) {
      const li = document.createElement('li');
      li.textContent = `${u.nome} (${u.email})`;
      pendentes.appendChild(li);
    }
  });
  // Status KPIs overall
  const total = kpis.length;
  const done = kpis.filter(k=>k.real>=k.target).length;
  const li = document.createElement('li');
  li.textContent = `KPIs concluídos: ${done} de ${total}`;
  status.appendChild(li);
}
function loadColabDashboard() {
  const ul = document.getElementById('minhasKPIs');
  ul.innerHTML = '';
  const user = JSON.parse(sessionStorage.getItem('currentUser')||'null');
  const kpis = JSON.parse(localStorage.getItem('smarTargetKPIs') || '[]');
  kpis.filter(k=>k.resp===user.nome).forEach(k=>{
    const status = k.real>=k.target?'✅':'❌';
    const li = document.createElement('li');
    li.textContent = `${status} ${k.name} (${k.real}/${k.target})`;
    ul.appendChild(li);
  });
}
window.addEventListener('DOMContentLoaded', ()=>{
  const user = JSON.parse(sessionStorage.getItem('currentUser')||'null');
  if (!user) return;
  if (user.profile==='Admin') loadAdminDashboard();
  else loadColabDashboard();
});
