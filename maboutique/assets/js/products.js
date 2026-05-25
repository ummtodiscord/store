/* ═══════════════════════════════════════════════════════════════
   MABOUTIQUE - GESTION PRODUITS (products.js)
   CRUD localStorage + Produits d'exemple
   ═══════════════════════════════════════════════════════════════ */

// Clé de stockage localStorage
const PRODUCTS_KEY = 'shop_products';
const PROMOS_KEY = 'shop_promos';

// Structure d'un produit :
// {
//   id: Number (timestamp),
//   slug: String,
//   name: { fr, ar, en },
//   description: { fr, ar, en },
//   price: Number (euros),
//   price_old: Number|null,
//   stock: Number,
//   category: String,
//   tags: Array (["nouveau","promo","bestseller","artisanal"]),
//   images: Array (URLs),
//   active: Boolean,
//   featured: Boolean,
//   promo: Boolean,
//   promo_pct: Number,
//   created: String (date ISO)
// }

// ──────────────────────────────────────────────────────────────
// Fonctions CRUD Produits
// ──────────────────────────────────────────────────────────────

function getProducts() {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

function addProduct(data) {
  const products = getProducts();
  const product = {
    id: Date.now(),
    slug: (data.name.fr || '').toLowerCase().replace(/\s+/g, '-'),
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    price_old: data.price_old ? parseFloat(data.price_old) : null,
    stock: parseInt(data.stock) || 0,
    category: data.category,
    tags: data.tags || [],
    images: data.images || [],
    active: data.active !== false,
    featured: data.featured || false,
    promo: data.promo || false,
    promo_pct: parseInt(data.promo_pct) || 0,
    created: new Date().toISOString()
  };
  products.push(product);
  saveProducts(products);
  return product;
}

function updateProduct(id, data) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const product = products[index];
    Object.assign(product, {
      name: data.name || product.name,
      description: data.description || product.description,
      price: data.price !== undefined ? parseFloat(data.price) : product.price,
      price_old: data.price_old ? parseFloat(data.price_old) : product.price_old,
      stock: data.stock !== undefined ? parseInt(data.stock) : product.stock,
      category: data.category || product.category,
      tags: data.tags !== undefined ? data.tags : product.tags,
      images: data.images !== undefined ? data.images : product.images,
      active: data.active !== undefined ? data.active : product.active,
      featured: data.featured !== undefined ? data.featured : product.featured,
      promo: data.promo !== undefined ? data.promo : product.promo,
      promo_pct: data.promo_pct !== undefined ? parseInt(data.promo_pct) : product.promo_pct,
    });
    saveProducts(products);
    return product;
  }
  return null;
}

function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
  return true;
}

function getCategories() {
  const products = getProducts();
  const categories = new Set();
  products.forEach(p => {
    if (p.category) categories.add(p.category);
  });
  return Array.from(categories).sort();
}

// ──────────────────────────────────────────────────────────────
// Promotions & Codes Promo
// ──────────────────────────────────────────────────────────────

function getPromos() {
  const data = localStorage.getItem(PROMOS_KEY);
  return data ? JSON.parse(data) : [];
}

function savePromos(promos) {
  localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
}

function validatePromo(code, total) {
  const promos = getPromos();
  const promo = promos.find(p => p.code.toUpperCase() === code.toUpperCase() && p.active);
  
  if (!promo) return null;
  if (promo.expiration && new Date(promo.expiration) < new Date()) return null;
  
  let discount = 0;
  if (promo.type === 'percentage') {
    discount = (total * promo.value) / 100;
  } else if (promo.type === 'fixed') {
    discount = promo.value;
  }
  
  return { code: promo.code, discount, type: promo.type };
}

// ──────────────────────────────────────────────────────────────
// Commandes
// ──────────────────────────────────────────────────────────────

const ORDERS_KEY = 'shop_orders';

