
import './styles.css';
import { setupContrast, setupMobileMenu } from './js/accessibility.js';
import { setupVolunteerForm } from './js/form.js';
import { homeView, notFoundView, projectsView, volunteerView } from './js/views.js';

const main = document.getElementById('conteudo-principal');

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = hash.split('?');
  return { path, params: new URLSearchParams(queryString) };
}

function updateActiveNav(path) {
  document.querySelectorAll('[data-route]').forEach(link => {
    if (link.dataset.route === path) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function render() {
  const { path, params } = getRoute();

  if (path === '/') {
    main.innerHTML = homeView();
    document.title = 'ConectaAção | Início';
  } else if (path === '/projetos') {
    main.innerHTML = projectsView();
    document.title = 'Projetos | ConectaAção';
  } else if (path === '/voluntariado') {
    main.innerHTML = volunteerView(params.get('projeto') ?? '');
    document.title = 'Voluntariado | ConectaAção';
    setupVolunteerForm();
  } else {
    main.innerHTML = notFoundView();
    document.title = 'Página não encontrada | ConectaAção';
  }

  updateActiveNav(path);
  main.focus();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

setupContrast();
setupMobileMenu();
window.addEventListener('hashchange', render);
render();
