# 🧪 Guide de Test - Assistant Vide-Frigo

## 🔍 Débogage avec la Console

### 1. Ouvrir la Console du Navigateur

- **Chrome/Edge** : Appuyez sur `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox** : Appuyez sur `F12` ou `Ctrl+Shift+K`
- Allez dans l'onglet **Console**

### 2. Vérifier le Chargement des Recettes

Quand vous ouvrez la page Vide-Frigo, vous devriez voir dans la console :

```
📋 Recettes utilisateur: 5
📋 Recettes partagées: 3
📋 Total recettes (dédupliquées): 8
📋 Première recette: {id: 1, title: "...", ingredients: "...", ...}
```

**Si vous voyez `Total recettes: 0`** → Vous devez ajouter des recettes !

### 3. Tester la Recherche

Ajoutez un ingrédient (ex: "Œufs"), vous devriez voir :

```
🔍 Recherche avec ingrédients: ["Œufs"]
🔍 Nombre de recettes à analyser: 8
✅ Recettes trouvées: 3
✅ Résultats: [{matchPercentage: 75, ...}, {...}, {...}]
```

**Si `Recettes trouvées: 0`** → Suivez les étapes ci-dessous

---

## 📝 Ajouter des Recettes de Test

Si vous n'avez pas de recettes ou aucun résultat, créez quelques recettes simples :

### Recette 1 : Omelette Simple

```
Titre: Omelette Simple
Ingrédients:
Œufs
Sel
Poivre
Beurre

Instructions:
Battre les œufs
Faire fondre le beurre dans une poêle
Verser les œufs battus
Cuire 2-3 minutes

Difficulté: Facile
```

### Recette 2 : Crêpes

```
Titre: Crêpes Maison
Ingrédients:
Farine
Œufs
Lait
Sucre
Sel

Instructions:
Mélanger la farine, les œufs et le lait
Ajouter une pincée de sel et le sucre
Laisser reposer 30 minutes
Faire cuire dans une poêle chaude

Difficulté: Facile
```

### Recette 3 : Salade de Tomates

```
Titre: Salade de Tomates
Ingrédients:
Tomate
Oignon
Huile d'olive
Sel
Poivre

Instructions:
Couper les tomates en rondelles
Émincer l'oignon
Assaisonner avec huile, sel et poivre

Difficulté: Facile
```

### Recette 4 : Pâtes au Fromage

```
Titre: Pâtes au Fromage
Ingrédients:
Pâtes
Fromage
Beurre
Sel
Poivre

Instructions:
Faire cuire les pâtes
Égoutter et ajouter le beurre
Ajouter le fromage râpé
Mélanger jusqu'à ce que le fromage fonde