function getOrders() {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function saveOrder(orderData) {
  const orders = getOrders();
  const order = {
    id: 'CMD-' + Date.now(),
    ...orderData,
    status: 'pending',
    created: new Date().toISOString(),
    total: orderData.total,
    items: orderData.items,
    customer: orderData.customer,
  };
  orders.push(order);
  saveOrders(orders);
  return order;
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrders(orders);
  }
  return order;
}

// ──────────────────────────────────────────────────────────────
// Initialisation des données par défaut
// ──────────────────────────────────────────────────────────────

function initDefaultProducts() {
  const existing = getProducts();
  if (existing.length === 0) {
    const defaultProducts = [
      {
        name: { fr: 'Sac en Cuir Artisanal', ar: 'حقيبة جلدية يدوية', en: 'Artisanal Leather Bag' },
        description: {
          fr: 'Sac à main 100% cuir naturel, travaillé à la main par nos artisans. Design intemporel et durable.',
          ar: 'حقيبة يد من الجلد الطبيعي 100% ، مصنوعة يدويًا من قبل حرفاننا. تصميم أنيق وفريد.',
          en: '100% natural leather handbag, handcrafted by our artisans. Timeless and durable design.'
        },
        price: 89.99,
        stock: 15,
        category: 'Maroquinerie',
        tags: ['artisanal', 'bestseller'],
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'],
        active: true,
        featured: true,
        promo: false
      },
      {
        name: { fr: 'Parfum Oud Royal', ar: 'عطر العود الملكي', en: 'Royal Oud Perfume' },
        description: {
          fr: 'Parfum haut de gamme à base d\'oud naturel. Essence orientale classique, longue tenue.',
          ar: 'عطر فاخر مصنوع من ود طبيعي. رائحة شرقية كلاسيكية، تدوم طويلاً.',
          en: 'Premium fragrance made from natural oud. Classic oriental scent, long-lasting.'
        },
        price: 120,
        price_old: 150,
        stock: 8,
        category: 'Parfums',
        tags: ['promo', 'bestseller'],
        images: ['https://images.unsplash.com/photo-1563170351-be82bc888c8c?w=500&h=500&fit=crop'],
        active: true,
        featured: true,
        promo: true,
        promo_pct: 20
      },
      {
        name: { fr: 'Collier Berbère Argent', ar: 'عقد أمازيغي فضي', en: 'Berber Silver Necklace' },
        description: {
          fr: 'Collier en argent travaillé traditionnel berbère. Motifs géométriques authentiques.',
          ar: 'عقد فضي بتصميم تقليدي أمازيغي. أنماط هندسية أصيلة.',
          en: 'Traditional Berber-worked silver necklace. Authentic geometric patterns.'
        },
        price: 65,
        stock: 22,
        category: 'Bijoux',
        tags: ['artisanal', 'nouveau'],
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'],
        active: true,
        featured: true,
        promo: false
      },
      {
        name: { fr: 'Huile d\'Argan Bio', ar: 'زيت الأركان العضوي', en: 'Organic Argan Oil' },
        description: {
          fr: 'Huile d\'argan 100% biologique, pressée à froid. Soin naturel pour peau et cheveux.',
          ar: 'زيت أركان عضوي 100% ، معصور على البارد. عناية طبيعية للبشرة والشعر.',
          en: '100% organic argan oil, cold-pressed. Natural care for skin and hair.'
        },
        price: 35,
        price_old: 45,
        stock: 30,
        category: 'Beauté',
        tags: ['promo', 'nouveau'],
        images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop'],
        active: true,
        featured: false,
        promo: true,
        promo_pct: 22
      },
      {
        name: { fr: 'Tapis Kabyle Traditionnel', ar: 'سجادة قبائلية تقليدية', en: 'Traditional Kabyle Carpet' },
        description: {
          fr: 'Tapis tissé à la main selon les traditions kabyles. Laine naturelle, teintes végétales.',
          ar: 'سجادة منسوجة يدويًا وفقًا للتقاليد القبائلية. صوف طبيعي ، أصباغ نباتية.',
          en: 'Hand-woven carpet in Kabyle tradition. Natural wool, plant-based dyes.'
        },
        price: 180,
        stock: 5,
        category: 'Artisanat',
        tags: ['artisanal', 'bestseller'],
        images: ['https://images.unsplash.com/photo-1559815707-e4a32492b401?w=500&h=500&fit=crop'],
        active: true,
        featured: true,
        promo: false
      },
      {
        name: { fr: 'Thé Touareg Premium', ar: 'شاي طوارق فاخر', en: 'Premium Tuareg Tea' },
        description: {
          fr: 'Mélange traditionnel touareg de thé vert et menthe. Récolte artisanale sahariennes.',
          ar: 'خليط طوارق تقليدي من الشاي الأخضر والنعناع. حصاد حرفي صحراوي.',
          en: 'Traditional Tuareg blend of green tea and mint. Artisanal Saharan harvest.'
        },
        price: 28,
        stock: 50,
        category: 'Gastronomie',
        tags: ['nuevo'],
        images: ['https://images.unsplash.com/photo-1597318690846-03ceba996ac0?w=500&h=500&fit=crop'],
        active: true,
        featured: false,
        promo: false
      }
    ];

    defaultProducts.forEach(product => addProduct(product));
  }
}

