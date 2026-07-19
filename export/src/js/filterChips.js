/* Product filter chips: toggle active chip and show/hide matching cards. */
export function initFilterChips() {
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll(".card");
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter");
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-selected", String(active));
      });
      cards.forEach((card) => {
        const show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}
