# ConectaAção

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Front-End, com foco em terceiro setor, acessibilidade, versionamento e publicação em ambiente de produção.

## Sobre o projeto

A ConectaAção é uma aplicação web voltada à divulgação de projetos sociais e ao cadastro de pessoas interessadas em voluntariado. A aplicação foi construída como SPA utilizando HTML5, CSS3 e JavaScript modular.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 responsivo
- JavaScript ES Modules
- LocalStorage
- Vite
- Git e GitHub

## Funcionalidades

- Navegação em SPA por hash
- Listagem de projetos sociais
- Formulário de voluntariado com validação
- Persistência local com LocalStorage
- Alto contraste
- Navegação por teclado
- Estrutura semântica compatível com leitores de tela
- Imagens WebP com lazy loading
- Layout responsivo

## Acessibilidade

O projeto aplica práticas relacionadas à WCAG 2.1 nível AA:

- landmarks semânticos (`header`, `nav`, `main`, `section`, `footer`);
- link para pular diretamente ao conteúdo;
- foco visível;
- `aria-expanded`, `aria-controls`, `aria-pressed`, `aria-invalid` e `role="alert"` quando necessário;
- labels explícitos em formulários;
- alto contraste;
- suporte a `prefers-reduced-motion`;
- textos alternativos em imagens.

## Instalação e execução

```bash
git clone URL_DO_REPOSITORIO
cd conecta-acao
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

A versão otimizada é gerada na pasta `dist`.

Para testar a build localmente:

```bash
npm run preview
```

## Estratégia de versionamento

O projeto adota uma estrutura baseada em GitFlow:

- `main`: versão estável e pronta para produção;
- `develop`: integração do desenvolvimento contínuo;
- `feature/*`: novas funcionalidades;
- `hotfix/*`: correções urgentes em produção.

Exemplos de Conventional Commits:

```text
feat: implementa formulário de voluntariado
feat: adiciona modo de alto contraste
fix: corrige validação de email
docs: atualiza instruções de deploy
```

As releases seguem versionamento semântico (`MAJOR.MINOR.PATCH`), com a primeira versão estável identificada como `v1.0.0`.

## Deploy

Sugestão de publicação no Netlify:

- branch de produção: `main`
- comando de build: `npm run build`
- diretório de publicação: `dist`

## Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.
