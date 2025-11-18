# 📊 Guide Analytics & Hébergement - Polarity Quiz

## ✅ Ce qui a été implémenté

### Analytics GoatCounter (100% gratuit, anti-bot, RGPD-friendly)

✅ **Fonctionnalités trackées** :
- Nombre de visiteurs uniques
- Tests démarrés
- Tests complétés
- Mode explorateur activé
- Partages (par plateforme : Twitter, WhatsApp, Facebook, Discord, copie de lien)

✅ **Conforme RGPD** :
- Pas de cookies
- Pas d'adresse IP stockée
- Données anonymes
- Anti-bot intégré
- Politique de confidentialité mise à jour

---

## 🚀 Étape 1 : Créer votre compte GoatCounter

### Option A : GoatCounter hébergé (RECOMMANDÉ - Le plus simple)

1. **Allez sur** : https://www.goatcounter.com/signup

2. **Créez votre compte gratuit** :
   - Choisissez un code (ex: `polarityquiz`)
   - Votre dashboard sera : `https://polarityquiz.goatcounter.com`
   - Email : `polarityquiz@gmail.com`
   - Mot de passe : (créez-en un fort)

3. **Activez votre compte** via l'email reçu

4. **Récupérez votre code** :
   - Votre code = le nom que vous avez choisi
   - Exemple : si votre URL est `polarityquiz.goatcounter.com`, votre code est `polarityquiz`

### Option B : GoatCounter self-hosted (Gratuit mais plus technique)

Si vous voulez l'héberger vous-même (pas recommandé pour débuter) :
- Guide : https://github.com/arp242/goatcounter
- Nécessite un serveur (VPS, etc.)
- Plus complexe mais 100% sous votre contrôle

---

## ⚙️ Étape 2 : Configurer le code GoatCounter

### Dans le fichier `index.html`

**Fichier** : `C:\Users\cherc\Downloads\my-politest\my-politest\index.html`

**Ligne 11** : Remplacez `YOUR-CODE` par votre code GoatCounter

```html
<!-- AVANT -->
<script data-goatcounter="https://YOUR-CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>

<!-- APRÈS (exemple avec le code "polarityquiz") -->
<script data-goatcounter="https://polarityquiz.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

**C'est tout !** 🎉 Le tracking est maintenant actif.

---

## 📈 Étape 3 : Accéder à votre dashboard

1. Allez sur : `https://[VOTRE-CODE].goatcounter.com`
2. Connectez-vous avec votre email/mot de passe
3. Vous verrez :
   - **Visiteurs uniques par jour**
   - **Pages les plus visitées**
   - **Événements** (test démarré, complété, partagé, etc.)
   - **Navigateurs et appareils**
   - **Graphiques d'évolution**

### Événements trackés automatiquement :

| Événement | Chemin | Signification |
|-----------|--------|---------------|
| Page d'accueil | `/` | Visiteur sur la page d'accueil |
| Test démarré | `/events/test-started` | Utilisateur clique sur "Commencer le test" |
| Test complété | `/events/test-completed` | Utilisateur termine le test |
| Mode explorateur | `/events/explorer-mode` | Utilisateur clique sur "Explorer les profils" |
| Partage Twitter | `/events/share-twitter` | Partage sur Twitter |
| Partage WhatsApp | `/events/share-whatsapp` | Partage sur WhatsApp |
| Partage Facebook | `/events/share-facebook` | Partage sur Facebook |
| Partage Discord | `/events/share-discord` | Partage sur Discord |
| Copie du lien | `/events/share-copy-link` | Copie du lien de partage |

---

## 🌐 Hébergement GRATUIT avec URL propre

Voici les **meilleures options gratuites** pour héberger votre app :

### Option 1 : **Vercel** ⭐ RECOMMANDÉ

**Pourquoi** : Le plus simple, le plus rapide, URL propre

