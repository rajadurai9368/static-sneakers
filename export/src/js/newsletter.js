/* Newsletter signup — client-side validation only, no server. */
export function initNewsletter() {
  const form = document.getElementById("signup");
  if (!form) return;

  const input = document.getElementById("email");
  const msg = document.getElementById("signupMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (!valid) {
      input.setAttribute("aria-invalid", "true");
      input.focus();
      msg.style.color = "var(--clay)";
      msg.textContent = "Enter a valid email to continue.";
      return;
    }
    input.removeAttribute("aria-invalid");
    msg.style.color = "var(--sage)";
    msg.textContent = "You\u2019re on the list. We\u2019ll be in touch.";
    form.reset();
  });

  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
  });
}