Difficulté: Facile
```

**Important** : N'oubliez pas de **partager** au moins une recette pour qu'elle apparaisse dans les recettes publiques !

---

## 🧪 Scénarios de Test

### Test 1 : Recherche Simple

1. Ajoutez : **"Œufs"**
2. Résultat attendu : Omelette + Crêpes (50-75% match)

### Test 2 : Recherche Multiple

1. Ajoutez : **"Œufs"**, **"Lait"**, **"Farine"**
2. Résultat attendu : Crêpes (100% match), Omelette (33% match)

### Test 3 : Recherche avec Accent/Sans Accent

1. Ajoutez : **"oeufs"** (sans accent)
2. Résultat attendu : Même résultat qu'avec "Œufs" (normalisation active)

### Test 4 : Ajuster le Pourcentage

1. Ajoutez : **"Tomate"**
2. Mettez le curseur à **100%** → Seulement Salade de Tomates
3. Mettez le curseur à **0%** → Toutes les recettes avec tomate

### Test 5 : Ingrédients Communs

1. Cliquez sur les suggestions : **"Sel"**, **"Poivre"**
2. Résultat : Plusieurs recettes (ces ingrédients sont très communs)

---

## ❌ Problèmes Courants

### 1. "Aucune recette trouvée"

**Causes possibles :**

- Pas de recettes dans la base de données
- Les recettes n'ont pas d'ingrédients
- Le pourcentage minimum est trop élevé

**Solutions :**

```
✅ Vérifier dans la console : "Total recettes: X"
✅ Ajouter des recettes de test (voir ci-dessus)
✅ Réduire le pourcentage minimum à 0%
✅ Vérifier que vos recettes ont des ingrédients
```

### 2. "Les recettes ne matchent pas"

**Causes possibles :**

- Orthographe différente (Tomates vs Tomate)
- Ingrédients trop précis (200g de farine vs Farine)

**Solutions :**

```
✅ Utiliser des noms simples : "Tomate" au lieu de "Tomates cerises"
✅ La recherche est inclusive : "Tomate" trouvera "Tomates", "Tomate fraîche", etc.
```

### 3. "0 recettes chargées"

**Causes possibles :**

- Backend non démarré
- Problème de connexion API

**Solutions :**

```
✅ Vérifier que le backend tourne : cd backend && npm start
✅ Vérifier l'URL de l'API dans la console
✅ Vérifier les erreurs réseau (onglet Network dans F12)
```

---

## 🎯 Exemple de Test Complet

### Étape par Étape

1. **Ouvrir F12** → Onglet Console

2. **Aller sur Vide-Frigo**

   ```
   Vérifier : 📋 Total recettes: X (doit être > 0)
   ```

3. **Ajouter "Œufs"**

   ```
   Vérifier : 🔍 Recherche avec ingrédients: ["Œufs"]
   Vérifier : ✅ Recettes trouvées: X (doit être > 0)
   ```

4. **Cliquer sur une recette**

   ```
   Vérifier : Navigation vers /recipe/X
   Vérifier : Affichage des détails
   ```

5. **Retour et ajouter plus d'ingrédients**

   ```
   Ajouter "Lait" et "Farine"
   Vérifier : Le % de correspondance augmente
   ```

6. **Ajuster le curseur**
   ```
   Mettre à 80% → Moins de résultats
   Mettre à 30% → Plus de résultats
   ```

---

## 📊 Comprendre le Pourcentage de Match

Le pourcentage est calculé comme suit :

```
% Match = (Ingrédients que vous avez / Total ingrédients de la recette) × 100
```

### Exemples :

**Recette Crêpes** (5 ingrédients : Farine, Œufs, Lait, Sucre, Sel)

| Vous avez                      | Match | Calcul    |
| ------------------------------ | ----- | --------- |
| Œufs                           | 20%   | 1/5 × 100 |
| Œufs, Lait                     | 40%   | 2/5 × 100 |
| Œufs, Lait, Farine             | 60%   | 3/5 × 100 |
| Œufs, Lait, Farine, Sucre      | 80%   | 4/5 × 100 |
| Œufs, Lait, Farine, Sucre, Sel | 100%  | 5/5 × 100 |

---

## 🚀 Astuces pour de Meilleurs Résultats

1. **Commencez avec des ingrédients de base**

   - Œufs, Lait, Farine, Sucre sont très communs
   - Vous aurez plus de résultats

2. **Utilisez les suggestions**

   - Les ingrédients suggérés sont optimisés
   - Cliquez pour ajouter rapidement

3. **Ajustez le curseur selon vos besoins**

   - **100%** : Seulement les recettes que vous pouvez faire complètement
   - **50-70%** : Recettes où il ne manque que quelques ingrédients
   - **0-30%** : Toutes les recettes avec au moins un ingrédient

4. **Regardez les ingrédients manquants**
   - Chaque carte de recette affiche ce qu'il vous manque
   - Utile pour faire vos courses !

---

## 📱 Partager vos Retours

Si vous rencontrez un problème non listé ici :

1. **Copiez les logs de la console**
2. **Faites une capture d'écran**
3. **Notez les étapes pour reproduire le bug**

---

**Bon test et bonne cuisine ! 🧊👨‍🍳**
