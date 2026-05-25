/* ═══════════════════════════════════════════════════════════════
   MABOUTIQUE - CHATBOT INTELLIGENT (chatbot.js)
   Assistance pré-programmée FR / AR / EN
   ═══════════════════════════════════════════════════════════════ */

// Base de connaissances du chatbot
const chatKnowledge = {
  fr: {
    patterns: [
      {
        keys: ['livraison', 'délai', 'shipping', 'comment', 'quand'],
        response: 'Notre livraison est gratuite dans toutes les 48 wilayas. Les délais sont de 3-7 jours ouvrables. Nous travaillons avec les meilleurs courriers locaux.'
      },
      {
        keys: ['paiement', 'payer', 'stripe', 'carte', 'virement'],
        response: 'Nous acceptons 3 modes de paiement: 1) Stripe (paiement en ligne sécurisé), 2) Virement bancaire, 3) Paiement à la livraison. Choisissez celui qui vous convient!'
      },
      {
        keys: ['retour', 'échange', 'remboursement', 'satisfaction'],
        response: 'Politique de retour: 14 jours pour retourner vos articles en bon état. Remboursement intégral ou échange gratuit. Contactez-nous pour initier le processus.'
      },
      {
        keys: ['contact', 'email', 'téléphone', 'appel', 'whatsapp'],
        response: 'Contactez-nous: Email: info@maboutique.dz | WhatsApp: +213 XXX XXX XXX | Horaires: 9h-18h (du lundi au samedi)'
      },
      {
        keys: ['promo', 'réduction', 'code', 'discount', 'offre'],
        response: 'Utilisez le code BIENVENUE10 pour 10% de réduction sur votre première commande! Autres codes disponibles: ETE20 (20%), LIVRAISON (5€ offerts)'
      },
      {
        keys: ['stock', 'disponible', 'rupture', 'en stock', 'restant'],
        response: 'Les stocks sont mis à jour en temps réel. Si un produit est indisponible, vous pouvez être alerté de son retour. Contacter nous pour pré-commander.'
      },
      {
        keys: ['artisanal', 'handmade', 'yidawi', 'authentique', 'original'],
        response: 'Tous nos produits sont 100% authentiques et faits main par nos artisans locaux. Nous travaillons directement avec plus de 50 artisans à travers l\'Algérie.'
      },
      {
        keys: ['bonjour', 'salut', 'ça va', 'hello', 'hi'],
        response: 'Bonjour! 👋 Bienvenue chez MaBoutique. Comment puis-je vous aider aujourd\'hui?'
      },
      {
        keys: ['merci', 'thank', 'شكرا', 'thanks'],
        response: 'De rien! 😊 N\'hésitez pas si vous avez d\'autres questions. Nous sommes là pour vous aider!'
      },
      {
        keys: ['commande', 'suivre', 'suivi', 'track', 'number'],
        response: 'Pour suivre votre commande, utilisez le numéro de confirmation que vous avez reçu par email. Vous pouvez aussi nous contacter directement.'
      }
    ],
    default: 'Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler? Je peux vous aider avec: livraison, paiement, retours, contact, promos, stock, produits artisanaux.',
    quickReplies: ['Livraison', 'Paiement', 'Retours', 'Contact', 'Codes promo']
  },

  ar: {
    patterns: [
      {
        keys: ['توصيل', 'شحن', 'delivery', 'وقت', 'متى'],
        response: 'التوصيل مجاني في جميع الولايات 48. المدة: 3-7 أيام عمل. نعمل مع أفضل شركات التوصيل المحلية.'
      },
      {
        keys: ['دفع', 'دفع', 'stripe', 'بطاقة', 'تحويل'],
        response: 'نقبل 3 طرق دفع: 1) Stripe (دفع آمن عبر الإنترنت)، 2) التحويل البنكي، 3) الدفع عند الاستلام. اختر ما يناسبك!'
      },
      {
        keys: ['إرجاع', 'استبدال', 'استرجاع', 'رضا', 'ضمان'],
        response: 'سياسة الإرجاع: 14 يومًا لإرجاع المنتجات في حالة جيدة. استرجاع كامل أو استبدال مجاني. اتصل بنا لبدء العملية.'
      },
      {
        keys: ['اتصل', 'بريد', 'هاتف', 'واتس', 'تواصل'],
        response: 'اتصل بنا: البريد الإلكتروني: info@maboutique.dz | واتس أب: +213 XXX XXX XXX | الأوقات: 9 صباحًا - 6 مساءً (الاثنين إلى السبت)'
      },
      {
        keys: ['خصم', 'عرض', 'رمز', 'تخفيف', 'تخفيض'],
        response: 'استخدم رمز BIENVENUE10 للحصول على 10٪ خصم على طلبك الأول! أكواد أخرى: ETE20 (20٪)، LIVRAISON (5€ مجاني)'
      },
      {
        keys: ['مخزون', 'متاح', 'غير متاح', 'كمية', 'قطع'],
        response: 'المخزون محدث في الوقت الفعلي. إذا كان المنتج غير متاح، يمكنك أن تكون على قائمة الانتظار. اتصل بنا للحجز المسبق.'
      },
      {
        keys: ['يدوي', 'حرفي', 'صنع يد', 'أصلي', 'تقليدي'],
        response: 'جميع منتجاتنا أصلية 100٪ ومصنوعة يدويًا من قبل حرفاننا المحليين. نعمل مباشرة مع أكثر من 50 حرفيًا في جميع أنحاء الجزائر.'
      },
      {
        keys: ['مرحبا', 'السلام', 'صباح', 'مساء', 'كيفك'],
        response: 'مرحبًا! 👋 أهلاً بك في MaBoutique. كيف يمكنني مساعدتك اليوم؟'
      },
      {
        keys: ['شكرا', 'جزاك', 'تشكر', 'thanks'],
        response: 'على الرحب والسعة! 😊 لا تتردد إذا كان لديك أسئلة أخرى. نحن هنا لمساعدتك!'
      },
      {
        keys: ['طلب', 'متابعة', 'تتبع', 'رقم', 'status'],
        response: 'لتتبع طلبك، استخدم رقم التأكيد الذي تلقيته عبر البريد الإلكتروني. يمكنك أيضًا الاتصال بنا مباشرة.'
      }
    ],
    default: 'لست متأكدًا من فهم سؤالك. هل يمكنك إعادة صياغته؟ يمكنني مساعدتك مع: التوصيل والدفع والإرجاع والاتصال والعروض والمخزون والمنتجات.',
    quickReplies: ['التوصيل', 'الدفع', 'الإرجاع', 'اتصل', 'أكواد']
  },

  en: {
    patterns: [
      {
        keys: ['delivery', 'shipping', 'how long', 'when', 'time'],
        response: 'Free delivery to all 48 wilayas. Delivery time: 3-7 business days. We work with the best local courier services.'
      },
      {
        keys: ['payment', 'pay', 'stripe', 'card', 'transfer'],
        response: 'We accept 3 payment methods: 1) Stripe (secure online payment), 2) Bank transfer, 3) Cash on delivery. Choose what works for you!'
      },
      {
        keys: ['return', 'exchange', 'refund', 'satisfaction', 'guarantee'],
        response: 'Return policy: 14 days to return items in good condition. Full refund or free exchange. Contact us to start the process.'
      },
      {
        keys: ['contact', 'email', 'phone', 'call', 'whatsapp'],
        response: 'Contact us: Email: info@maboutique.dz | WhatsApp: +213 XXX XXX XXX | Hours: 9am-6pm (Monday to Saturday)'
      },
      {
        keys: ['promo', 'discount', 'code', 'offer', 'sale'],
        response: 'Use code BIENVENUE10 for 10% off your first order! Other codes: ETE20 (20% off), LIVRAISON (€5 free shipping)'
      },
      {
        keys: ['stock', 'available', 'in stock', 'out of stock', 'quantity'],
        response: 'Stock is updated in real-time. If an item is unavailable, you can request a notification when it returns. Contact us to pre-order.'
      },
      {
        keys: ['handmade', 'artisanal', 'authentic', 'original', 'craft'],
        response: 'All our products are 100% authentic and handmade by our local artisans. We work directly with over 50 artisans across Algeria.'
      },
      {
        keys: ['hello', 'hi', 'hey', 'greet', 'welcome'],
        response: 'Hello! 👋 Welcome to MaBoutique. How can I help you today?'
      },
      {
        keys: ['thanks', 'thank', 'appreciate', 'merci'],
        response: 'You\'re welcome! 😊 Don\'t hesitate to ask if you have any other questions. We\'re here to help!'
      },
      {
        keys: ['order', 'track', 'follow', 'status', 'tracking'],
        response: 'To track your order, use the confirmation number you received by email. You can also contact us directly.'
      }
    ],
    default: 'I\'m not sure I understand your question. Could you rephrase it? I can help you with: delivery, payment, returns, contact, promos, stock, artisanal products.',
    quickReplies: ['Delivery', 'Payment', 'Returns', 'Contact', 'Promos']
  }
};

