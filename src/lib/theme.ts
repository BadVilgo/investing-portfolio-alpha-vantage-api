export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
}

export function toggleTheme(): void {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