**Avantages** :
- ✅ 100% gratuit pour les projets personnels
- ✅ URL personnalisée gratuite : `polarityquiz.vercel.app`
- ✅ Possibilité d'ajouter un nom de domaine custom
- ✅ Déploiement en 2 minutes
- ✅ HTTPS automatique
- ✅ CDN global ultra-rapide
- ✅ Hébergé en Europe (RGPD OK)

**Comment déployer** :

1. **Créer un compte** : https://vercel.com/signup
   - Connectez-vous avec GitHub

2. **Installer Vercel CLI** (optionnel) :
   ```bash
   npm i -g vercel
   ```

3. **Déployer** :

   **Option A - Via l'interface web** (plus simple) :
   - Allez sur https://vercel.com/new
   - Importez votre projet GitHub
   - Vercel détecte automatiquement Vite
   - Cliquez sur "Deploy"
   - **C'est tout !** 🎉

   **Option B - Via CLI** :
   ```bash
   cd "C:\Users\cherc\Downloads\my-politest\my-politest"
   vercel
   ```
   - Suivez les instructions
   - Choisissez un nom de projet (ex: `polarityquiz`)

4. **Votre URL** :
   - `https://polarityquiz.vercel.app` (gratuit)
   - Ou ajoutez un domaine custom (ex: `polarityquiz.com`)

**Prix** :
- ✅ Gratuit : Bande passante illimitée
- ✅ 100 déploiements/jour
- ✅ HTTPS gratuit

---

### Option 2 : **Netlify**

**Pourquoi** : Alternative solide à Vercel

**Avantages** :
- ✅ 100% gratuit
- ✅ URL : `polarityquiz.netlify.app`
- ✅ Domaine custom possible
- ✅ HTTPS automatique
- ✅ Très simple

**Comment déployer** :

1. **Créer un compte** : https://app.netlify.com/signup

2. **Option A - Drag & Drop** :
   - Buildez votre app : `npm run build`
   - Glissez le dossier `dist/` sur Netlify
   - **C'est tout !**

3. **Option B - GitHub** :
   - Connectez votre repo GitHub
   - Netlify build automatiquement

**Prix** :
- ✅ Gratuit : 100GB bande passante/mois
- ✅ HTTPS gratuit

---

### Option 3 : **Cloudflare Pages**

**Pourquoi** : Le plus rapide au monde

**Avantages** :
- ✅ 100% gratuit (illimité)
- ✅ URL : `polarityquiz.pages.dev`
- ✅ CDN le plus rapide du monde
- ✅ HTTPS gratuit
- ✅ Bande passante illimitée

**Comment déployer** :

1. **Créer un compte** : https://dash.cloudflare.com/sign-up

2. **Aller dans Pages** : https://pages.cloudflare.com/

3. **Créer un projet** :
   - Connectez GitHub
   - Sélectionnez votre repo
   - Build command : `npm run build`
   - Build output : `dist`
   - Cliquez sur "Deploy"

**Prix** :
- ✅ Gratuit : VRAIMENT illimité
- ✅ Déploiements illimités

---

### Option 4 : **GitHub Pages** (Gratuit mais URL moins propre)

**Pourquoi** : Si vous avez déjà GitHub

**URL** : `https://[votre-username].github.io/polarity-quiz`

**Avantages** :
- ✅ 100% gratuit
- ✅ Intégré à GitHub
- ⚠️ URL moins propre

**Comment déployer** :

1. Installer `gh-pages` :
   ```bash
   npm install --save-dev gh-pages
   ```

2. Ajouter dans `package.json` :
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. Déployer :
   ```bash
   npm run deploy
   ```

---

## 🏆 **Comparaison des hébergeurs**

| Hébergeur | URL Gratuite | Bande passante | Facilité | Vitesse | Note |
|-----------|--------------|----------------|----------|---------|------|
| **Vercel** | `*.vercel.app` | Illimitée | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🥇 |
| **Cloudflare Pages** | `*.pages.dev` | Vraiment illimitée | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🥇 |
| **Netlify** | `*.netlify.app` | 100GB/mois | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🥈 |
| **GitHub Pages** | `username.github.io/repo` | 100GB/mois | ⭐⭐⭐ | ⭐⭐⭐ | 🥉 |

