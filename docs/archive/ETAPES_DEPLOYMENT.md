# 🎯 Étapes de déploiement - Polarity Quiz

## 📋 Vue d'ensemble

```
┌─────────────────┐
│  1. GoatCounter │  2 min
└─────────────────┘
         ↓
┌─────────────────┐
│  2. GitHub Repo │  3 min
└─────────────────┘
         ↓
┌─────────────────┐
│  3. Push Code   │  2 min
└─────────────────┘
         ↓
┌─────────────────┐
│  4. Vercel      │  2 min
└─────────────────┘
         ↓
┌─────────────────┐
│  5. Test Final  │  1 min
└─────────────────┘

Total : ~10 minutes
```

---

## ✅ Prérequis

- [ ] Node.js installé
- [ ] Git installé ([télécharger](https://git-scm.com/download/win))
- [ ] Compte GitHub (gratuit)
- [ ] Code dans `C:\Users\cherc\Downloads\my-politest\my-politest`

---

## 📊 Étape 1 : GoatCounter (2 min)

### Actions :

1. **Créer un compte** : https://www.goatcounter.com/signup
   ```
   Code       : polarityquiz (ou autre)
   Email      : polarityquiz@gmail.com
   Mot de passe : (créez-en un sécurisé)
   ```

2. **Activer le compte** via l'email reçu

3. **Noter votre code** : _______________

4. **Modifier `index.html`**
   - Ouvrir : `my-politest/index.html`
   - Ligne 11 : Remplacer `YOUR-CODE` par votre code
   ```html
   <script data-goatcounter="https://polarityquiz.goatcounter.com/count"
   ```

### Vérification :
- [ ] Compte GoatCounter créé
- [ ] Email confirmé
- [ ] Code noté
- [ ] `index.html` modifié

---

## 🐙 Étape 2 : Créer le repo GitHub (2 min)

### Actions :

1. **Aller sur** : https://github.com/new

2. **Remplir le formulaire** :
   ```
   Repository name : polarity-quiz
   Description     : Test de positionnement politique interactif 🗳️
   Visibility      : Public ✅ (ou Private)

   ❌ NE PAS cocher "Add a README file"
   ❌ NE PAS ajouter .gitignore
   ❌ NE PAS choisir de licence
   ```

3. **Cliquer** : "Create repository"

4. **Noter l'URL** : `https://github.com/VOTRE-USERNAME/polarity-quiz`

### Vérification :
- [ ] Repo créé sur GitHub
- [ ] URL notée
- [ ] Page du repo vide (c'est normal !)

---

## 💻 Étape 3 : Pousser le code sur GitHub (3 min)

### Actions :

1. **Ouvrir PowerShell**
   - Windows : `Win + X` → PowerShell

2. **Copier-coller ces commandes** (⚠️ Remplacer `VOTRE-USERNAME`) :

```powershell
# Aller dans le dossier du projet
cd "C:\Users\cherc\Downloads\my-politest\my-politest"

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Polarity Quiz v1.0.0"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (⚠️ REMPLACER VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/polarity-quiz.git

# Pousser sur GitHub
git push -u origin main
```

### Si demande d'authentification :
- **Username** : Votre username GitHub
- **Password** : [Personal Access Token](https://github.com/settings/tokens)
  - Créer un token avec permission `repo`
  - Copier le token
  - L'utiliser comme mot de passe

### Vérification :
- [ ] Commandes exécutées sans erreur
- [ ] Message "Branch 'main' set up to track..."
- [ ] Aller sur `https://github.com/VOTRE-USERNAME/polarity-quiz`
- [ ] Voir tous vos fichiers ! ✅

---

## 🚀 Étape 4 : Déployer sur Vercel (2 min)

### Actions :

1. **Aller sur** : https://vercel.com/new

2. **Se connecter avec GitHub**
   - Cliquer "Continue with GitHub"
   - Autoriser Vercel à accéder à vos repos

3. **Importer le repo**
   - Chercher `polarity-quiz` dans la liste
   - Cliquer "Import"

4. **Configuration** (tout est auto-détecté ✅) :
   ```
   Project Name       : polarity-quiz
   Framework Preset   : Vite (auto ✅)
   Root Directory     : ./
   Build Command      : npm run build (auto ✅)
   Output Directory   : dist (auto ✅)
   Install Command    : npm install (auto ✅)
   ```

5. **Déployer**
   - Cliquer "Deploy"
   - Attendre 1-2 minutes ⏳
   - Voir "Congratulations!" 🎉

6. **Noter votre URL**
   ```
   https://polarity-quiz-XXXXX.vercel.app
   ```

### Vérification :
- [ ] Déploiement réussi
- [ ] URL notée
- [ ] Site accessible (cliquer sur l'URL)
- [ ] Site fonctionne (tester "Commencer le test")

---

## ✅ Étape 5 : Test final (1 min)

### Actions :

1. **Tester le site**
   - Aller sur votre URL Vercel
   - Cliquer "Commencer le test"
   - Répondre à quelques questions
   - Compléter le test

2. **Vérifier GoatCounter** (attendre 30 secondes)
   - Aller sur : `https://polarityquiz.goatcounter.com`
   - Se connecter
   - Vérifier que la visite apparaît ! ✅

3. **Tester le partage**
   - Cliquer "Partager"
   - Essayer Twitter ou copier le lien
   - Vérifier que ça fonctionne

4. **Vérifier les mentions légales**
   - Scroller en bas
   - Cliquer "Mentions légales"
   - Vérifier que la modal s'ouvre
   - Cliquer "Politique de confidentialité"
   - Vérifier que ça fonctionne

### Vérification finale :
- [ ] Site fonctionne sur Vercel ✅
- [ ] Test complétable ✅
- [ ] GoatCounter reçoit les données ✅
- [ ] Partage fonctionne ✅
- [ ] Mentions légales accessibles ✅

---

## 🎊 C'est terminé !

Votre application est maintenant **EN LIGNE** ! 🚀

### Vos liens :

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Site web** | `https://polarity-quiz-XXXXX.vercel.app` | Votre application |
| 📊 **Analytics** | `https://polarityquiz.goatcounter.com` | Dashboard stats |
| 💻 **GitHub** | `https://github.com/VOTRE-USERNAME/polarity-quiz` | Code source |
| ⚡ **Vercel** | `https://vercel.com/dashboard` | Déploiements |

---

## 🔄 Prochaines étapes

### Pour mettre à jour votre site :

```bash
# 1. Modifier votre code

# 2. Commiter et pousser
git add .
git commit -m "Description des changements"
git push

# 3. Vercel rebuild automatiquement en ~1 minute ! 🎉
```

### Pour améliorer :

1. **Compléter l'hébergeur** dans `src/components/Footer.tsx` :
   ```
   Ligne 77 : Hébergeur : Vercel Inc.
   Ligne 80 : Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
   ```

2. **Mettre à jour le README.md** avec votre URL réelle

3. **Partager sur les réseaux sociaux** :
   - Twitter
   - Reddit (r/france, r/politique)
   - LinkedIn
   - Facebook

---

## 📊 Suivre vos statistiques

Dashboard GoatCounter : `https://polarityquiz.goatcounter.com`

Vous verrez :
- 📈 Visiteurs uniques par jour
- ✅ Tests démarrés
- ✅ Tests complétés
- 🔗 Partages par plateforme
- 📱 Mobile vs Desktop
- 📊 Graphiques d'évolution

---

## 🆘 Besoin d'aide ?

**Guides disponibles** :
- `DEPLOY_RAPIDE.txt` - Version ultra-courte
- `GITHUB_SETUP.md` - Guide GitHub détaillé
- `GIT_COMMANDS.txt` - Toutes les commandes Git
- `GUIDE_ANALYTICS_HEBERGEMENT.md` - Guide complet analytics

**Problèmes courants** :
- Git ne fonctionne pas ? → Installer : https://git-scm.com/download/win
- Erreur d'authentification ? → Créer un PAT : https://github.com/settings/tokens
- Build Vercel échoue ? → Vérifier que `npm run build` fonctionne en local

**Contact** :
- Email : polarityquiz@gmail.com

---

**Version** : 1.0.0
**Date** : 18 janvier 2025
**Auteur** : Lukas VAUVERT

🎉 **Félicitations pour votre déploiement !** 🎉
