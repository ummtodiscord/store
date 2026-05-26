// ══ CART ══
const CART_KEY = 'shop_cart';
const ORDERS_KEY = 'shop_orders';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty = Math.min(existing.qty + qty, product.stock);
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty, stock: product.stock });
  saveCart(cart);
  showToast('✓ ' + product.name[currentLang || 'fr'] + (currentLang === 'ar' ? ' أضيف' : ' ajouté au panier'), 'success');
  openCart();
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(item.qty + delta, item.stock));
  saveCart(cart);
}

function clearCart() { saveCart([]); }

function getCartTotal() { return getCart().reduce((sum, i) => sum + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  if (typeof renderCart === 'function') renderCart();
}

function openCart() {
  document.querySelector('.cart-sidebar')?.classList.add('open');
  document.querySelector('.cart-overlay')?.classList.add('open');
}
function closeCart() {
  document.querySelector('.cart-sidebar')?.classList.remove('open');
  document.querySelector('.cart-overlay')?.classList.remove('open');
}

function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById('cart-items');
  if (!itemsEl) return;
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><p data-i18n="cart_empty">${t('cart_empty')}</p></div>`;
    document.getElementById('cart-total-amount').textContent = formatPrice(0);
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name[currentLang]||item.name.fr}" onerror="this.src='https://via.placeholder.com/70'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name[currentLang]||item.name.fr}</div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${item.id},-1);renderCart()">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id},1);renderCart()">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>`).join('');
  document.getElementById('cart-total-amount').textContent = formatPrice(getCartTotal());
}

// ══ ORDERS ══
function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  order.id = 'CMD-' + Date.now();
  order.date = new Date().toISOString();
  order.status = 'pending';
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
}
function getOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }

// ══ PROMO CODES ══
const PROMOS_KEY = 'shop_promos';
const defaultPromos = [
  { code: 'BIENVENUE10', discount: 10, type: 'percent', active: true, uses: 0, expires: '2025-12-31' },
  { code: 'ETE20', discount: 20, type: 'percent', active: false, uses: 0, expires: '2024-08-31' },
  { code: 'LIVRAISON', discount: 5, type: 'fixed', active: true, uses: 0, expires: '2025-12-31' },
];
function getPromos() {
  const stored = localStorage.getItem(PROMOS_KEY);
  if (!stored) { localStorage.setItem(PROMOS_KEY, JSON.stringify(defaultPromos)); return defaultPromos; }
  return JSON.parse(stored);
}
function validatePromo(code, total) {
  const promos = getPromos();
  const promo = promos.find(p => p.code === code.toUpperCase() && p.active);
  if (!promo) return null;
  if (new Date(promo.expires) < new Date()) return null;
  const discount = promo.type === 'percent' ? total * promo.discount / 100 : promo.discount;
  return { ...promo, discountAmount: discount };
}

// ══ TOAST ══
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type]||'ℹ'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ══ SHOP RENDER ══
let activeFilter = 'all';
let searchQuery = '';

function renderProducts(filter = activeFilter) {
  activeFilter = filter;
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  let products = getProducts().filter(p => p.active);
  if (filter === 'promo') products = products.filter(p => p.promo);
  if (filter === 'nouveau') products = products.filter(p => p.tags?.includes('nouveau'));
  if (searchQuery) products = products.filter(p => {
    const name = (p.name[currentLang] || p.name.fr).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });
  if (products.length === 0) { grid.innerHTML = `<p style="color:var(--text-muted);padding:2rem;grid-column:1/-1">Aucun produit trouvé.</p>`; return; }
  grid.innerHTML = products.map(p => productCard(p)).join('');
}

function productCard(p) {
  const name = p.name[currentLang] || p.name.fr;
  const priceDisplay = formatPrice(p.price);
  const priceDZ = currentLang !== 'ar' ? `<span class="price-dz">${Math.round(p.price * 145).toLocaleString()} DA</span>` : '';
  const oldPrice = p.price_old ? `<span class="price-old">${formatPrice(p.price_old)}</span>` : '';
  const badge = p.promo ? `<div class="product-badge promo">-${p.promo_pct}%</div>` : p.tags?.includes('nouveau') ? `<div class="product-badge">${t('new_badge')}</div>` : '';
  const stockWarning = p.stock <= 3 ? `<div style="font-size:0.72rem;color:var(--danger);margin-bottom:0.5rem">⚠ ${t('stock_low')}</div>` : '';
  return `
  <div class="product-card">
    <div class="product-image" onclick="location.href='product.html?id=${p.id}'">
      ${badge}
      <img src="${p.images[0]}" alt="${name}" onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80'" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-category">${p.category}</div>
      <div class="product-name" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">${name}</div>
      <div class="product-price">
        <span class="price-main">${priceDisplay}</span>
        ${oldPrice}
        ${priceDZ}
      </div>
      ${stockWarning}
      <div class="product-actions">
        <button class="btn-add" onclick="addToCart(${p.id})">+ ${t('btn_add')}</button>
        <button class="btn-wishlist" title="Favoris">♡</button>
      </div>
    </div>
  </div>`;
}

// ══ INIT ══
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  document.querySelector('.cart-btn')?.addEventListener('click', openCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCart);
  document.querySelector('.menu-btn')?.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.add('open'));
  document.querySelector('.mobile-close')?.addEventListener('click', () => document.querySelector('.mobile-nav')?.classList.remove('open'));
  document.querySelector('.close-banner')?.addEventListener('click', () => document.querySelector('.promo-banner')?.remove());
  renderCart();
  renderProducts();
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });
  const searchInp = document.getElementById('search-input');
  if (searchInp) searchInp.addEventListener('input', e => { searchQuery = e.target.value; renderProducts(); });
});
