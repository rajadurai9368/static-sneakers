/* Cart: in-memory state, slide-out drawer, add / remove / quantity. */
import { showToast } from "./toast.js";

function money(n) {
  return "$" + n.toLocaleString("en-US");
}

export function initCart() {
  const cartCountEl = document.getElementById("cartCount");
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  const listEl = document.getElementById("cartList");
  const emptyEl = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  const cartBtn = document.getElementById("cartBtn");
  const closeBtn = document.getElementById("cartClose");
  const checkoutBtn = document.getElementById("cartCheckout");

  if (!drawer || !overlay || !listEl) return;

  const cart = {}; // { name: { price, qty, img } }

  function renderCart() {
    const names = Object.keys(cart);
    let count = 0;
    let total = 0;
    names.forEach((n) => {
      count += cart[n].qty;
      total += cart[n].qty * cart[n].price;
    });

    if (cartCountEl) cartCountEl.textContent = String(count);
    if (totalEl) totalEl.textContent = money(total);
    if (emptyEl) emptyEl.style.display = names.length ? "none" : "block";

    listEl.innerHTML = "";
    names.forEach((n) => {
      const item = cart[n];
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<img class="cart-item__img" src="' + item.img + '" alt="" />' +
        '<span class="cart-item__name">' + n + "</span>" +
        '<span class="cart-item__price">' + money(item.qty * item.price) + "</span>" +
        '<div class="cart-item__ctrls">' +
        '<button class="cart-item__qty-btn" data-act="dec" aria-label="Decrease quantity of ' + n + '">\u2212</button>' +
        '<span class="cart-item__qty">' + item.qty + "</span>" +
        '<button class="cart-item__qty-btn" data-act="inc" aria-label="Increase quantity of ' + n + '">+</button>' +
        "</div>" +
        '<button class="cart-item__remove" data-act="remove" aria-label="Remove ' + n + '">Remove</button>';

      li.querySelectorAll("[data-act]").forEach((b) => {
        b.addEventListener("click", () => {
          const act = b.getAttribute("data-act");
          if (act === "inc") cart[n].qty++;
          else if (act === "dec") {
            cart[n].qty--;
            if (cart[n].qty <= 0) delete cart[n];
          } else if (act === "remove") delete cart[n];
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
    if (cartBtn) {
      cartBtn.setAttribute("aria-expanded", "false");
      cartBtn.focus();
    }
    setTimeout(() => {
      overlay.hidden = true;
    }, 350);
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
  });

  if (checkoutBtn)
    checkoutBtn.addEventListener("click", () => {
      if (!Object.keys(cart).length) {
        showToast("Your bag is empty.");
        return;
      }
      showToast("Checkout is a demo \u2014 no payment taken.");
    });

  document.querySelectorAll(".card__add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price")) || 0;
      if (cart[name]) cart[name].qty++;
      else cart[name] = { price, qty: 1, img: btn.getAttribute("data-img") || "" };
      renderCart();
      showToast(name + " added to bag");
    });
  });

  renderCart();
}
