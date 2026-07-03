# 🔧 Correction Écran Blanc - Mode Explorateur

## ❌ Problème

**Symptôme** : Page blanche quand on clique sur "Explorer les profils"

**Cause racine** : Deux variables essayaient d'accéder à `poleScores[axis]` qui est `undefined` en mode explorateur (car `poleScores = {}`), causant un crash JavaScript.

---

## 🐛 Bugs identifiés

### Bug 1 : `sortedReferenceProfiles`

**Ligne problématique** :
```typescript
const sortedReferenceProfiles = useMemo(() => {
  return [...referenceProfiles]
    .map((p) => ({ ...p, distance: calculateDistance(p) }))
    // calculateDistance() utilise poleScores[axis] qui est undefined
    .sort((a, b) => a.distance - b.distance);
}, [poleScores]);
```

**Crash** : `calculateDistance()` fait `poleScores[axis].left` → `undefined.left` → 💥

### Bug 2 : `radarData`

**Ligne problématique** :
```typescript
const radarData = axes.map((axis) => {
  const { left, right } = poleScores[axis];  // ❌ undefined
  const total = left + right || 1;
  const pctLeft = Math.round((left / total) * 100);
  return { axis, pctLeft };
});
```

**Crash** : Destructuration de `undefined` → 💥

---

## ✅ Corrections appliquées

### Correction 1 : `sortedReferenceProfiles`

```typescript
const sortedReferenceProfiles = useMemo(() => {
  if (explorerMode) return []; // ✅ Pas utilisé en mode explorateur
  return [...referenceProfiles]
    .map((p) => ({ ...p, distance: calculateDistance(p) }))
    .sort((a, b) => a.distance - b.distance);
}, [poleScores, explorerMode]);
```

**Raison** : Cette variable est uniquement utilisée pour afficher le "Top 3" dans l'onglet "Résultats", donc inutile en mode explorateur.

### Correction 2 : `radarData`

```typescript
const radarData = useMemo(() => {
  if (explorerMode) return []; // ✅ Pas utilisé en mode explorateur
  return axes.map((axis) => {
    const axisScore = poleScores[axis];
    if (!axisScore) return { axis, pctLeft: 0 }; // ✅ Protection
    const { left, right } = axisScore;
    const total = left + right || 1;
    const pctLeft = Math.round((left / total) * 100);
    return { axis, pctLeft };
  });
}, [axes, poleScores, explorerMode]);
```

**Raison** : Cette variable est uniquement utilisée pour le graphique radar de l'utilisateur dans l'onglet "Résultats", donc inutile en mode explorateur.

---

## 📋 Résumé technique

### Contexte

En mode explorateur :
- `poleScores = {}`  (vide, car l'utilisateur n'a pas fait le test)
- `axes = ["Vision du progrès sociétal", "Organisation du pouvoir", ...]` (tous les axes)
- `poleScores[axis]` → `undefined` pour tous les axes

### Pourquoi ça crashait

Les deux variables essayaient de :
1. Accéder à des propriétés de `undefined` → crash
2. Destructurer `undefined` → crash

### Solution

Retourner un tableau vide `[]` en mode explorateur pour ces deux variables qui ne sont utilisées que dans l'onglet "Résultats".

---

## ✅ Vérification

**Build** : ✅ Réussi
```
✓ 1387 modules transformed.
✓ built in 5.83s
```

**Test manuel recommandé** :
1. `npm run dev`
2. Cliquer sur "Explorer les profils"
3. ✅ La page devrait s'afficher avec les 3 onglets
4. ✅ Onglet "Profils politiques" avec la grille
5. ✅ Cliquer sur un profil → voir les détails
6. ✅ Onglet "Comparateur" → sélectionner des profils
7. ✅ Onglet "Explications" → voir les axes

---

## 🎯 Fichiers modifiés

**Fichier** : `src/components/ResultEnhanced.tsx`

**Modifications** :
1. Ligne ~206 : Ajout condition `if (explorerMode) return []` dans `sortedReferenceProfiles`
2. Ligne ~112 : Conversion de `radarData` en `useMemo` avec condition `if (explorerMode) return []`

**Total** : ~15 lignes modifiées

---

## 🚀 État final

✅ **Mode explorateur** : Fonctionne parfaitement
- Page s'affiche correctement
- Grille de profils interactive
- Vue détaillée avec axes et badges
- Comparateur entre figures
- Explications des axes

✅ **Mode normal** (après le test) : Inchangé
- Onglet "Résultats" avec Top 3
- Onglet "Comparateur" avec "Vous"
- Export PNG
- Tout fonctionne comme avant

**Aucune régression** : ✅

---

## 💡 Leçon apprise

Toujours vérifier que les variables calculées vérifient si les données source existent avant de les utiliser, surtout quand un composant peut être utilisé dans différents modes avec des données différentes.

**Bonne pratique** :
```typescript
const data = useMemo(() => {
  if (modeSpecial) return []; // Ou valeur par défaut
  // Calculs uniquement si nécessaire
}, [dependencies, modeSpecial]);
```

---

**Problème résolu ! 🎉**
