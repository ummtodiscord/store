/* ═══════════════════════════════════════════════════════════════
   MABOUTIQUE - SYSTÈME MULTILINGUE (i18n.js)
   Gestion des traductions FR / AR / EN
   ═══════════════════════════════════════════════════════════════ */

// Langue actuelle (stockée dans localStorage)
let currentLang = localStorage.getItem('shop_lang') || 'fr';

// Taux de conversion EUR → DZD
const EUR_TO_DZD = 145;

// Dictionnaire de traductions complet
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',

    // Header
    'header.cart': 'Panier',
    'header.search': 'Rechercher...',

    // Hero
    'hero.badge': 'Découvrez l\'authenticité',
    'hero.title': 'Boutique <em>Artisanale</em> Traditionnelle',
    'hero.description': 'Produits authentiques, 100% fait main par nos artisans locaux. Qualité garantie, livraison à travers les 48 wilayas.',
    'hero.cta1': 'Découvrir',
    'hero.cta2': 'À propos',

    // Produits
    'products.featured': 'Produits Phares',
    'products.filter_all': 'Tous',
    'products.filter_new': 'Nouveautés',
    'products.filter_promo': 'Promotions',
    'products.results': 'produits',
    'products.add': 'Ajouter au panier',
    'products.favorite': '♡',

    // Panier
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.discount': 'Remise',
    'cart.total': 'Total',
    'cart.checkout': 'Valider la commande',
    'cart.continue': 'Continuer vos achats',
    'cart.remove': 'Supprimer',

    // Boutique
    'shop.title': 'Boutique',
    'shop.search': 'Rechercher...',
    'shop.filters': 'Filtres',
    'shop.category': 'Catégorie',
    'shop.price': 'Prix max',
    'shop.stock': 'En stock',
    'shop.sort': 'Tri',
    'shop.sort_default': 'Par défaut',
    'shop.sort_price_asc': 'Prix croissant',
    'shop.sort_price_desc': 'Prix décroissant',
    'shop.sort_new': 'Plus récent',
    'shop.sort_promo': 'Promotions',
    'shop.no_results': 'Aucun produit ne correspond à votre recherche',

    // Fiche produit
    'product.title': 'Produit',
    'product.description': 'Description',
    'product.price': 'Prix',
    'product.stock': 'Stock',
    'product.add_cart': 'Ajouter au panier',
    'product.favorite': 'Ajouter aux favoris',
    'product.similar': 'Vous aimerez aussi',
    'product.qty': 'Quantité',
    'product.in_stock': 'En stock',
    'product.out_of_stock': 'Rupture de stock',
    'product.sku': 'SKU',
    'product.category': 'Catégorie',
    'product.shipping': 'Livraison gratuite dans toutes les wilayas',

    // Checkout
    'checkout.title': 'Commande',
    'checkout.billing': 'Facturation',
    'checkout.shipping': 'Livraison',
    'checkout.summary': 'Récapitulatif',
    'checkout.name': 'Nom complet',
    'checkout.email': 'E-mail',
    'checkout.phone': 'Téléphone',
    'checkout.address': 'Adresse',
    'checkout.wilaya': 'Wilaya',
    'checkout.city': 'Ville',
    'checkout.notes': 'Notes (optionnel)',
    'checkout.payment': 'Mode de paiement',
    'checkout.payment_stripe': 'Paiement en ligne (Stripe)',
    'checkout.payment_transfer': 'Virement bancaire',
    'checkout.payment_delivery': 'Paiement à la livraison',
    'checkout.promo_code': 'Code promo',
    'checkout.apply': 'Appliquer',
    'checkout.confirm': 'Confirmer la commande',
    'checkout.success': 'Commande confirmée !',
    'checkout.error': 'Erreur lors de la commande',

    // À propos
    'about.title': 'À propos de nous',
    'about.mission': 'Notre Mission',
    'about.mission_text': 'Préserver et valoriser le savoir-faire artisanal algérien en offrant des produits authentiques et de qualité.',
    'about.values': 'Nos Valeurs',
    'about.authenticity': 'Authenticité',
    'about.quality': 'Qualité',
    'about.impact': 'Impact Social',
    'about.stats': 'En chiffres',
    'about.artisans': 'Artisans partenaires',
    'about.products': 'Produits actifs',
    'about.wilayas': 'Wilayas servies',
    'about.satisfaction': 'Satisfaction client',

    // Contact
    'contact.title': 'Nous contacter',
    'contact.info': 'Informations',
    'contact.email': 'E-mail',
    'contact.whatsapp': 'WhatsApp',
    'contact.hours': 'Horaires',
    'contact.location': 'Localisation',
    'contact.form': 'Formulaire de contact',
    'contact.name': 'Nom',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.success': 'Message envoyé avec succès',

    // Chatbot
    'chat.title': 'Assistant',
    'chat.placeholder': 'Votre question...',
    'chat.send': 'Envoyer',
    'chat.hello': 'Bonjour ! 👋 Comment puis-je vous aider ?',
    'chat.delivery': 'Parlez-moi de la livraison',
    'chat.payment': 'Modes de paiement',
    'chat.return': 'Politique de retour',
    'chat.contact': 'Me contacter',

    // Notifications
    'notify.added': '✓ Produit ajouté au panier',
    'notify.removed': '✓ Produit supprimé',
    'notify.error': '✗ Une erreur est survenue',
    'notify.success': '✓ Opération réussie',

    // Admin
    'admin.dashboard': 'Tableau de bord',
    'admin.orders': 'Commandes',
    'admin.products': 'Produits',
    'admin.add_product': 'Ajouter un produit',
    'admin.edit_product': 'Modifier le produit',
    'admin.promotions': 'Promotions',
    'admin.statistics': 'Statistiques',
    'admin.settings': 'Paramètres',
    'admin.revenue': 'Chiffre d\'affaires',
    'admin.total_orders': 'Commandes totales',
    'admin.active_products': 'Produits actifs',
    'admin.low_stock': 'Stock faible',
    'admin.save': 'Enregistrer',
    'admin.delete': 'Supprimer',
    'admin.edit': 'Modifier',
    'admin.view': 'Voir',
    'admin.export': 'Exporter CSV',
  },

  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',

    // Header
    'header.cart': 'السلة',
    'header.search': 'بحث...',

    // Hero
    'hero.badge': 'اكتشف الأصالة',
    'hero.title': 'متجر <em>حرفي</em> تقليدي',
    'hero.description': 'منتجات أصلية، 100٪ يدويًا من قبل حرفاننا المحليين. الجودة مضمونة، التسليم في جميع أنحاء الولايات 48.',
    'hero.cta1': 'اكتشف',
    'hero.cta2': 'حولنا',

    // Produits
    'products.featured': 'المنتجات المميزة',
    'products.filter_all': 'الكل',
    'products.filter_new': 'جديد',
    'products.filter_promo': 'عروض',
    'products.results': 'منتج',
    'products.add': 'أضف للسلة',
    'products.favorite': '♡',

    // Panier
    'cart.title': 'سلتك',
    'cart.empty': 'السلة فارغة',
    'cart.subtotal': 'المجموع الجزئي',
    'cart.shipping': 'التوصيل',
    'cart.discount': 'خصم',
    'cart.total': 'الإجمالي',
    'cart.checkout': 'إتمام الشراء',
    'cart.continue': 'الاستمرار في التسوق',
    'cart.remove': 'إزالة',

    // Boutique
    'shop.title': 'المتجر',
    'shop.search': 'بحث...',
    'shop.filters': 'المرشحات',
    'shop.category': 'الفئة',
    'shop.price': 'السعر الأقصى',
    'shop.stock': 'في المخزون',
    'shop.sort': 'الترتيب',
    'shop.sort_default': 'الافتراضي',
    'shop.sort_price_asc': 'السعر تصاعدي',
    'shop.sort_price_desc': 'السعر تنازلي',
    'shop.sort_new': 'الأحدث',
    'shop.sort_promo': 'العروض',
    'shop.no_results': 'لا توجد منتجات تطابق بحثك',

    // Fiche produit
    'product.title': 'منتج',
    'product.description': 'الوصف',
    'product.price': 'السعر',
    'product.stock': 'المخزون',
    'product.add_cart': 'أضف للسلة',
    'product.favorite': 'أضف للمفضلة',
    'product.similar': 'قد تعجبك أيضاً',
    'product.qty': 'الكمية',
    'product.in_stock': 'متاح',
    'product.out_of_stock': 'غير متاح',
    'product.sku': 'SKU',
    'product.category': 'الفئة',
    'product.shipping': 'شحن مجاني في جميع الولايات',

    // Checkout
    'checkout.title': 'الطلب',
    'checkout.billing': 'الفواتير',
    'checkout.shipping': 'التوصيل',
    'checkout.summary': 'الملخص',
    'checkout.name': 'الاسم الكامل',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'الهاتف',
    'checkout.address': 'العنوان',
    'checkout.wilaya': 'الولاية',
    'checkout.city': 'المدينة',
    'checkout.notes': 'ملاحظات (اختياري)',
    'checkout.payment': 'طريقة الدفع',
    'checkout.payment_stripe': 'الدفع عبر الإنترنت (Stripe)',
    'checkout.payment_transfer': 'التحويل البنكي',
    'checkout.payment_delivery': 'الدفع عند الاستلام',
    'checkout.promo_code': 'رمز ترويجي',
    'checkout.apply': 'تطبيق',
    'checkout.confirm': 'تأكيد الطلب',
    'checkout.success': 'تم تأكيد الطلب!',
    'checkout.error': 'خطأ في الطلب',

    // À propos
    'about.title': 'حول الشركة',
    'about.mission': 'مهمتنا',
    'about.mission_text': 'الحفاظ على المهارات الحرفية الجزائرية وتعزيزها من خلال تقديم منتجات أصلية وذات جودة عالية.',
    'about.values': 'قيمنا',
    'about.authenticity': 'الأصالة',
    'about.quality': 'الجودة',
    'about.impact': 'التأثير الاجتماعي',
    'about.stats': 'بالأرقام',
    'about.artisans': 'شركاء حرفيون',
    'about.products': 'المنتجات النشطة',
    'about.wilayas': 'الولايات المخدومة',
    'about.satisfaction': 'رضا العملاء',

    // Contact
    'contact.title': 'اتصل بنا',
    'contact.info': 'معلومات',
    'contact.email': 'البريد الإلكتروني',
    'contact.whatsapp': 'واتس أب',
    'contact.hours': 'الأوقات',
    'contact.location': 'الموقع',
    'contact.form': 'نموذج الاتصال',
    'contact.name': 'الاسم',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال',
    'contact.success': 'تم إرسال الرسالة بنجاح',

    // Chatbot
    'chat.title': 'مساعد',
    'chat.placeholder': 'سؤالك...',
    'chat.send': 'إرسال',
    'chat.hello': 'مرحبا! 👋 كيف يمكنني مساعدتك؟',
    'chat.delivery': 'أخبرني عن التسليم',
    'chat.payment': 'طرق الدفع',
    'chat.return': 'سياسة الإرجاع',
    'chat.contact': 'اتصل بي',

    // Notifications
    'notify.added': '✓ تمت إضافة المنتج للسلة',
    'notify.removed': '✓ تم حذف المنتج',
    'notify.error': '✗ حدث خطأ',
    'notify.success': '✓ تمت العملية بنجاح',

    // Admin
    'admin.dashboard': 'لوحة التحكم',
    'admin.orders': 'الطلبات',
    'admin.products': 'المنتجات',
    'admin.add_product': 'إضافة منتج',
    'admin.edit_product': 'تحرير المنتج',
    'admin.promotions': 'العروض',
    'admin.statistics': 'الإحصائيات',
    'admin.settings': 'الإعدادات',
    'admin.revenue': 'الإيرادات',
    'admin.total_orders': 'إجمالي الطلبات',
    'admin.active_products': 'المنتجات النشطة',
    'admin.low_stock': 'المخزون منخفض',
    'admin.save': 'حفظ',
    'admin.delete': 'حذف',
    'admin.edit': 'تعديل',
    'admin.view': 'عرض',
    'admin.export': 'تصدير CSV',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',

    // Header
    'header.cart': 'Cart',
    'header.search': 'Search...',

    // Hero
    'hero.badge': 'Discover Authenticity',
    'hero.title': 'Artisanal <em>Handcrafted</em> Store',
    'hero.description': 'Authentic products, 100% handmade by our local artisans. Quality guaranteed, delivery across all 48 wilayas.',
    'hero.cta1': 'Discover',
    'hero.cta2': 'About Us',

    // Produits
    'products.featured': 'Featured Products',
    'products.filter_all': 'All',
    'products.filter_new': 'New',
    'products.filter_promo': 'Promotions',
    'products.results': 'products',
    'products.add': 'Add to Cart',
    'products.favorite': '♡',

    // Panier
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.discount': 'Discount',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.continue': 'Continue Shopping',
    'cart.remove': 'Remove',

    // Boutique
    'shop.title': 'Shop',
    'shop.search': 'Search...',
    'shop.filters': 'Filters',
    'shop.category': 'Category',
    'shop.price': 'Max Price',
    'shop.stock': 'In Stock',
    'shop.sort': 'Sort',
    'shop.sort_default': 'Default',
    'shop.sort_price_asc': 'Price: Low to High',
    'shop.sort_price_desc': 'Price: High to Low',
    'shop.sort_new': 'Newest',
    'shop.sort_promo': 'Promotions',
    'shop.no_results': 'No products match your search',

    // Fiche produit
    'product.title': 'Product',
    'product.description': 'Description',
    'product.price': 'Price',
    'product.stock': 'Stock',
    'product.add_cart': 'Add to Cart',
    'product.favorite': 'Add to Favorites',
    'product.similar': 'You might also like',
    'product.qty': 'Quantity',
    'product.in_stock': 'In Stock',
    'product.out_of_stock': 'Out of Stock',
    'product.sku': 'SKU',
    'product.category': 'Category',
    'product.shipping': 'Free shipping to all wilayas',

    // Checkout
    'checkout.title': 'Order',
    'checkout.billing': 'Billing',
    'checkout.shipping': 'Shipping',
    'checkout.summary': 'Summary',
    'checkout.name': 'Full Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.wilaya': 'Wilaya',
    'checkout.city': 'City',
    'checkout.notes': 'Notes (optional)',
    'checkout.payment': 'Payment Method',
    'checkout.payment_stripe': 'Online Payment (Stripe)',
    'checkout.payment_transfer': 'Bank Transfer',
    'checkout.payment_delivery': 'Cash on Delivery',
    'checkout.promo_code': 'Promo Code',
    'checkout.apply': 'Apply',
    'checkout.confirm': 'Confirm Order',
    'checkout.success': 'Order confirmed!',
    'checkout.error': 'Error placing order',

    // À propos
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.mission_text': 'Preserve and promote Algerian craftsmanship by offering authentic and quality products.',
    'about.values': 'Our Values',
    'about.authenticity': 'Authenticity',
    'about.quality': 'Quality',
    'about.impact': 'Social Impact',
    'about.stats': 'By Numbers',
    'about.artisans': 'Partner Artisans',
    'about.products': 'Active Products',
    'about.wilayas': 'Wilayas Served',
    'about.satisfaction': 'Customer Satisfaction',

    // Contact
    'contact.title': 'Contact Us',
    'contact.info': 'Information',
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.hours': 'Hours',
    'contact.location': 'Location',
    'contact.form': 'Contact Form',
    'contact.name': 'Name',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.success': 'Message sent successfully',

    // Chatbot
    'chat.title': 'Assistant',
    'chat.placeholder': 'Your question...',
    'chat.send': 'Send',
    'chat.hello': 'Hello! 👋 How can I help you?',
    'chat.delivery': 'Tell me about delivery',
    'chat.payment': 'Payment Methods',
    'chat.return': 'Return Policy',
    'chat.contact': 'Contact Me',

    // Notifications
    'notify.added': '✓ Product added to cart',
    'notify.removed': '✓ Product removed',
    'notify.error': '✗ An error occurred',
    'notify.success': '✓ Operation successful',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.orders': 'Orders',
    'admin.products': 'Products',
    'admin.add_product': 'Add Product',
    'admin.edit_product': 'Edit Product',
    'admin.promotions': 'Promotions',
    'admin.statistics': 'Statistics',
    'admin.settings': 'Settings',
    'admin.revenue': 'Revenue',
    'admin.total_orders': 'Total Orders',
    'admin.active_products': 'Active Products',
    'admin.low_stock': 'Low Stock',
    'admin.save': 'Save',
    'admin.delete': 'Delete',
    'admin.edit': 'Edit',
    'admin.view': 'View',
    'admin.export': 'Export CSV',
  }
};

