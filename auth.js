
// auth.js - Autenticação e autorização
const usersKey = 'smarTargetUsers';
(function initUsers() {
  if (!localStorage.getItem(usersKey)) {
    const defaultUsers = [{
      email: 'admin@admin.com',
      password: 'admin',
      profile: 'Admin',
      company: '*'
    }];
    localStorage.setItem(usersKey, JSON.stringify(defaultUsers));
  }
})();

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    if (user.profile === 'Admin') window.location.href = 'admin-dashboard.html';
    else window.location.href = 'colaborador-dashboard.html';
  } else {
    alert('Credenciais inválidas');
  }
}

function checkAuth() {
  const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}

function renderMenu() {
  const user = checkAuth();
  if (!user) return;
  const menuItems = [
    {name:'Empresas e Filiais',href:'empresas.html'},
    {name:'Áreas',href:'areas.html'},
    {name:'Equipes',href:'equipes.html'},
    {name:'Cargos',href:'cargos.html'},
    {name:'Usuários',href:'usuarios.html'},
    {name:'Períodos de Avaliação',href:'periodos.html'},
    {name:'OKRs',href:'okrs.html'},
    {name:'KPIs',href:'kpis.html'},
    {name:'Análise',href:'analise.html'},
    {name:'Dashboard',href:user.profile === 'Admin' ? 'admin-dashboard.html' : 'colaborador-dashboard.html'}
  ];
  let html = '<ul class="menu">';
  menuItems.forEach(mi => {
    if ((mi.name === 'OKRs' || mi.name === 'KPIs') && user.profile !== 'Admin') return;
    html += `<li><a href="${mi.href}">${mi.name}</a></li>`;
  });
  html += '</ul>';
  document.getElementById('menu').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('menu')) renderMenu();
});
