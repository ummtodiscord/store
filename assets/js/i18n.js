const translations = {
  fr: {
    nav_home: "Accueil", nav_shop: "Boutique", nav_about: "À propos", nav_contact: "Contact",
    cart_title: "Panier", cart_empty: "Votre panier est vide", cart_total: "Total",
    btn_add: "Ajouter", btn_buy: "Commander", btn_checkout: "Passer la commande",
    btn_pay_online: "Payer en ligne (€)", btn_pay_local: "Payer en DZD",
    checkout_info: "Informations", checkout_payment: "Paiement", checkout_confirm: "Confirmation",
    label_name: "Nom complet", label_email: "Email", label_phone: "Téléphone",
    label_address: "Adresse", label_city: "Ville", label_wilaya: "Wilaya",
    label_notes: "Notes (optionnel)",
    pay_stripe: "Paiement sécurisé en ligne", pay_stripe_desc: "Visa, Mastercard — Paiement en euros",
    pay_virement: "Virement bancaire / CCP", pay_virement_desc: "Paiement en dinars algériens",
    pay_livraison: "Paiement à la livraison", pay_livraison_desc: "Payez en cash à la réception",
    order_success: "Commande confirmée ! Vous recevrez un email de confirmation.",
    currency_main: "€", currency_alt: "DA", currency_rate: 145,
    promo_text: "🎁 Livraison gratuite à partir de 50€ | Code: BIENVENUE10 pour -10%",
    chat_greeting: "Bonjour ! Je suis l'assistant de la boutique. Comment puis-je vous aider ?",
    chat_placeholder: "Écrire un message...",
    new_badge: "Nouveau", promo_badge: "Promo",
    filter_all: "Tous", filter_new: "Nouveautés", filter_promo: "Promotions",
    stock_low: "Stock limité", stock_out: "Rupture de stock",
    subtotal: "Sous-total", shipping: "Livraison", total: "Total",
    free_shipping: "Gratuite",
  },
  ar: {
    nav_home: "الرئيسية", nav_shop: "المتجر", nav_about: "من نحن", nav_contact: "اتصل بنا",
    cart_title: "سلة التسوق", cart_empty: "سلة التسوق فارغة", cart_total: "المجموع",
    btn_add: "إضافة", btn_buy: "اطلب الآن", btn_checkout: "إتمام الطلب",
    btn_pay_online: "الدفع الإلكتروني (€)", btn_pay_local: "الدفع بالدينار",
    checkout_info: "المعلومات", checkout_payment: "الدفع", checkout_confirm: "التأكيد",
    label_name: "الاسم الكامل", label_email: "البريد الإلكتروني", label_phone: "رقم الهاتف",
    label_address: "العنوان", label_city: "المدينة", label_wilaya: "الولاية",
    label_notes: "ملاحظات (اختياري)",
    pay_stripe: "الدفع الإلكتروني الآمن", pay_stripe_desc: "فيزا، ماستركارد — بالأورو",
    pay_virement: "حوالة بنكية / CCP", pay_virement_desc: "الدفع بالدينار الجزائري",
    pay_livraison: "الدفع عند الاستلام", pay_livraison_desc: "ادفع نقداً عند التسليم",
    order_success: "تم تأكيد طلبك! ستتلقى بريداً إلكترونياً للتأكيد.",
    currency_main: "DA", currency_alt: "€", currency_rate: 1,
    promo_text: "🎁 توصيل مجاني من 7250 دينار | كود: BIENVENUE10 للحصول على -10%",
    chat_greeting: "مرحباً! أنا مساعد المتجر. كيف يمكنني مساعدتك؟",
    chat_placeholder: "اكتب رسالة...",
    new_badge: "جديد", promo_badge: "عرض",
    filter_all: "الكل", filter_new: "الجديد", filter_promo: "العروض",
    stock_low: "مخزون محدود", stock_out: "نفد المخزون",
    subtotal: "المجموع الفرعي", shipping: "الشحن", total: "الإجمالي",
    free_shipping: "مجاني",
  },
  en: {
    nav_home: "Home", nav_shop: "Shop", nav_about: "About", nav_contact: "Contact",
    cart_title: "Cart", cart_empty: "Your cart is empty", cart_total: "Total",
    btn_add: "Add to cart", btn_buy: "Buy now", btn_checkout: "Checkout",
    btn_pay_online: "Pay online (€)", btn_pay_local: "Pay in DZD",
    checkout_info: "Information", checkout_payment: "Payment", checkout_confirm: "Confirmation",
    label_name: "Full name", label_email: "Email", label_phone: "Phone",
    label_address: "Address", label_city: "City", label_wilaya: "Province",
    label_notes: "Notes (optional)",
    pay_stripe: "Secure online payment", pay_stripe_desc: "Visa, Mastercard — Payment in euros",
    pay_virement: "Bank transfer / CCP", pay_virement_desc: "Payment in Algerian dinars",
    pay_livraison: "Cash on delivery", pay_livraison_desc: "Pay cash upon reception",
    order_success: "Order confirmed! You will receive a confirmation email.",
    currency_main: "€", currency_alt: "DA", currency_rate: 145,
    promo_text: "🎁 Free shipping from €50 | Code: BIENVENUE10 for -10%",
    chat_greeting: "Hello! I'm the shop assistant. How can I help you?",
    chat_placeholder: "Type a message...",
    new_badge: "New", promo_badge: "Sale",
    filter_all: "All", filter_new: "New arrivals", filter_promo: "Deals",
    stock_low: "Low stock", stock_out: "Out of stock",
    subtotal: "Subtotal", shipping: "Shipping", total: "Total",
    free_shipping: "Free",
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function t(key) { return translations[currentLang]?.[key] || translations.fr[key] || key; }

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t(key);
    else el.textContent = t(key);
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    el.setAttribute(attr, t(key));
  });
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderCart === 'function') renderCart();
}

function formatPrice(eurPrice, showAlt = false) {
  if (currentLang === 'ar') {
    const dzd = Math.round(eurPrice * 145);
    return dzd.toLocaleString('fr-DZ') + ' DA';
  }
  if (showAlt) return eurPrice.toFixed(2) + ' € / ' + Math.round(eurPrice * 145).toLocaleString('fr-DZ') + ' DA';
  return eurPrice.toFixed(2) + ' €';
}

document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
