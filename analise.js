// analise.js
function buildTree() {
  const okrList = JSON.parse(localStorage.getItem('smarTargetOKRs') || '[]');
  const kpiList = JSON.parse(localStorage.getItem('smarTargetKPIs') || '[]');
  const container = document.getElementById('treeView');
  container.innerHTML = '';
  okrList.forEach(o => {
    const okrDiv = document.createElement('div');
    okrDiv.innerHTML = `<strong>[${o.pilar}] ${o.desc}</strong>`;
    const ul = document.createElement('ul');
    kpiList.filter(k=>k.okr===o.desc).forEach(k=>{
      const li = document.createElement('li');
      const status = k.real>=k.target?'✅':'❌';
      li.textContent = `${status} ${k.name} (${k.real}/${k.target}) - ${k.resp}`;
      ul.appendChild(li);
    });
    okrDiv.appendChild(ul);
    container.appendChild(okrDiv);
  });
}
window.addEventListener('DOMContentLoaded', buildTree);
