# 🐙 Guide : Créer le repo GitHub et déployer sur Vercel

## 📋 Prérequis

- Compte GitHub (gratuit)
- Git installé sur votre PC
- Votre code prêt dans : `C:\Users\cherc\Downloads\my-politest\my-politest`

---

## 🚀 Étape 1 : Créer le repo sur GitHub (2 min)

### Option A : Via l'interface web (plus simple)

1. **Aller sur GitHub** : https://github.com/new

2. **Remplir les informations** :
   ```
   Repository name: polarity-quiz
   Description: Test de positionnement politique interactif 🗳️
   Public ✅ (ou Private si vous préférez)

   ❌ NE PAS cocher "Add a README file"
   ❌ NE PAS ajouter .gitignore
   ❌ NE PAS choisir de licence (pour l'instant)
   ```

3. **Cliquer sur "Create repository"**

4. **Noter l'URL du repo** :
   ```
   https://github.com/VOTRE-USERNAME/polarity-quiz
   ```

---

## 💻 Étape 2 : Initialiser Git localement (3 min)

Ouvrez PowerShell ou Git Bash et exécutez :

```bash
# 1. Aller dans le dossier du projet
cd "C:\Users\cherc\Downloads\my-politest\my-politest"

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le premier commit
git commit -m "Initial commit: Polarity Quiz v1.0.0"

# 5. Renommer la branche en 'main' (si besoin)
git branch -M main

# 6. Ajouter le remote (REMPLACER VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/polarity-quiz.git

# 7. Pousser le code sur GitHub
git push -u origin main
```

### ⚠️ Si vous avez une erreur d'authentification

**Windows** :
```bash
# Git va vous demander vos credentials
# Utilisez votre Personal Access Token (PAT) au lieu du mot de passe
```

**Créer un PAT** :
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Cocher `repo` (full control)
4. Générer et copier le token
5. Utiliser ce token comme mot de passe

---

## ✅ Étape 3 : Vérifier que ça a marché

1. Aller sur : `https://github.com/VOTRE-USERNAME/polarity-quiz`
2. Vous devriez voir tous vos fichiers ! 🎉

---

## 🌐 Étape 4 : Déployer sur Vercel (2 min)

### Via l'interface web (recommandé)

1. **Aller sur** : https://vercel.com/new

2. **Se connecter avec GitHub**
   - Cliquer sur "Continue with GitHub"
   - Autoriser Vercel à accéder à vos repos

3. **Importer le repo**
   - Chercher `polarity-quiz`
   - Cliquer sur "Import"

4. **Configurer le projet**
   ```
   Project Name: polarity-quiz
   Framework Preset: Vite (détecté automatiquement ✅)
   Root Directory: ./
   Build Command: npm run build (auto ✅)
   Output Directory: dist (auto ✅)
   Install Command: npm install (auto ✅)
   ```

5. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre 1-2 minutes ⏳
   - ✅ Votre site est en ligne !

6. **Votre URL**
   ```
   https://polarity-quiz.vercel.app
   ```
   (ou un nom généré aléatoirement)

---

## 🎯 Étape 5 : Configurer un nom de domaine custom (optionnel)

### Option 1 : Sous-domaine Vercel gratuit

1. Dans Vercel → Settings → Domains
2. Ajouter : `polarityquiz.vercel.app`
3. Valider

### Option 2 : Nom de domaine personnel

1. Acheter un domaine (ex: `polarityquiz.com` sur Namecheap, OVH, etc.)
2. Dans Vercel → Settings → Domains
3. Ajouter votre domaine
4. Configurer les DNS selon les instructions Vercel

---

## 🔄 Workflow de mise à jour

Après avoir créé le repo, pour mettre à jour votre site :

```bash
# 1. Faire vos modifications dans le code

# 2. Commiter les changements
git add .
git commit -m "Description des changements"

# 3. Pousser sur GitHub
git push

# 4. Vercel rebuild automatiquement ! 🎉
# → Votre site sera mis à jour en ~1 minute
```

---

## 📊 Étape 6 : Vérifier GoatCounter

1. Aller sur votre site : `https://polarity-quiz.vercel.app`
2. Cliquer sur "Commencer le test"
3. Attendre 30 secondes
4. Aller sur : `https://[VOTRE-CODE].goatcounter.com`
5. Vous devriez voir la visite ! ✅

---

## 🛠️ Commandes Git utiles

```bash
# Voir le status
git status

# Voir l'historique
git log --oneline

# Annuler les modifications non commitées
git checkout .

# Créer une nouvelle branche
git checkout -b nom-de-branche

# Changer de branche
git checkout main

# Voir les remotes
git remote -v

# Mettre à jour depuis GitHub
git pull
```

---

## ❌ Dépannage

### "Git is not recognized"
→ Installer Git : https://git-scm.com/download/win

### "Permission denied (publickey)"
→ Utiliser HTTPS au lieu de SSH :
```bash
git remote set-url origin https://github.com/VOTRE-USERNAME/polarity-quiz.git
```

### "Failed to push"
→ Vérifier que vous avez les droits sur le repo
→ Utiliser un Personal Access Token (voir Étape 2)

### "Vercel build failed"
→ Vérifier que `npm run build` fonctionne en local
→ Regarder les logs dans Vercel

---

## ✅ Checklist finale

- [ ] Repo GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Repo visible sur github.com/VOTRE-USERNAME/polarity-quiz
- [ ] Projet importé dans Vercel
- [ ] Site déployé avec succès
- [ ] Site accessible sur l'URL Vercel
- [ ] GoatCounter configuré (index.html modifié)
- [ ] GoatCounter reçoit les données
- [ ] README.md mis à jour avec votre URL
- [ ] Hébergeur complété dans Footer.tsx

---

## 🎊 Vous avez terminé !

Votre workflow complet :
```
1. Modifier le code localement
2. git add . && git commit -m "message"
3. git push
4. Vercel rebuild automatiquement
5. Site mis à jour en ~1 minute ! 🚀
```

**Liens importants** :
- GitHub repo : `https://github.com/VOTRE-USERNAME/polarity-quiz`
- Site web : `https://polarity-quiz.vercel.app`
- Analytics : `https://[VOTRE-CODE].goatcounter.com`
- Vercel dashboard : `https://vercel.com/dashboard`

---

Besoin d'aide ?
- Email : polarityquiz@gmail.com
- GitHub Issues : https://github.com/VOTRE-USERNAME/polarity-quiz/issues
