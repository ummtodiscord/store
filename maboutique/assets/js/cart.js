/* ═══════════════════════════════════════════════════════════════
   MABOUTIQUE - GESTION PANIER (cart.js)
   Panier localStorage + Rendu UI + Notifications
   ═══════════════════════════════════════════════════════════════ */

const CART_KEY = 'shop_cart';

// ──────────────────────────────────────────────────────────────
// Fonctions CRUD Panier
// ──────────────────────────────────────────────────────────────

function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return false;
  
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  
  if (existing) {
    existing.qty += qty;
    if (existing.qty > product.stock) {
      existing.qty = product.stock;
    }
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || 'https://via.placeholder.com/100',
      qty: Math.min(qty, product.stock),
      stock: product.stock
    });
  }
  
  saveCart(cart);
  showToast(t('notify.added'), 'success');
  return true;
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  showToast(t('notify.removed'), 'success');
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else if (item.qty > item.stock) {
      item.qty = item.stock;
    } else {
      saveCart(cart);
    }
    renderCart();
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  renderCart();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// ──────────────────────────────────────────────────────────────
// Rendu UI Panier
// ──────────────────────────────────────────────────────────────

function updateCartCount() {
  const badge = document.querySelector('.cart-badge');
  const count = getCartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderCart() {
  const cart = getCart();
  const cartItems = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.order-summary');
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3 data-i18n="cart.empty"></h3>
        <p>${t('cart.empty')}</p>
      </div>
    `;
    
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
    return;
  }
  
  if (cartSummary) {
    cartSummary.style.display = 'block';
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name[currentLang] || item.name.fr}" onerror="this.src='https://via.placeholder.com/60'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name[currentLang] || item.name.fr}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-controls">
          <button class="btn-icon" onclick="updateQty(${item.id}, -1)">−</button>
          <input type="number" class="qty-input" value="${item.qty}" readonly>
          <button class="btn-icon" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="${t('cart.remove')}">🗑</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Mettre à jour le récapitulatif
  if (cartSummary) {
    updateCartSummary();
  }
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = getCartTotal();
  const summary = document.querySelector('.order-summary');
  
  if (!summary) return;
  
  let html = `
    <h3 style="margin-top: 0;">${t('checkout.summary')}</h3>
  `;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    html += `
      <div class="summary-item">
        <span>${item.name[currentLang] || item.name.fr} × ${item.qty}</span>
        <span>${formatPrice(itemTotal)}</span>
      </div>
    `;
  });
  
  // Appliquer le code promo si présent
  const promoCode = document.querySelector('input[name="promo_code"]');
  let discount = 0;
  if (promoCode && promoCode.value) {
    const promoResult = validatePromo(promoCode.value, subtotal);
    if (promoResult) {
      discount = promoResult.discount;
      html += `
        <div class="summary-item">
          <span>${t('checkout.discount')}</span>
          <span>-${formatPrice(discount)}</span>
        </div>
      `;
    }
  }
  
  html += `
    <div class="summary-item">
      <span>${t('checkout.shipping')}</span>
      <span>${formatPrice(0)}</span>
    </div>
  `;
  
  const total = subtotal - discount;
  html += `
    <div class="summary-total">
      <span>${t('cart.total')}</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;
  
  // Afficher aussi en DZD si pas arabe
  if (currentLang !== 'ar') {
    html += `
      <div class="summary-total" style="color: var(--text-muted); font-size: 0.95rem;">
        <span>EN DZD</span>
        <span>${convertToDZD(total)} DA</span>
      </div>
    `;
  }
  
  // Récupérer le contenu existant (sauf le résumé)
  const summaryItems = summary.innerHTML.split('</div>')[0];
  summary.innerHTML = html;
}

function openCartSidebar() {
  const sidebar = document.querySelector('.cart-sidebar');
  const overlay = document.querySelector('.cart-overlay');
  
  if (sidebar) {
    sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
  }
}

function closeCartSidebar() {
  const sidebar = document.querySelector('.cart-sidebar');
  const overlay = document.querySelector('.cart-overlay');
  
  if (sidebar) {
    sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ──────────────────────────────────────────────────────────────
// Rendu Produits
// ──────────────────────────────────────────────────────────────

function productCard(product) {
  const inStock = product.stock > 0;
  const priceDisplay = product.price_old ? 
    `<span class="product-price">${formatPrice(product.price)}</span><span class="product-price-old">${formatPrice(product.price_old)}</span>` :
    `<span class="product-price">${formatPrice(product.price)}</span>`;
  
  const badges = [];
  if (product.promo) badges.push(`<span class="badge badge-danger">${product.promo_pct}%</span>`);
  if (product.tags.includes('nouveau')) badges.push(`<span class="badge">${t('products.filter_new')}</span>`);
  if (product.tags.includes('bestseller')) badges.push(`<span class="badge">${t('products.filter_promo')}</span>`);
  
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.images?.[0] || 'https://via.placeholder.com/250'}" 
             alt="${product.name[currentLang] || product.name.fr}"
             onerror="this.src='https://via.placeholder.com/250'">
        <div class="product-badges">${badges.join('')}</div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name[currentLang] || product.name.fr}</div>
        <div class="product-description">${(product.description[currentLang] || product.description.fr).substring(0, 50)}...</div>
        <div>${priceDisplay}</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})" ${!inStock ? 'disabled' : ''}>
            ${t('products.add')}
          </button>
          <button class="btn btn-icon" title="${t('products.favorite')}">♡</button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(options = {}) {
  const container = document.querySelector('.products-grid');
  if (!container) return;
  
  const products = filterProducts(options);
  
  if (products.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">${t('shop.no_results')}</div>`;
    return;
  }
  
  container.innerHTML = products.map(product => productCard(product)).join('');
  
  // Mettre à jour le compteur de résultats
  const resultsCount = document.querySelector('[data-results-count]');
  if (resultsCount) {
    resultsCount.textContent = `${products.length} ${t('products.results')}`;
  }
}