// Fonctions de traduction
function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (let k of keys) {
    value = value[k];
    if (!value) return key; // Fallback to key if translation not found
  }
  return value;
}

function setLanguage(lang) {
  if (['fr', 'ar', 'en'].includes(lang)) {
    currentLang = lang;
    localStorage.setItem('shop_lang', lang);
    
    // Appliquer la direction RTL pour l'arabe
    const htmlElem = document.documentElement;
    if (lang === 'ar') {
      htmlElem.setAttribute('dir', 'rtl');
      htmlElem.setAttribute('lang', 'ar');
      document.body.style.fontFamily = "'Noto Sans Arabic', sans-serif";
    } else {
      htmlElem.setAttribute('dir', 'ltr');
      htmlElem.setAttribute('lang', lang);
      document.body.style.fontFamily = "'Jost', sans-serif";
    }
    
    // Mettre à jour tous les éléments traduits
    updatePageTranslations();
  }
}

function updatePageTranslations() {
  // Traduire tous les éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    const translation = t(key);
    
    // Gérer les éléments avec du HTML (em, strong, etc.)
    if (elem.hasChildNodes() && elem.innerHTML.includes('<em>')) {
      // Garder la structure HTML intérieure
      elem.textContent = ''; // Vider le contenu texte
      const htmlContent = translations[currentLang][key] || key;
      elem.innerHTML = htmlContent;
    } else {
      elem.textContent = translation;
    }
  });
  
  // Mettre à jour les placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    elem.placeholder = t(key);
  });
  
  // Mettre à jour les titres
  document.querySelectorAll('[data-i18n-title]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-title');
    elem.title = t(key);
  });
  
  // Recharger les produits et le panier pour refléter la langue
  if (typeof renderProducts === 'function') {
    renderProducts();
  }
  if (typeof renderCart === 'function') {
    renderCart();
  }
}

// Formattage des prix selon la langue
function formatPrice(eurPrice) {
  if (currentLang === 'ar') {
    const dzd = Math.round(eurPrice * EUR_TO_DZD);
    return `${dzd} DA`;
  } else if (currentLang === 'en') {
    return `€${eurPrice.toFixed(2)}`;
  } else { // 'fr'
    return `${eurPrice.toFixed(2)} €`;
  }
}

// Convertir prix EUR vers DZD
function convertToDZD(eurPrice) {
  return Math.round(eurPrice * EUR_TO_DZD);
}

// Initialiser la langue au chargement de la page
function initLanguage() {
  setLanguage(currentLang);
}

// Appeler lors du chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
