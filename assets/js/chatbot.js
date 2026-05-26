const chatKnowledge = {
  fr: {
    patterns: [
      { keys: ['livraison','délai','expédition','envoi'], response: "🚚 Nous livrons partout en Algérie sous 3-5 jours ouvrables. La livraison est gratuite à partir de 50€. À l'international, comptez 7-14 jours." },
      { keys: ['paiement','payer','carte','visa','stripe'], response: "💳 Nous acceptons :\n• Paiement en ligne sécurisé (Visa, Mastercard) en euros\n• Virement bancaire / CCP en dinars\n• Paiement à la livraison (cash)" },
      { keys: ['retour','remboursement','échange','retourner'], response: "↩️ Vous disposez de 14 jours pour retourner un article. Il doit être dans son état d'origine. Contactez-nous par email pour initier un retour." },
      { keys: ['contact','email','téléphone','joindre','whatsapp'], response: "📞 Vous pouvez nous contacter :\n• Email : contact@maboutique.dz\n• WhatsApp : +213 XX XX XX XX\n• Horaires : Dim-Jeu 9h-18h" },
      { keys: ['promo','réduction','code','offre','promotion','solde'], response: "🎁 Utilisez le code BIENVENUE10 pour -10% sur votre première commande ! Suivez-nous sur les réseaux pour ne rater aucune promo." },
      { keys: ['stock','disponible','dispo','rupture'], response: "📦 La disponibilité est indiquée sur chaque fiche produit. Si un article vous intéresse et qu'il est en rupture, contactez-nous pour être averti." },
      { keys: ['taille','dimension','mesure'], response: "📏 Les dimensions sont précisées dans la description de chaque produit. En cas de doute, n'hésitez pas à nous demander des précisions." },
      { keys: ['artisanal','fait main','authentique','origine'], response: "🤝 Tous nos produits sont fabriqués par des artisans locaux algériens. Nous valorisons le savoir-faire traditionnel et l'authenticité." },
      { keys: ['commande','suivi','statut','où est','colis'], response: "📬 Une fois votre commande passée, vous recevez un email de confirmation avec un numéro de suivi sous 24h." },
      { keys: ['bonjour','salam','hi','hello','bonsoir'], response: "👋 Bienvenue ! Je suis ravi de vous aider. Posez-moi votre question sur nos produits, la livraison, ou les paiements." },
      { keys: ['merci','thank','شكرا'], response: "😊 Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne visite sur notre boutique !" },
      { keys: ['qualité','garantie','matière'], response: "⭐ Nous sélectionnons rigoureusement chaque produit pour sa qualité. Tous nos articles sont garantis authentiques et de haute qualité." },
    ],
    default: "Je n'ai pas bien compris votre question 😊 Vous pouvez me demander des infos sur la livraison, les paiements, les retours ou nos produits. Ou contactez-nous directement !",
    quickReplies: ["🚚 Livraison", "💳 Paiement", "↩️ Retours", "📞 Contact", "🎁 Promos"]
  },
  ar: {
    patterns: [
      { keys: ['توصيل','شحن','تسليم','إرسال'], response: "🚚 نوصل إلى جميع أنحاء الجزائر في 3-5 أيام عمل. التوصيل مجاني من 7250 دينار." },
      { keys: ['دفع','سداد','بطاقة','فيزا'], response: "💳 نقبل:\n• الدفع الإلكتروني الآمن (فيزا، ماستركارد)\n• حوالة بنكية / CCP بالدينار\n• الدفع عند الاستلام" },
      { keys: ['إرجاع','استرداد','تبديل'], response: "↩️ لديك 14 يوماً لإرجاع المنتج. يجب أن يكون في حالته الأصلية. تواصل معنا عبر البريد الإلكتروني." },
      { keys: ['تواصل','اتصال','بريد','واتساب'], response: "📞 تواصل معنا:\n• البريد: contact@maboutique.dz\n• واتساب: +213 XX XX XX XX\n• أوقات العمل: الأحد-الخميس 9-18" },
      { keys: ['خصم','عرض','كود','تخفيض','ترقية'], response: "🎁 استخدم كود BIENVENUE10 للحصول على خصم 10% على طلبك الأول!" },
      { keys: ['مرحبا','السلام','أهلا','صباح'], response: "👋 أهلاً وسهلاً! أنا هنا لمساعدتك. اسألني عن منتجاتنا أو التوصيل أو طرق الدفع." },
    ],
    default: "لم أفهم سؤالك جيداً 😊 يمكنك السؤال عن التوصيل أو الدفع أو الإرجاع. أو تواصل معنا مباشرة!",
    quickReplies: ["🚚 التوصيل", "💳 الدفع", "↩️ الإرجاع", "📞 التواصل", "🎁 العروض"]
  },
  en: {
    patterns: [
      { keys: ['delivery','shipping','ship','send'], response: "🚚 We deliver across Algeria in 3-5 business days. Free shipping from €50. International orders take 7-14 days." },
      { keys: ['payment','pay','card','visa','stripe'], response: "💳 We accept:\n• Secure online payment (Visa, Mastercard) in euros\n• Bank transfer / CCP in dinars\n• Cash on delivery" },
      { keys: ['return','refund','exchange'], response: "↩️ You have 14 days to return an item. It must be in its original condition. Contact us by email to initiate a return." },
      { keys: ['contact','email','phone','whatsapp'], response: "📞 Contact us:\n• Email: contact@maboutique.dz\n• WhatsApp: +213 XX XX XX XX\n• Hours: Sun-Thu 9am-6pm" },
      { keys: ['promo','discount','code','offer'], response: "🎁 Use code BIENVENUE10 for -10% on your first order!" },
      { keys: ['hello','hi','hey','good'], response: "👋 Welcome! I'm happy to help. Ask me about our products, delivery, or payments." },
    ],
    default: "I didn't quite understand 😊 You can ask about delivery, payments, returns or our products. Or contact us directly!",
    quickReplies: ["🚚 Delivery", "💳 Payment", "↩️ Returns", "📞 Contact", "🎁 Promos"]
  }
};

