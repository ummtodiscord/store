# 🛍 MaBoutique — E-commerce 100% Gratuit

Site e-commerce professionnel multilingue (FR/AR/EN) avec panel admin, chatbot intégré et double système de paiement (€ + DA).

---

## 🚀 Mise en ligne en 10 minutes

### Étape 1 — Créer le repo GitHub
1. Va sur [github.com](https://github.com) → **New repository**
2. Nom du repo : **`tonnom.github.io`** (remplace `tonnom` par ton pseudo GitHub)
3. Coche **Public** → **Create repository**

### Étape 2 — Uploader les fichiers
1. Dans le repo, clique **"uploading an existing file"**
2. Glisse **tous les fichiers et dossiers** du ZIP dans la zone
3. Clique **Commit changes**

### Étape 3 — Activer GitHub Pages
1. **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** → **/ (root)** → **Save**
4. Attends 2 minutes → Ton site est sur `https://tonnom.github.io` 🎉

---

## 💳 Configurer Stripe (paiements en ligne)

1. Crée un compte gratuit sur [stripe.com](https://stripe.com)
2. Dashboard → **Payment Links** → **New payment link**
3. Configure le montant ou laisse le client saisir le montant
4. Copie le lien `https://buy.stripe.com/...`
5. Ouvre `checkout.html` et remplace :
   ```js
   const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/TON_LIEN_ICI";
   ```

> Stripe prend 1,5% + 0,25€ par transaction. Pas d'abonnement.

---

## 📧 Configurer Formspree (commandes DZD par email)

1. Crée un compte sur [formspree.io](https://formspree.io) (50 emails/mois gratuits)
2. **New form** → copie ton **Form ID** (ex: `xabcdefg`)
3. Dans `checkout.html`, remplace :
   ```js
   const FORMSPREE_ID = "xabcdefg";
   ```
4. Dans `contact.html`, remplace l'action du formulaire :
   ```html
   action="https://formspree.io/f/xabcdefg"
   ```

---

## ⚙️ Panel Admin

Accès : `https://tonnom.github.io/admin/`

### Fonctionnalités :
| Section | Ce que tu peux faire |
|---------|---------------------|
| 📊 Tableau de bord | Stats, ventes, commandes récentes, graphiques |
| 📦 Commandes | Voir, gérer, changer le statut, exporter CSV |
| 🛍 Produits | Lister, éditer, supprimer, activer/désactiver |
| ➕ Ajouter produit | Nom FR/AR/EN, images (upload ou URL), prix €, stock, promo |
| 🎁 Promotions | Créer/gérer des codes promo (% ou montant fixe) |
| 📈 Statistiques | Répartition catégories, méthodes de paiement, stocks |
| ⚙️ Paramètres | Stripe, Formspree, taux EUR/DZD, CCP, bannière promo |

> ⚠️ **Sécurité** : L'admin est accessible sans mot de passe. Pour protéger, renomme le dossier `admin/` en quelque chose de difficile à deviner (ex: `gestion-x7k9m/`).

---

## 🌍 Ajouter / modifier vos produits

Dans l'admin → **Ajouter un produit** :
- Remplis les noms et descriptions en 3 langues
- Uploade des images (ou colle une URL)
- Définis le prix en euros (converti automatiquement en DA)
- Active/désactive les promos

Les produits sont sauvegardés dans le navigateur (`localStorage`). Ils persistent entre sessions sur le même navigateur.

---

## 🔍 Référencement Google (SEO)

1. Va sur [Google Search Console](https://search.google.com/search-console)
2. **Add property** → entre `https://tonnom.github.io`
3. Vérification : télécharge le fichier HTML fourni → uploade-le dans ton repo
4. **Sitemaps** → entre `sitemap.xml` → **Submit**

Google indexera ton site sous 1 à 7 jours.

---

## 💬 Chatbot

Le bot répond automatiquement à :
- Questions livraison, paiement, retours
- Contacts et horaires
- Codes promo
- Infos sur les produits (par nom)
- Salutations dans les 3 langues

Pour personnaliser les réponses, édite `assets/js/chatbot.js` → section `chatKnowledge`.

---

## 🎨 Personnalisation rapide

| Ce que tu veux changer | Où |
|------------------------|-----|
| Nom de la boutique | `_config.yml` + `admin/` → Paramètres |
| Couleur accent (or) | `assets/css/main.css` → `--gold: #d4af37` |
| Taux EUR→DZD | Admin → Paramètres → Taux |
| Logo texte | Cherche `Ma<span>Boutique</span>` dans les HTML |
| Bannière promo | Admin → Paramètres → Bannière |
| Coordonnées CCP | Admin → Paramètres → CCP |

---

## 📁 Structure des fichiers

```
maboutique/
├── index.html              → Accueil
├── shop.html               → Boutique / catalogue
├── product.html            → Fiche produit
├── checkout.html           → Commande + paiement
├── about.html              → À propos
├── contact.html            → Contact
├── sitemap.xml             → Pour Google
├── robots.txt              → Instructions moteurs
├── admin/
│   ├── index.html          → Panel administration
│   └── admin.css           → Styles admin
└── assets/
    ├── css/main.css        → Design complet
    └── js/
        ├── i18n.js         → Traductions FR/AR/EN
        ├── products.js     → Gestion catalogue
        ├── cart.js         → Panier + interface
        └── chatbot.js      → Bot pré-programmé
```

---

## 🔒 Sécurité & Confidentialité

- Aucune donnée n'est envoyée à un serveur tiers sauf :
  - Formspree (commandes DZD) → emails que tu reçois
  - Stripe (paiements €) → géré par Stripe directement
- Les produits et commandes sont stockés localement dans le navigateur (`localStorage`)
- Pour une boutique avec base de données centralisée, passer à Supabase (gratuit, 500MB) est recommandé à terme

---

Fait avec ❤️ pour les entrepreneurs algériens 🇩🇿
