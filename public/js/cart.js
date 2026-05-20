// ── Storage Helpers ──────────────────────────────────────────────────────────
const CART_KEY = 'helpfulpet_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = total;
}

// ── Add Item ─────────────────────────────────────────────────────────────────
function addToCartItem(id, name, price, emoji) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, emoji, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`✓ ${name} added to cart!`);
}

// ── Toast Notification ────────────────────────────────────────────────────────
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Run on every page load ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', updateCartCount);