function getBotResponse(message, lang) {
  const knowledge = chatKnowledge[lang] || chatKnowledge.fr;
  const lower = message.toLowerCase();
  for (const item of knowledge.patterns) {
    if (item.keys.some(k => lower.includes(k))) return item.response;
  }
  // Check product names
  const products = getProducts();
  const matched = products.find(p => {
    const name = (p.name[lang] || p.name.fr).toLowerCase();
    return lower.includes(name.substring(0, 6));
  });
  if (matched) {
    const name = matched.name[lang] || matched.name.fr;
    const price = formatPrice(matched.price);
    return `📦 ${name}\n${price} — ${matched.description[lang] || matched.description.fr}\n\nVoir le produit sur notre boutique !`;
  }
  return knowledge.default;
}

function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const win = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const quickBtns = document.getElementById('chat-quick-btns');

  if (!toggle || !win) return;

  let isOpen = false;
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    toggle.textContent = isOpen ? '✕' : '💬';
    if (isOpen && messages.children.length === 0) {
      addBotMessage(t('chat_greeting'));
      renderQuickReplies();
    }
  });
  closeBtn?.addEventListener('click', () => { isOpen = false; win.classList.remove('open'); toggle.textContent = '💬'; });

  function addBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.style.whiteSpace = 'pre-line';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  function sendMessage(text) {
    if (!text.trim()) return;
    addUserMessage(text);
    input.value = '';
    setTimeout(() => { addBotMessage(getBotResponse(text, currentLang)); renderQuickReplies(); }, 400);
  }
  function renderQuickReplies() {
    if (!quickBtns) return;
    const replies = (chatKnowledge[currentLang] || chatKnowledge.fr).quickReplies;
    quickBtns.innerHTML = replies.map(r => `<button class="chat-quick-btn" onclick="document.getElementById('chat-input').value='${r.replace(/['"]/g,'')}'; document.getElementById('chat-send').click()">${r}</button>`).join('');
  }

  sendBtn?.addEventListener('click', () => sendMessage(input.value));
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });
}

document.addEventListener('DOMContentLoaded', initChatbot);
