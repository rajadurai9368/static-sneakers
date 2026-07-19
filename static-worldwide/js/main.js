/* ==========================================================================
   STATIC — vanilla JS, zero dependencies.
   Runs on open. Everything is progressive: no JS = site still works.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Graceful image fallback ----------
     Until real photos are dropped into /assets, hide broken <img>s so the
     striped media panel shows through instead of a broken-image icon.
     (Logo SVG is excluded — it ships with the repo.) */
  document.querySelectorAll('img:not([src$=".svg"])').forEach(function (img) {
    img.addEventListener("error", function () { img.style.visibility = "hidden"; });
  });

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close menu when a link inside it is tapped
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: no observer support -> just show everything
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Product filter chips ---------- */
  var chips = document.querySelectorAll(".chip");
  var cards = document.querySelectorAll(".card");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-selected", String(active));
      });
      cards.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Cart: state, drawer, add / remove / quantity ---------- */
  var cartCountEl = document.getElementById("cartCount");
  var toast = document.getElementById("toast");
  var toastTimer;

  var drawer  = document.getElementById("cartDrawer");
  var overlay = document.getElementById("cartOverlay");
  var listEl  = document.getElementById("cartList");
  var emptyEl = document.getElementById("cartEmpty");
  var totalEl = document.getElementById("cartTotal");
  var cartBtn = document.getElementById("cartBtn");
  var closeBtn = document.getElementById("cartClose");
  var checkoutBtn = document.getElementById("cartCheckout");

  var cart = {}; // { name: { price, qty } }

  function money(n) { return "$" + n.toLocaleString("en-US"); }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    void toast.offsetWidth; // force reflow so the transition fires
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-show"); }, 2200);
  }

  function renderCart() {
    var names = Object.keys(cart);
    var count = 0, total = 0;
    names.forEach(function (n) { count += cart[n].qty; total += cart[n].qty * cart[n].price; });

    if (cartCountEl) cartCountEl.textContent = String(count);
    if (totalEl) totalEl.textContent = money(total);
    if (emptyEl) emptyEl.style.display = names.length ? "none" : "block";

    listEl.innerHTML = "";
    names.forEach(function (n) {
      var item = cart[n];
      var li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<img class="cart-item__img" src="' + item.img + '" alt="" />' +
        '<span class="cart-item__name">' + n + '</span>' +
        '<span class="cart-item__price">' + money(item.qty * item.price) + '</span>' +
        '<div class="cart-item__ctrls">' +
          '<button class="cart-item__qty-btn" data-act="dec" aria-label="Decrease quantity of ' + n + '">\u2212</button>' +
          '<span class="cart-item__qty">' + item.qty + '</span>' +
          '<button class="cart-item__qty-btn" data-act="inc" aria-label="Increase quantity of ' + n + '">+</button>' +
        '</div>' +
        '<button class="cart-item__remove" data-act="remove" aria-label="Remove ' + n + '">Remove</button>';
      li.querySelectorAll("[data-act]").forEach(function (b) {
        b.addEventListener("click", function () {
          var act = b.getAttribute("data-act");
          if (act === "inc") cart[n].qty++;
          else if (act === "dec") { cart[n].qty--; if (cart[n].qty <= 0) delete cart[n]; }
          else if (act === "remove") delete cart[n];
          renderCart();
        });
      });
      listEl.appendChild(li);
    });
  }

  function openCart() {
    overlay.hidden = false;
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (cartBtn) cartBtn.setAttribute("aria-expanded", "true");
    if (closeBtn) closeBtn.focus();
  }
  function closeCart() {
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (cartBtn) { cartBtn.setAttribute("aria-expanded", "false"); cartBtn.focus(); }
    setTimeout(function () { overlay.hidden = true; }, 350);
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
  });
  if (checkoutBtn) checkoutBtn.addEventListener("click", function () {
    if (!Object.keys(cart).length) { showToast("Your bag is empty."); return; }
    showToast("Checkout is a demo \u2014 no payment taken.");
  });

  document.querySelectorAll(".card__add").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-name");
      var price = parseFloat(btn.getAttribute("data-price")) || 0;
      if (cart[name]) cart[name].qty++;
      else cart[name] = { price: price, qty: 1, img: btn.getAttribute("data-img") || "" };
      renderCart();
      showToast(name + " added to bag");
    });
  });

  renderCart();

  /* ---------- Newsletter signup (client-side only, no server) ---------- */
  var form = document.getElementById("signup");
  if (form) {
    var input = document.getElementById("email");
    var msg = document.getElementById("signupMsg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!valid) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
        msg.style.color = "var(--clay)";
        msg.textContent = "Enter a valid email to continue.";
        return;
      }
      input.removeAttribute("aria-invalid");
      msg.style.color = "var(--sage)";
      msg.textContent = "You’re on the list. We’ll be in touch.";
      form.reset();
    });
    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
    });
  }


  /* ---------- Contact form (client-side only, no server) ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var cMsg = document.getElementById("contactMsg");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["cName", "cEmail", "cMessage"].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var val = el.value.trim();
        var bad = id === "cEmail" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) : val === "";
        el.setAttribute("aria-invalid", String(bad));
        if (bad && ok) { el.focus(); ok = false; }
      });
      if (!ok) { cMsg.style.color = "var(--clay)"; cMsg.textContent = "Please complete the required fields."; return; }
      cMsg.style.color = "var(--sage)";
      cMsg.textContent = "Thanks \u2014 your message is in. We\u2019ll reply within 48 hours.";
      contactForm.reset();
    });
    contactForm.addEventListener("input", function (e) {
      if (e.target && e.target.removeAttribute) e.target.removeAttribute("aria-invalid");
    });
  }

})();
