# Guide : Ajouter des profils de politiciens

Ce guide explique comment ajouter de nouveaux profils de référence (politiciens, personnalités) au comparateur.

## 📍 Emplacement du fichier

Les profils de référence sont définis dans :
```
src/data/referenceProfiles.ts
```

## ➕ Ajouter un nouveau profil

### 1. Structure d'un profil

```typescript
{
  id: "melenchon",              // Identifiant unique (en minuscules, sans espaces)
  name: "Jean-Luc Mélenchon",   // Nom affiché
  description: "Leader de LFI", // Description courte
  color: "#E53935",             // Couleur pour le graphique (hex)
  isReference: true,            // Toujours true pour les profils de référence
  answers: {                    // Réponses aux questions
    "q1": 0,                    // 0 = Tout à fait d'accord
    "q2": 6,                    // 6 = Pas du tout d'accord
    // ... etc
  }
}
```

### 2. Échelle des réponses

Chaque réponse est un nombre de **0 à 6** :

| Valeur | Signification              |
|--------|----------------------------|
| 0      | Tout à fait d'accord       |
| 1      | D'accord                   |
| 2      | Plutôt d'accord            |
| 3      | Neutre                     |
| 4      | Plutôt pas d'accord        |
| 5      | Pas d'accord               |
| 6      | Pas du tout d'accord       |

### 3. Comment déterminer les réponses ?

Pour chaque question dans `src/data/questions.json`, évaluez la position probable du politicien :

1. **Lisez la question** (champ `text`)
2. **Consultez l'explication** (champ `explanation`)
3. **Vérifiez le pôle favorisé** (champ `favoredPole`) :
   - Si `"favoredPole": "left"` → être d'accord (0-2) = position de gauche
   - Si `"favoredPole": "right"` → être d'accord (0-2) = position de droite
4. **Attribuez une note** basée sur les déclarations/votes du politicien

### 4. Exemple pratique

Pour la question :
```json
{
  "id": "q1",
  "text": "Les salariés d'une entreprise devraient pouvoir voter ses décisions...",
  "favoredPole": "left"
}
```

- **Mélenchon** (gauche radicale) → `"q1": 0` (tout à fait d'accord)
- **Macron** (centre) → `"q1": 4` (plutôt pas d'accord)
- **Le Pen** (droite nationaliste) → `"q1": 4` (plutôt pas d'accord)

### 5. Choix des couleurs

Utilisez des couleurs distinctives :

```typescript
// Exemples de couleurs
"#E53935"  // Rouge (gauche)
"#1565C0"  // Bleu (droite)
"#43A047"  // Vert (écologie)
"#FFB300"  // Jaune/or (centre)
"#8E24AA"  // Violet (autre)
```

## 🎯 Méthode rapide : Profil partiel

Vous n'êtes **pas obligé** de répondre aux 100+ questions. Le système fonctionne avec un sous-ensemble :

```typescript
{
  id: "nouveau",
  name: "Nouveau Politicien",
  description: "Parti XYZ",
  color: "#FF5722",
  isReference: true,
  answers: {
    // Répondez aux 20-30 questions les plus importantes
    "q1": 2,
    "q5": 4,
    "q10": 1,
    // Les autres questions seront calculées comme "neutre" (3)
  }
}
```

**Astuce** : Concentrez-vous sur les questions qui représentent les axes principaux (économie, société, écologie, souveraineté).

## 🔧 Tester votre profil

1. Ajoutez le profil dans `referenceProfiles.ts`
2. Relancez l'app : `npm run dev`
3. Complétez le quiz
4. Allez dans l'onglet **"Comparateur"**
5. Cliquez sur le nom du politicien
6. Vérifiez que le graphique radar semble cohérent

## 📊 Profils actuels

Actuellement définis (à remplir avec les vraies positions) :
- Jean-Luc Mélenchon (LFI)
- Emmanuel Macron (Renaissance)
- Marine Le Pen (RN)
- Fabien Roussel (PCF)
- Yannick Jadot (EELV)

## 💡 Sources recommandées

Pour déterminer les positions :
- **Programmes électoraux** officiels
- **Votes à l'Assemblée** sur des lois clés
- **Déclarations publiques** sur les sujets
- **Sites de fact-checking** (Décodex, AFP Factuel)
- **Compass politiques** existants (Political Compass, etc.)

## ⚠️ Important

Les profils de référence sont des **approximations** basées sur les positions publiques. Ils ne reflètent pas parfaitement toute la complexité d'une pensée politique réelle.

Privilégiez :
- Les positions **officielles** (programme, votes)
- Sur les positions **incertaines**, utilisez "neutre" (3)
- La **cohérence** plutôt que la précision absolue
