const KEY = "conectaacao-voluntarios"

export function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

export function saveRegistration(registration) {
  const current = getRegistrations()
  current.push(registration)
  localStorage.setItem(KEY, JSON.stringify(current))
}

export function clearRegistrations() {
  localStorage.removeItem(KEY)
}
