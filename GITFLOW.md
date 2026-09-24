# Fluxo Git sugerido

```bash
git init
git add .
git commit -m "chore: inicia projeto"

git branch -M main
git checkout -b develop

git checkout -b feature/accessibility
git add .
git commit -m "feat: adiciona recursos de acessibilidade"
git checkout develop
git merge feature/accessibility

git checkout main
git merge develop
git tag v1.0.0
```
