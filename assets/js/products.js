const PRODUCTS_KEY = 'shop_products';

const defaultProducts = [
  {
    id: 1, slug: "sac-cuir-artisanal",
    name: { fr: "Sac en Cuir Artisanal", ar: "حقيبة جلدية يدوية", en: "Handcrafted Leather Bag" },
    description: { fr: "Sac en cuir véritable fabriqué à la main par des artisans locaux. Robuste, élégant et durable.", ar: "حقيبة من الجلد الطبيعي مصنوعة يدوياً من قبل الحرفيين المحليين. متينة وأنيقة.", en: "Genuine leather bag handmade by local artisans. Robust, elegant and durable." },
    price: 89.99, price_old: null, stock: 15,
    category: "maroquinerie", tags: ["nouveau", "artisanal"],
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"],
    active: true, featured: true, promo: false, promo_pct: 0,
    created: "2024-01-15"
  },
  {
    id: 2, slug: "parfum-oud-royal",
    name: { fr: "Parfum Oud Royal", ar: "عطر عود ملكي", en: "Royal Oud Perfume" },
    description: { fr: "Fragrance orientale au bois de oud, muscs et notes florales. Un voyage olfactif inoubliable.", ar: "عطر شرقي بخشب العود والمسك والزهور. رحلة شمية لا تُنسى.", en: "Oriental fragrance with oud wood, musks and floral notes. An unforgettable olfactory journey." },
    price: 120.00, price_old: 150.00, stock: 8,
    category: "parfums", tags: ["promo", "bestseller"],
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80"],
    active: true, featured: true, promo: true, promo_pct: 20,
    created: "2024-01-10"
  },
  {
    id: 3, slug: "bijou-berbere",
    name: { fr: "Collier Berbère Argent", ar: "قلادة بربرية فضية", en: "Berber Silver Necklace" },
    description: { fr: "Collier en argent massif aux motifs berbères traditionnels, fait à la main à Tizi-Ouzou.", ar: "قلادة من الفضة الخالصة بنقوش بربرية تقليدية، مصنوعة يدوياً.", en: "Sterling silver necklace with traditional Berber patterns, handmade in Tizi-Ouzou." },
    price: 65.00, price_old: null, stock: 20,
    category: "bijoux", tags: ["nouveau", "artisanal"],
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"],
    active: true, featured: false, promo: false, promo_pct: 0,
    created: "2024-01-20"
  },
  {
    id: 4, slug: "huile-argan-bio",
    name: { fr: "Huile d'Argan Bio", ar: "زيت أرغان عضوي", en: "Organic Argan Oil" },
    description: { fr: "Huile d'argan 100% pure et bio, pressée à froid. Idéale pour le soin du visage, des cheveux et du corps.", ar: "زيت أرغان نقي 100% وعضوي، معصور على البارد. مثالي للعناية بالبشرة والشعر.", en: "100% pure and organic argan oil, cold-pressed. Ideal for face, hair and body care." },
    price: 35.00, price_old: 45.00, stock: 30,
    category: "beaute", tags: ["promo", "bio"],
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80"],
    active: true, featured: true, promo: true, promo_pct: 22,
    created: "2024-01-05"
  },
  {
    id: 5, slug: "tapis-kabyle",
    name: { fr: "Tapis Kabyle Traditionnel", ar: "سجادة قبائلية تقليدية", en: "Traditional Kabyle Rug" },
    description: { fr: "Tapis tissé à la main par des artisanes de Kabylie, en laine naturelle avec des motifs géométriques.", ar: "سجادة منسوجة يدوياً من قبل حرفيات من القبائل، بالصوف الطبيعي.", en: "Hand-woven rug by Kabyle artisans, in natural wool with geometric patterns." },
    price: 180.00, price_old: null, stock: 5,
    category: "artisanat", tags: ["exclusif", "artisanal"],
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"],
    active: true, featured: false, promo: false, promo_pct: 0,
    created: "2024-01-18"
  },
  {
    id: 6, slug: "the-touareg",
    name: { fr: "Thé Touareg Premium", ar: "شاي طوارق ممتاز", en: "Premium Touareg Tea" },
    description: { fr: "Mélange exclusif de thé vert, menthe fraîche et épices du désert. Coffret de 3 sachets.", ar: "مزيج حصري من الشاي الأخضر والنعناع الطازج وتوابل الصحراء.", en: "Exclusive blend of green tea, fresh mint and desert spices. Set of 3 pouches." },
    price: 28.00, price_old: null, stock: 50,
    category: "gastronomie", tags: ["nouveau"],
    images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80"],
    active: true, featured: false, promo: false, promo_pct: 0,
    created: "2024-01-22"
  }
];

function getProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts)); return defaultProducts; }
  return JSON.parse(stored);
}

function saveProducts(products) { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); }

function getProductById(id) { return getProducts().find(p => p.id === parseInt(id)); }

function addProduct(product) {
  const products = getProducts();
  product.id = Date.now();
  product.created = new Date().toISOString().split('T')[0];
  products.push(product);
  saveProducts(products);
  return product;
}

function updateProduct(id, data) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === parseInt(id));
  if (idx > -1) { products[idx] = { ...products[idx], ...data }; saveProducts(products); return products[idx]; }
}

function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== parseInt(id));
  saveProducts(products);
}

function getCategories() {
  const cats = [...new Set(getProducts().map(p => p.category))];
  return cats;
}
