# 🛍️ MaBoutique - Guide de Déploiement Complet

**MaBoutique** est une boutique e-commerce statique et multilingue (FR/AR/EN), 100% gratuite sur GitHub Pages, sans serveur ni base de données.

## 📋 Table des matières
1. [Prérequis](#prérequis)
2. [Étapes de déploiement](#étapes-de-déploiement)
3. [Configuration](#configuration)
4. [Personnalisation](#personnalisation)
5. [SEO & Analytics](#seo--analytics)
6. [Sécurité](#sécurité)
7. [Support](#support)

---

## ✅ Prérequis

- Compte GitHub gratuit ([github.com](https://github.com))
- Compte Stripe gratuit pour les paiements ([stripe.com](https://stripe.com))
- Compte Formspree gratuit pour les emails ([formspree.io](https://formspree.io)) - 50 soumissions/mois
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

---

## 🚀 Étapes de déploiement

### **Étape 1 : Créer un repository GitHub Pages**

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Créez un **nouveau repository** avec le nom: `username.github.io`
   - ⚠️ **Important**: Remplacez `username` par votre nom d'utilisateur GitHub
   - Exemple: Si vous êtes `john123`, le repo s'appelle `john123.github.io`
3. Sélectionnez "Public"
4. Cliquez sur "Create repository"

### **Étape 2 : Télécharger les fichiers de MaBoutique**

1. Téléchargez tous les fichiers du dossier `maboutique/`
2. Téléversez-les dans la racine de votre repository GitHub
   - Structure à respecter:
   ```
   username.github.io/
   ├── index.html
   ├── shop.html
   ├── product.html
   ├── checkout.html
   ├── about.html
   ├── contact.html
   ├── sitemap.xml
   ├── robots.txt
   ├── README.md
   ├── admin/
   │   ├── index.html
   │   └── admin.css
   └── assets/
       ├── css/
       │   └── main.css
       └── js/
           ├── i18n.js
           ├── products.js
           ├── cart.js
           └── chatbot.js
   ```

3. Attendez 1-2 minutes que GitHub Pages compile le site

### **Étape 3 : Vérifier que le site est en ligne**

- Allez sur `https://username.github.io` (remplacez `username` par votre nom d'utilisateur)
- 🎉 Votre boutique est maintenant accessible!

---

## ⚙️ Configuration

### **3.1 Configurer Stripe (Paiement en ligne)**

1. Allez sur [stripe.com](https://stripe.com) et créez un compte gratuit
2. Dans le dashboard Stripe:
   - Allez à **Products** → **Create product**
   - Nommez-le "MaBoutique Order"
   - Définissez un prix par défaut
   - Cliquez sur "Create product"
3. Dans **Payment links**, créez un Payment Link
4. Copiez l'URL du Payment Link (ex: `https://buy.stripe.com/test_ABC123...`)
5. Accédez à l'**Admin** de votre boutique:
   - URL: `https://username.github.io/admin/`
   - Allez à **Paramètres**
   - Collez l'URL dans le champ "Stripe Payment Link"
   - Cliquez sur **Enregistrer**

### **3.2 Configurer Formspree (Emails de contact)**

1. Allez sur [formspree.io](https://formspree.io)
2. Créez un compte gratuit
3. Cliquez sur **Create new form**
4. Nommez le formulaire "maboutique-contact"
5. Copiez l'**ID du formulaire** (ex: `xyzabc123def`)
6. Accédez à l'Admin > Paramètres
7. Collez l'ID dans le champ "Formspree ID"
8. Cliquez sur **Enregistrer**

### **3.3 Accéder à l'Admin Dashboard**

- URL: `https://username.github.io/admin/`
- Aucun mot de passe n'est requis (stockage local)
- Fonctionnalités:
  - ✅ Tableau de bord avec statistiques
  - ✅ Gestion complète des produits (CRUD)
  - ✅ Suivi des commandes
  - ✅ Codes promotionnels
  - ✅ Configurations boutique

---

## 🎨 Personnalisation

### **4.1 Changer les couleurs du thème**

Éditez `assets/css/main.css` et modifiez les variables CSS:

```css
:root {
  --bg: #0a0a0a;           /* Fond principal */
  --gold: #d4af37;          /* Couleur or accentée */
  --gold-light: #e8c84a;    /* Or clair */
  --text: #f0ece4;          /* Texte principal */
  --text-muted: #888880;    /* Texte secondaire */
  --danger: #e55;           /* Couleur erreur */
  --success: #4caf78;       /* Couleur succès */
}
```

### **4.2 Ajouter/modifier les produits**

Deux méthodes:

**Méthode 1: Via l'Admin Dashboard** (Recommandée)
- Accédez à `https://username.github.io/admin/`
- Allez à **Ajouter produit**
- Remplissez le formulaire et cliquez **Enregistrer**
- Les produits sont sauvegardés dans le localStorage du navigateur

**Méthode 2: Éditer `assets/js/products.js` manuellement**
- Dans le fichier, trouvez la fonction `initDefaultProducts()`
- Ajoutez des objets produits au tableau `defaultProducts`

### **4.3 Traduire le contenu**

Le système i18n supporte FR / AR / EN. Pour ajouter des traductions:

1. Ouvrez `assets/js/i18n.js`
2. Trouvez l'objet `translations`
3. Ajoutez vos clés:
   ```javascript
   translations = {
     fr: {
       'ma.clé': 'Texte français',
     },
     ar: {
       'ma.clé': 'النص العربي',
     },
     en: {
       'ma.clé': 'English text',
     }
   }
   ```
4. Dans vos fichiers HTML, utilisez:
   ```html
   <h1 data-i18n="ma.clé"></h1>
   ```

### **4.4 Changer le logo et favicon**

1. Remplacez le texte "MaBoutique" dans le header par un logo
2. Ajoutez un favicon: Créez `favicon.ico` et référencez-le dans le `<head>`

---

## 🔍 SEO & Analytics

### **5.1 Soumettre le sitemap à Google**

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété: `https://username.github.io`
3. Allez à **Sitemaps**
4. Cliquez sur **Ajouter/Tester un sitemap**
5. Entrez: `sitemap.xml`
6. Cliquez **Envoyer**

### **5.2 Ajouter Google Analytics**

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Créez une nouvelle propriété pour `username.github.io`
3. Copiez le code de suivi (Tag Manager ID)
4. Collez ce code dans le `<head>` de tous les fichiers HTML:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### **5.3 Améliorer le SEO**

- ✅ Les balises `<title>` et `<meta>` sont optimisées par page
- ✅ Le fichier `robots.txt` est configuré correctement
- ✅ Le sitemap contient toutes les pages principales
- ✅ Les images ont des attributs `alt` descriptifs
- ✅ Les URLs sont lisibles (sans paramètres superflus)

---

## 🔒 Sécurité

### **Recommandations importantes:**

1. ⚠️ **Admin Panel**: Renommez le dossier `/admin/` en quelque chose de secret:
   - Exemple: `/secure_panel_2024/`
   - Cela rend le panel moins facile à découvrir

2. 🔐 **Données sensibles**:
   - Ne commitez jamais vos clés Stripe ou Formspree en dur
   - Les données critiques sont stockées en localStorage (côté client)
   - Pour une vraie sécurité, utilisez un backend (Node.js, Python, etc.)

3. 📧 **Formspree**:
   - Les emails de contact ne contiennent PAS les données de paiement
   - Les commandes sont envoyées séparément via Formspree

4. 💳 **Paiements Stripe**:
   - Les paiements ne passent JAMAIS par votre serveur
   - Redirection directe vers Stripe (PCI compliant)

5. 🛡️ **HTTPS**:
   - GitHub Pages active HTTPS automatiquement
   - Tous les paiements sont sécurisés

---

## 📱 Responsive Design

MaBoutique est 100% responsive:

- **Desktop** (> 1200px): Vue complète
- **Tablet** (768px - 1200px): Sidebar collapsée, grille optimisée
- **Mobile** (< 768px): Plein écran, menu hamburger

Testez sur tous les appareils avec DevTools (F12 > Toggle device toolbar).

---

## 🌍 Multilingue (FR/AR/EN)

L'interface change la direction RTL automatiquement pour l'arabe:

- 🇫🇷 Français: Gauche → Droite
- 🇸🇦 Arabe: Droite → Gauche
- 🇬🇧 Anglais: Gauche → Droite

Les utilisateurs peuvent changer la langue via les boutons dans le header.

---

## 🐛 Dépannage

### **Le site ne s'affiche pas**
- Vérifiez que le repository s'appelle `username.github.io` (exact)
- Attendez 2-3 minutes après le premier upload
- Allez dans **Settings** > **Pages** > Vérifiez que "main" est sélectionné

### **Les produits ne s'affichent pas**
- Ouvrez la console (F12) et vérifiez les erreurs
- Assurez-vous que `products.js` est chargé
- Videz le cache du navigateur (Ctrl+Shift+Del)

### **Les paiements Stripe ne fonctionnent pas**
- Vérifiez que l'URL du Payment Link est correctement enregistrée
- Testez le lien directement dans un nouvel onglet
- Utilisez le mode test de Stripe d'abord

### **Formspree ne reçoit pas les emails**
- Confirmez votre email chez Formspree
- Vérifiez que l'ID du formulaire est correct
- Testez avec le formulaire de contact

---

## 📞 Support & Ressources

- **Documentation GitHub Pages**: [pages.github.com](https://pages.github.com)
- **Aide Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Aide Formspree**: [formspree.io/help](https://formspree.io/help)
- **MDN Web Docs**: [mdn.org](https://mdn.org)

---

## 🎯 Checklist Final

Avant de lancer publiquement:

- [ ] Repository GitHub créé et nommé correctement
- [ ] Fichiers uploadés dans la racine
- [ ] Site accessible sur `username.github.io`
- [ ] Stripe Payment Link configuré et testé
- [ ] Formspree ID configuré et testé
- [ ] Produits ajoutés via l'Admin
- [ ] Couleurs/logo personnalisés
- [ ] Textes traduits dans les 3 langues
- [ ] Sitemap soumis à Google Search Console
- [ ] Analytics configuré
- [ ] Dossier `/admin/` renommé (optionnel mais recommandé)
- [ ] Mobile responsive testé

---

## 📝 License

MaBoutique est une solution open-source. Vous êtes libre de l'utiliser, modifier et partager.

---

**Développé avec ❤️ pour les artisans algériens**

Bonne chance avec MaBoutique! 🚀