// ──────────────────────────────────────────────────────────────
// Notifications Toast
// ──────────────────────────────────────────────────────────────

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ──────────────────────────────────────────────────────────────
// Event Listeners
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Bouton ouvrir panier
  const cartToggle = document.querySelector('.cart-toggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', openCartSidebar);
  }
  
  // Bouton fermer panier
  const cartClose = document.querySelector('.cart-close');
  if (cartClose) {
    cartClose.addEventListener('click', closeCartSidebar);
  }
  
  // Overlay fermer panier
  const overlay = document.querySelector('.cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCartSidebar);
  }
  
  // Filtres de produits (si shop.html)
  const filterButtons = document.querySelectorAll('.filter-pill');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Retirer la classe active des autres
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Récupérer les paramètres de filtre
      const tag = btn.getAttribute('data-tag');
      renderProducts({ tag: tag === 'all' ? null : tag });
    });
  });
  
  // Sélecteur tri
  const sortSelect = document.querySelector('select[name="sort"]');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      renderProducts({ sort: e.target.value });
    });
  }
  
  // Sélecteur catégorie
  const categorySelect = document.querySelector('select[name="category"]');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      renderProducts({ category: e.target.value || null });
    });
  }
  
  // Recherche
  const searchInput = document.querySelector('input[data-search]');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderProducts({ search: e.target.value });
    });
  }
  
  // Code promo
  const promoBtn = document.querySelector('.btn-apply-promo');
  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const promoCode = document.querySelector('input[name="promo_code"]');
      if (promoCode && promoCode.value) {
        const result = validatePromo(promoCode.value, getCartTotal());
        if (result) {
          showToast(`Code appliqué: ${result.code}`, 'success');
          updateCartSummary();
        } else {
          showToast('Code promo invalide ou expiré', 'error');
        }
      }
    });
  }
  
  // Initialiser le compteur panier
  updateCartCount();
  renderCart();
});

// Écouter les changements de langue
const originalSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
  originalSetLanguage(lang);
  renderCart();
  renderProducts();
  updateCartCount();
};
