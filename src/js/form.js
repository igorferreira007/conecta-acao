
import { projects } from './data.js';
import { clearRegistrations, getRegistrations, saveRegistration } from './storage.js';

function setError(field, message) {
  const error = document.getElementById(`${field.id}-error`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) error.textContent = message;
}

function validate(form) {
  let valid = true;
  const nome = form.elements.nome;
  const email = form.elements.email;
  const projeto = form.elements.projeto;

  if (nome.value.trim().length < 3) {
    setError(nome, 'Informe um nome com pelo menos 3 caracteres.');
    valid = false;
  } else {
    setError(nome, '');
  }

  if (!email.validity.valid) {
    setError(email, 'Informe um endereço de e-mail válido.');
    valid = false;
  } else {
    setError(email, '');
  }

  if (!projeto.value) {
    setError(projeto, 'Selecione um projeto.');
    valid = false;
  } else {
    setError(projeto, '');
  }

  return valid;
}

function renderRecentRegistrations() {
  const container = document.getElementById('registrations-container');
  if (!container) return;

  const items = getRegistrations();
  if (!items.length) {
    container.innerHTML = '<p class="empty-state">Nenhum cadastro foi salvo neste navegador.</p>';
    return;
  }

  container.innerHTML = `
    <ul class="registrations" aria-label="Cadastros salvos">
      ${items.slice(-3).reverse().map(item => `
        <li>
          <strong>${item.nome}</strong><br />
          <span>${item.projetoLabel}</span>
        </li>
      `).join('')}
    </ul>
  `;
}

export function setupVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  const clearButton = document.getElementById('clear-registrations');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!validate(form)) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        return;
      }

      const data = new FormData(form);
      const project = projects.find(item => item.id === data.get('projeto'));

      saveRegistration({
        nome: data.get('nome').trim(),
        email: data.get('email').trim(),
        projeto: data.get('projeto'),
        projetoLabel: project?.title ?? data.get('projeto'),
        mensagem: data.get('mensagem').trim(),
        createdAt: new Date().toISOString()
      });

      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(field => {
        field.setAttribute('aria-invalid', 'false');
      });

      const status = document.getElementById('form-status');
      status.innerHTML = '<p class="success-box">Cadastro salvo com sucesso neste navegador.</p>';
      renderRecentRegistrations();
      status.focus?.();
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      clearRegistrations();
      renderRecentRegistrations();
      const status = document.getElementById('form-status');
      if (status) {
        status.innerHTML = '<p class="success-box">Cadastros locais removidos.</p>';
      }
    });
  }
}
