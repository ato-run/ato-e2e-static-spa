// Client-side pathname router. Reloading /deep-link directly verifies the
// host's SPA fallback (the server must serve index.html for unknown paths).
const ROUTES = { "/": "home", "/deep-link": "deep-link", "/deep-link-v2": "deep-link-v2" };
function render() {
  const path = location.pathname;
  const label = ROUTES[path] ?? "not-found";
  document.querySelector('[data-testid="fixture-route"]').textContent = path;
  document.title = `Static fixture v2 — ${label}`;
}
document.addEventListener("click", (event) => {
  const a = event.target.closest("a[data-link]");
  if (!a) return;
  event.preventDefault();
  history.pushState(null, "", a.getAttribute("href"));
  render();
});
window.addEventListener("popstate", render);
render();