// ──────────────────────────────────────────────────────────────
// Logique du chatbot
// ──────────────────────────────────────────────────────────────

function findChatbotResponse(message) {
  const lang = currentLang;
  const knowledge = chatKnowledge[lang];
  const messageLower = message.toLowerCase();
  
  // Chercher un pattern correspondant
  for (let pattern of knowledge.patterns) {
    for (let key of pattern.keys) {
      if (messageLower.includes(key)) {
        return pattern.response;
      }
    }
  }
  
  // Chercher les produits par nom
  const products = getProducts();
  for (let product of products) {
    const productName = (product.name[lang] || product.name.fr).toLowerCase();
    if (messageLower.includes(productName.substring(0, 3))) {
      return `${product.name[lang] || product.name.fr}\n${formatPrice(product.price)}\n${product.description[lang] || product.description.fr}`;
    }
  }
  
  return knowledge.default;
}

function addChatMessage(text, isBot = false) {
  const messagesContainer = document.querySelector('.chatbot-messages');
  if (!messagesContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${isBot ? 'message-bot' : 'message-user'}`;
  messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendChatMessage() {
  const input = document.querySelector('.chatbot-input input');
  if (!input || !input.value.trim()) return;
  
  const message = input.value;
  input.value = '';
  
  // Ajouter le message utilisateur
  addChatMessage(message, false);
  
  // Attendre un peu pour effet naturel, puis répondre
  setTimeout(() => {
    const response = findChatbotResponse(message);
    addChatMessage(response, true);
    
    // Afficher les réponses rapides
    updateQuickReplies();
  }, 400);
}

function updateQuickReplies() {
  const lang = currentLang;
  const quickReplies = chatKnowledge[lang].quickReplies || [];
  
  let repliesHtml = '';
  for (let reply of quickReplies) {
    repliesHtml += `<button class="quick-reply" onclick="document.querySelector('.chatbot-input input').value='${reply}'; sendChatMessage();">${reply}</button>`;
  }
  
  // Remplacer les anciens boutons rapides
  let quickContainer = document.querySelector('.quick-replies');
  if (!quickContainer) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (messagesContainer) {
      quickContainer = document.createElement('div');
      quickContainer.className = 'quick-replies';
      messagesContainer.appendChild(quickContainer);
    }
  }
  
  if (quickContainer) {
    quickContainer.innerHTML = repliesHtml;
  }
}

// ──────────────────────────────────────────────────────────────
// UI Chatbot
// ──────────────────────────────────────────────────────────────

function toggleChatbot() {
  const chatWindow = document.querySelector('.chatbot-window');
  if (chatWindow) {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      // Initialiser les réponses rapides
      updateQuickReplies();
      // Focus sur l'input
      const input = document.querySelector('.chatbot-input input');
      if (input) input.focus();
    }
  }
}

// ──────────────────────────────────────────────────────────────
// Event Listeners
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Bouton toggle chatbot
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', toggleChatbot);
  }
  
  // Bouton fermer chatbot
  const chatbotClose = document.querySelector('.chatbot-close');
  if (chatbotClose) {
    chatbotClose.addEventListener('click', toggleChatbot);
  }
  
  // Envoi message (Entrée ou bouton)
  const chatInput = document.querySelector('.chatbot-input input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  const chatSendBtn = document.querySelector('.chatbot-input button');
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
  }
  
  // Message initial
  setTimeout(() => {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (messagesContainer && messagesContainer.children.length === 0) {
      const lang = currentLang;
      const greeting = chatKnowledge[lang].patterns.find(p => p.keys.includes('bonjour'))?.response ||
                      chatKnowledge[lang].patterns.find(p => p.keys.includes('hello'))?.response ||
                      'Bienvenue!';
      addChatMessage(greeting, true);
      updateQuickReplies();
    }
  }, 500);
});

// Mettre à jour les réponses rapides quand la langue change
const originalSetLanguage2 = window.setLanguage;
window.setLanguage = function(lang) {
  originalSetLanguage2(lang);
  updateQuickReplies();
};