---

## 🎯 **Ma recommandation : Vercel**

**Pourquoi Vercel** :
1. Le plus simple pour débuter
2. URL propre : `polarityquiz.vercel.app`
3. Déploiement automatique depuis GitHub
4. Bande passante illimitée
5. Support gratuit

**URL finale** :
- Gratuite : `https://polarityquiz.vercel.app`
- Avec domaine custom : `https://polarityquiz.com` (11€/an pour .com)

---

## 🔄 Workflow complet

### 1. Avant le premier déploiement

```bash
cd "C:\Users\cherc\Downloads\my-politest\my-politest"

# 1. Modifier index.html (remplacer YOUR-CODE par votre code GoatCounter)

# 2. Tester en local
npm run dev

# 3. Vérifier que tout fonctionne
# - Cliquez sur "Commencer le test"
# - Complétez le test
# - Partagez les résultats
# - Vérifiez la console (ne doit pas avoir d'erreurs)

# 4. Builder
npm run build

# 5. Tester le build en local
npm run preview
```

### 2. Déploiement sur Vercel

```bash
# Option 1 : Via l'interface web
# → Aller sur vercel.com, importer le projet GitHub

# Option 2 : Via CLI
vercel
```

### 3. Après le déploiement

1. **Testez votre site** : `https://polarityquiz.vercel.app`

2. **Vérifiez GoatCounter** :
   - Allez sur `https://[VOTRE-CODE].goatcounter.com`
   - Faites un test sur votre site
   - Attendez 10 secondes
   - Rafraîchissez le dashboard GoatCounter
   - Vous devriez voir la visite apparaître ! 🎉

3. **Partagez votre site** :
   - Twitter, Reddit, Facebook, etc.
   - Regardez les stats monter dans GoatCounter !

---

## 📊 Exemples de stats que vous verrez

Après quelques jours, vous verrez dans GoatCounter :

```
📈 Statistiques (exemple)
- Visiteurs uniques : 234
- Tests démarrés : 189 (81%)
- Tests complétés : 142 (75% des démarrés)
- Mode explorateur : 45 (19%)

🔗 Partages
- Twitter : 23
- WhatsApp : 18
- Copie du lien : 34
- Facebook : 12
- Discord : 8

📱 Appareils
- Mobile : 65%
- Desktop : 35%
```

Ces données vous permettront de :
- Savoir combien de personnes utilisent votre app
- Identifier les plateformes de partage populaires
- Optimiser pour mobile si besoin
- Voir le taux de complétion

---

## ✅ Checklist finale

Avant de publier :

- [ ] Compte GoatCounter créé
- [ ] Code GoatCounter mis dans `index.html`
- [ ] Build réussi : `npm run build`
- [ ] Test en local : `npm run preview`
- [ ] Hébergeur choisi (Vercel recommandé)
- [ ] Site déployé
- [ ] Test sur le site en production
- [ ] GoatCounter fonctionne (vérifier le dashboard après une visite)
- [ ] Mentions légales et hébergeur remplis dans Footer.tsx
- [ ] Tout fonctionne ! 🎉

---

## 🆘 Besoin d'aide ?

### GoatCounter ne track pas ?

1. Vérifiez que le code dans `index.html` est correct
2. Ouvrez la console du navigateur (F12)
3. Cherchez des erreurs liées à `goatcounter`
4. Attendez 10-30 secondes (le tracking n'est pas instantané)
5. Vérifiez que vous n'êtes pas en mode développement (npm run dev)

### Hébergement bloqué ?

- Vérifiez que le build fonctionne : `npm run build`
- Regardez les logs de l'hébergeur
- Contactez le support (gratuit sur Vercel/Netlify)

---

**Temps total pour tout setup** : ~15 minutes
**Coût total** : 0€ 🎉

Bon déploiement ! 🚀
