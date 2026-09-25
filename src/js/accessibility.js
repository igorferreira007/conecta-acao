const CONTRAST_KEY = "conectaacao-high-contrast"

export function setupContrast() {
  const button = document.getElementById("contrast-toggle")
  if (!button) return

  const enabled = localStorage.getItem(CONTRAST_KEY) === "true"
  document.body.classList.toggle("high-contrast", enabled)
  button.setAttribute("aria-pressed", String(enabled))

  button.addEventListener("click", () => {
    const active = !document.body.classList.contains("high-contrast")
    document.body.classList.toggle("high-contrast", active)
    button.setAttribute("aria-pressed", String(active))
    localStorage.setItem(CONTRAST_KEY, String(active))
  })
}

export function setupMobileMenu() {
  const button = document.getElementById("menu-toggle")
  const menu = document.getElementById("menu-principal")

  if (!button || !menu) return

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true"
    button.setAttribute("aria-expanded", String(!expanded))
    button.setAttribute(
      "aria-label",
      expanded ? "Abrir menu de navegação" : "Fechar menu de navegação",
    )
    menu.classList.toggle("open", !expanded)
  })

  menu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      button.setAttribute("aria-expanded", "false")
      button.setAttribute("aria-label", "Abrir menu de navegação")
      menu.classList.remove("open")
    }
  })
}
