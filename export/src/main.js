/* ==========================================================================
   STATIC — app entry point
   Imports global styles and wires up every feature module.
   Module scripts are deferred, so the DOM is ready when this runs.
   ========================================================================== */
import "./styles.css";

import { initImageFallback } from "./js/imageFallback.js";
import { initFooterYear } from "./js/footerYear.js";
import { initMobileMenu } from "./js/mobileMenu.js";
import { initScrollReveal } from "./js/scrollReveal.js";
import { initFilterChips } from "./js/filterChips.js";
import { initCart } from "./js/cart.js";
import { initNewsletter } from "./js/newsletter.js";

initImageFallback();
initFooterYear();
initMobileMenu();
initScrollReveal();
initFilterChips();
initCart();
initNewsletter();
