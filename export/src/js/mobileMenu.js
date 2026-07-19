/* Mobile slide-down menu toggle. */
export function initMobileMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Close the menu when a link inside it is tapped.
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });
}