function initDefaultPromos() {
  const existing = getPromos();
  if (existing.length === 0) {
    const defaultPromos = [
      {
        code: 'BIENVENUE10',
        type: 'percentage',
        value: 10,
        active: true,
        expiration: null
      },
      {
        code: 'ETE20',
        type: 'percentage',
        value: 20,
        active: false,
        expiration: null
      },
      {
        code: 'LIVRAISON',
        type: 'fixed',
        value: 5,
        active: true,
        expiration: null
      }
    ];
    savePromos(defaultPromos);
  }
}

// Initialiser les données par défaut au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initDefaultProducts();
    initDefaultPromos();
  });
} else {
  initDefaultProducts();
  initDefaultPromos();
}

// ──────────────────────────────────────────────────────────────
// Utilitaires pour le filtrage et tri
// ──────────────────────────────────────────────────────────────

function filterProducts(options = {}) {
  let products = getProducts().filter(p => p.active);
  
  // Filtre par catégorie
  if (options.category) {
    products = products.filter(p => p.category === options.category);
  }
  
  // Filtre par prix
  if (options.maxPrice !== undefined) {
    products = products.filter(p => p.price <= options.maxPrice);
  }
  
  // Filtre par tag
  if (options.tag) {
    products = products.filter(p => p.tags.includes(options.tag));
  }
  
  // Recherche texte
  if (options.search) {
    const query = options.search.toLowerCase();
    products = products.filter(p => 
      p.name[currentLang]?.toLowerCase().includes(query) ||
      p.name.fr.toLowerCase().includes(query) ||
      p.description[currentLang]?.toLowerCase().includes(query)
    );
  }
  
  // Tri
  if (options.sort) {
    switch (options.sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        products.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case 'promo':
        products.sort((a, b) => (b.promo ? 1 : 0) - (a.promo ? 1 : 0));
        break;
      default:
        // Tri par défaut : featured puis par date
        products.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured - a.featured;
          return new Date(b.created) - new Date(a.created);
        });
    }
  }
  
  return products;
}

// Obtenir les produits similaires
function getSimilarProducts(productId, limit = 3) {
  const product = getProductById(productId);
  if (!product) return [];
  
  const similar = getProducts()
    .filter(p => p.id !== productId && p.category === product.category && p.active)
    .slice(0, limit);
  
  return similar;
}

// Obtenir les produits en promotion
function getPromoProducts(limit = 6) {
  const products = getProducts().filter(p => p.promo && p.active);
  return products.slice(0, limit);
}

// Obtenir les nouveaux produits
function getNewProducts(limit = 6) {
  const products = getProducts()
    .filter(p => p.active)
    .sort((a, b) => new Date(b.created) - new Date(a.created));
  return products.slice(0, limit);
}

// Obtenir les produits en avant
function getFeaturedProducts() {
  return getProducts().filter(p => p.featured && p.active);
}
