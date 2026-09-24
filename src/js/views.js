import { projects } from "./data.js"
import { getRegistrations } from "./storage.js"

function projectCard(project) {
  return `
    <article class="card">
      <img
        src=""
        alt="${project.alt}"
        width="960"
        height="540"
        loading="lazy"
      />
      <div class="card-body">
        <span class="card-meta">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a class="btn" href="#/voluntariado?projeto=${project.id}">
          Quero participar
        </a>
      </div>
    </article>
  `
}

export function homeView() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Tecnologia com impacto social</p>
          <h1>Conectando pessoas a projetos que transformam comunidades.</h1>
          <p class="muted">
            Uma plataforma acadêmica para divulgação de iniciativas sociais e
            cadastro de pessoas voluntárias.
          </p>
          <div class="actions">
            <a class="btn" href="#/projetos">Conhecer projetos</a>
            <a href="#/voluntariado">Quero ser voluntário</a>
          </div>
        </div>

        <aside class="hero-card" aria-label="Recursos de acessibilidade disponíveis">
          <h2>Acessível por princípio</h2>
          <ul>
            <li>Navegação completa por teclado;</li>
            <li>modo de alto contraste;</li>
            <li>HTML semântico e suporte a leitores de tela;</li>
            <li>layout responsivo e redução de movimento.</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="section" aria-labelledby="destaques-title">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Destaques</p>
          <h2 id="destaques-title">Projetos em andamento</h2>
          <p class="muted">Conheça algumas iniciativas disponíveis para participação.</p>
        </div>

        <div class="cards">
          ${projects.map(projectCard).join("")}
        </div>

        <div class="stats" aria-label="Indicadores da plataforma">
          <div class="stat"><strong>3</strong><span>projetos ativos</span></div>
          <div class="stat"><strong>100%</strong><span>responsivo</span></div>
          <div class="stat"><strong>AA</strong><span>meta WCAG 2.1</span></div>
        </div>
      </div>
    </section>
  `
}

export function projectsView() {
  return `
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Projetos sociais</p>
          <h1>Encontre uma iniciativa para apoiar</h1>
          <p class="muted">
            Os cards abaixo apresentam oportunidades de participação em diferentes áreas.
          </p>
        </div>

        <div class="cards">
          ${projects.map(projectCard).join("")}
        </div>
      </div>
    </section>
  `
}

function registrationsList() {
  const items = getRegistrations()
  if (!items.length) {
    return `<p class="empty-state">Nenhum cadastro foi salvo neste navegador.</p>`
  }

  return `
    <ul class="registrations" aria-label="Cadastros salvos">
      ${items
        .slice(-3)
        .reverse()
        .map(
          (item) => `
        <li>
          <strong>${item.nome}</strong><br />
          <span>${item.projetoLabel}</span>
        </li>
      `,
        )
        .join("")}
    </ul>
  `
}

export function volunteerView(selectedProject = "") {
  const projectOptions = projects
    .map(
      (project) => `
    <option value="${project.id}" ${project.id === selectedProject ? "selected" : ""}>
      ${project.title}
    </option>
  `,
    )
    .join("")

  return `
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Voluntariado</p>
          <h1>Cadastre seu interesse</h1>
          <p class="muted">
            Preencha os campos obrigatórios. As informações deste projeto acadêmico são
            armazenadas somente no seu navegador.
          </p>
        </div>

        <div class="form-layout">
          <form id="volunteer-form" class="form-card" novalidate>
            <fieldset>
              <legend>Informações pessoais</legend>

              <div class="form-group">
                <label for="nome">Nome completo *</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autocomplete="name"
                  required
                  aria-describedby="nome-help nome-error"
                />
                <div id="nome-help" class="help-text">Digite pelo menos 3 caracteres.</div>
                <div id="nome-error" class="error-text" role="alert"></div>
              </div>

              <div class="form-group">
                <label for="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  aria-describedby="email-help email-error"
                />
                <div id="email-help" class="help-text">Usaremos apenas para demonstrar a validação.</div>
                <div id="email-error" class="error-text" role="alert"></div>
              </div>

              <div class="form-group">
                <label for="projeto">Projeto de interesse *</label>
                <select id="projeto" name="projeto" required aria-describedby="projeto-error">
                  <option value="">Selecione um projeto</option>
                  ${projectOptions}
                </select>
                <div id="projeto-error" class="error-text" role="alert"></div>
              </div>

              <div class="form-group">
                <label for="mensagem">Como gostaria de contribuir?</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  aria-describedby="mensagem-help"
                ></textarea>
                <div id="mensagem-help" class="help-text">
                  Campo opcional. Descreva experiências, disponibilidade ou interesses.
                </div>
              </div>
            </fieldset>

            <button class="btn" type="submit">Enviar cadastro</button>
            <div id="form-status" aria-live="polite"></div>
          </form>

          <aside class="info-panel" aria-labelledby="cadastros-title">
            <h2 id="cadastros-title">Cadastros recentes</h2>
            <p class="muted">
              Demonstração de persistência utilizando <code>localStorage</code>.
            </p>
            <div id="registrations-container">
              ${registrationsList()}
            </div>
            <button id="clear-registrations" class="contrast-toggle" type="button">
              Limpar cadastros locais
            </button>
          </aside>
        </div>
      </div>
    </section>
  `
}

export function notFoundView() {
  return `
    <section class="section">
      <div class="container">
        <h1>Página não encontrada</h1>
        <p>O endereço solicitado não existe nesta aplicação.</p>
        <a class="btn" href="#/">Voltar ao início</a>
      </div>
    </section>
  `
}
