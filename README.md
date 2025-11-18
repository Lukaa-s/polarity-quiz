# 🎯 Polarity Quiz

**Test de positionnement politique interactif** - Découvrez votre profil politique à travers plusieurs axes idéologiques.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VOTRE-USERNAME/polarity-quiz)

## 🌟 Fonctionnalités

- ✅ **Test politique complet** avec 14 axes idéologiques
- 📊 **Visualisation radar** interactive de vos résultats
- 🏆 **Système de badges** basé sur vos réponses
- 👥 **Profils de référence** pour comparer vos résultats avec des figures politiques
- 📱 **Partage sur réseaux sociaux** (Twitter, WhatsApp, Facebook, Discord)
- 🔍 **Mode explorateur** pour découvrir les profils politiques
- 💾 **Sauvegarde locale** de vos profils (localStorage)
- 📈 **Analytics anonyme** avec GoatCounter (conforme RGPD)

## 🚀 Démo

[Voir la démo en ligne](https://polarity-quiz.vercel.app) _(à remplacer par votre URL)_

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** - Build ultra-rapide
- **Tailwind CSS** - Styling
- **Recharts** - Graphiques radar
- **Framer Motion** - Animations
- **GoatCounter** - Analytics respectueux de la vie privée

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/VOTRE-USERNAME/polarity-quiz.git
cd polarity-quiz

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Builder pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 🔧 Configuration

### Analytics (optionnel)

1. Créer un compte sur [GoatCounter](https://www.goatcounter.com/signup)
2. Modifier `index.html` ligne 11 avec votre code :

```html
<script data-goatcounter="https://VOTRE-CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

## 🌐 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Cliquez sur le bouton ci-dessus
2. Importez votre fork du repo
3. Cliquez sur "Deploy"
4. Votre site est en ligne ! 🎉

### Autres options

- **Netlify** : Glissez le dossier `dist/` après `npm run build`
- **Cloudflare Pages** : Connectez votre repo GitHub
- **GitHub Pages** : Utilisez `gh-pages` branch

## 📊 Analytics

Le site utilise GoatCounter pour collecter des statistiques anonymes :

- ✅ Conforme RGPD
- ✅ Pas de cookies
- ✅ Pas d'IP stockées
- ✅ Anti-bot intégré
- ✅ Dashboard clair

**Données collectées** :
- Nombre de visiteurs
- Tests complétés
- Partages par plateforme
- Type d'appareil (mobile/desktop)

**Aucune donnée personnelle identifiable n'est collectée.**

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Structure du projet

```
polarity-quiz/
├── src/
│   ├── components/        # Composants React
│   │   ├── Footer.tsx
│   │   ├── QuestionEnhanced.tsx
│   │   └── ResultEnhanced.tsx
│   ├── data/             # Données (questions, axes, badges)
│   │   ├── questions.json
│   │   ├── axisexplaination.tsx
│   │   ├── badges.tsx
│   │   └── referenceProfiles.tsx
│   ├── utils/            # Utilitaires
│   │   ├── scoring.ts
│   │   ├── analytics.ts
│   │   ├── shareResults.ts
│   │   └── profiles.ts
│   └── App.tsx           # Composant principal
├── public/               # Assets statiques
└── index.html           # Point d'entrée
```

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Lukas VAUVERT**

- Email: polarityquiz@gmail.com
- GitHub: [@VOTRE-USERNAME](https://github.com/VOTRE-USERNAME)

## 🙏 Remerciements

- [GoatCounter](https://www.goatcounter.com/) pour l'analytics respectueux de la vie privée
- [Heroicons](https://heroicons.com/) pour les icônes
- [Recharts](https://recharts.org/) pour les graphiques

## 📈 Roadmap

- [ ] Mode sombre
- [ ] Multilingue (EN, ES, DE)
- [ ] Plus de profils de référence
- [ ] Export PDF des résultats
- [ ] API publique pour les résultats

---

**Fait avec ❤️ en France**
