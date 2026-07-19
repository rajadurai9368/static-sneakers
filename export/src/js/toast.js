/* Lightweight toast for "added to bag" style feedback. */
let toastEl = null;
let toastTimer;

export function showToast(msg) {
  if (!toastEl) toastEl = document.getElementById("toast");
  if (!toastEl) return;

  toastEl.textContent = msg;
  toastEl.hidden = false;
  void toastEl.offsetWidth; // force reflow so the transition fires
  toastEl.classList.add("is-show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 2200);
}
