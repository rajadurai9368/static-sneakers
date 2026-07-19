/* Graceful image fallback: hide broken <img>s (not the SVG logo) so the
   muted media panel shows through instead of a broken-image icon. */
export function initImageFallback() {
  document.querySelectorAll('img:not([src$=".svg"])').forEach((img) => {
    img.addEventListener("error", () => {
      img.style.visibility = "hidden";
    });
  });
}
