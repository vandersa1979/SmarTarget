// usuarios.js
const usersKey = 'smarTargetUsers';
function loadUsuarios() {
  const list = document.getElementById('usuariosList');
  list.innerHTML = '';
  const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.nome} – ${u.email} [${u.profile}] (${u.company})`;
    list.appendChild(li);
  });
}
document.getElementById('usuarioForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('usuarioNome').value.trim();
  const email = document.getElementById('usuarioEmail').value.trim();
  const password = document.getElementById('usuarioPassword').value;
  const profile = document.getElementById('usuarioProfile').value;
  const company = document.getElementById('usuarioCompany').value.trim();
  if (!nome || !email || !password || !company) { alert('Preencha todos os campos'); return; }
  const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
  if (users.find(u => u.email === email)) { alert('E-mail já cadastrado'); return; }
  users.push({nome, email, password, profile, company});
  localStorage.setItem(usersKey, JSON.stringify(users));
  loadUsuarios();
  this.reset();
});
window.addEventListener('DOMContentLoaded', () => {
  loadUsuarios();
});
