# 🧊 API Assistant Vide-Frigo - Documentation

## 📡 Endpoint de Recherche

### POST `/api/fridge-assistant/search`

Recherche des recettes basées sur les ingrédients disponibles.

---

## 🔑 Authentification

**Optionnelle** - L'API fonctionne avec ou sans authentification :

- **Avec authentification** : Récupère les recettes de l'utilisateur + recettes partagées
- **Sans authentification** : Récupère uniquement les recettes partagées publiquement

```javascript
// Avec token
headers: {
  'Authorization': 'Bearer YOUR_TOKEN',
  'Content-Type': 'application/json'
}

// Sans token
headers: {
  'Content-Type': 'application/json'
}
```

---

## 📥 Requête

### Format

```http
POST http://localhost:3000/api/fridge-assistant/search
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN (optionnel)

{
  "ingredients": ["Œufs", "Lait", "Farine"],
  "minMatchPercentage": 50
}
```

### Paramètres

| Paramètre            | Type          | Requis | Description                                              |
| -------------------- | ------------- | ------ | -------------------------------------------------------- |
| `ingredients`        | Array<string> | ✅ Oui | Liste des ingrédients disponibles                        |
| `minMatchPercentage` | Number        | ❌ Non | Pourcentage minimum de correspondance (0-100). Défaut: 0 |

---

## 📤 Réponse

### Succès (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Crêpes Maison",
      "description": "Délicieuses crêpes faites maison",
      "ingredients": "Farine\nŒufs\nLait\nSucre\nSel",
      "instructions": "Mélanger tous les ingrédients...",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "Facile",
      "user_id": 3,
      "is_shared": 1,
      "created_at": "2025-01-15T10:30:00.000Z",
      "username": "chef_pro",
      "first_name": "Marie",
      "last_name": "Dupont",

      // Données de correspondance
      "matchPercentage": 80,
      "matchCount": 4,
      "totalIngredients": 5,
      "foundIngredients": ["Œufs", "Lait", "Farine"],
      "missingIngredients": ["Sucre", "Sel"]
    },
    {
      "id": 2,
      "title": "Omelette Simple",
      "matchPercentage": 50,
      "matchCount": 1,
      "totalIngredients": 2,
      "foundIngredients": ["Œufs"],
      "missingIngredients": ["Sel"]
    }
  ],
  "count": 2,
  "searchCriteria": {
    "ingredients": ["Œufs", "Lait", "Farine"],
    "minMatchPercentage": 50
  }
}
```

### Erreur - Ingrédients manquants (400 Bad Request)

```json
{
  "success": false,
  "error": "Veuillez fournir au moins un ingrédient"
}
```

### Erreur - Serveur (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Erreur lors de la recherche de recettes",
  "details": "Message d'erreur détaillé"
}
```

---

## 📊 Calcul du Pourcentage de Correspondance

Le `matchPercentage` est calculé comme suit :

```
matchPercentage = (matchCount / totalIngredients) × 100
```

### Exemples :

**Recette : Crêpes** (5 ingrédients : Farine, Œufs, Lait, Sucre, Sel)

| Ingrédients disponibles                      | matchCount | matchPercentage |
| -------------------------------------------- | ---------- | --------------- |
| `["Œufs"]`                                   | 1          | 20%             |
| `["Œufs", "Lait"]`                           | 2          | 40%             |
| `["Œufs", "Lait", "Farine"]`                 | 3          | 60%             |
| `["Œufs", "Lait", "Farine", "Sucre"]`        | 4          | 80%             |
| `["Œufs", "Lait", "Farine", "Sucre", "Sel"]` | 5          | 100%            |

---

## 🧪 Exemples de Requêtes

### 1. Recherche Basique

```javascript
fetch("http://localhost:3000/api/fridge-assistant/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
  body: JSON.stringify({
    ingredients: ["Œufs", "Lait"],
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 2. Recherche avec Filtre de Pourcentage

```javascript
fetch("http://localhost:3000/api/fridge-assistant/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
  body: JSON.stringify({
    ingredients: ["Œufs", "Lait", "Farine"],
    minMatchPercentage: 70, // Seulement les recettes à 70% ou plus
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 3. Recherche Sans Authentification

```javascript
fetch("http://localhost:3000/api/fridge-assistant/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ingredients: ["Tomate", "Oignon", "Ail"],
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 4. Avec cURL

```bash
curl -X POST http://localhost:3000/api/fridge-assistant/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "ingredients": ["Œufs", "Lait", "Farine"],
    "minMatchPercentage": 50
  }'
```

---

## 🔍 Normalisation des Ingrédients

L'API normalise automatiquement les ingrédients pour une meilleure correspondance :

### 1. Insensible à la Casse

```javascript
(("Œufs" === "œufs") === "ŒUFS") === "ŒuFs";
```

### 2. Suppression des Accents

```javascript
"crème" === "creme";
"Pâtes" === "pates";
```

### 3. Recherche Inclusive

```javascript
"Tomate" trouve → "tomates", "tomate fraîche", "200g de tomates", etc.
```

---

## ⚡ Performance

### Optimisations Intégrées

1. **Requête SQL Optimisée**

   - Une seule requête pour récupérer toutes les recettes
   - Jointure efficace avec la table users

2. **Traitement Côté Serveur**

   - Normalisation une seule fois
   - Filtrage et tri optimisés

3. **Limite des Résultats**
   - `missingIngredients` limité à 5 éléments par recette
   - Tri par pourcentage décroissant

---

## 🔒 Sécurité

### Validations

1. **Ingrédients** : Doit être un array non vide
2. **minMatchPercentage** : Doit être un nombre entre 0 et 100
3. **Token JWT** : Validé si fourni

### Accès aux Recettes

| Type de recette                  | Sans token | Avec token |
| -------------------------------- | ---------- | ---------- |
| Recettes publiques (is_shared=1) | ✅ Oui     | ✅ Oui     |
| Recettes de l'utilisateur        | ❌ Non     | ✅ Oui     |

---

## 🐛 Débogage

### Activer les Logs

Les logs sont automatiquement affichés dans la console du serveur :

```
🔍 Recherche API avec ingrédients: [ 'Œufs', 'Lait' ]
📊 Pourcentage minimum: 50
📋 Recettes trouvées en DB: 10
✅ Recettes correspondantes: 3
```

### Logs Frontend (Console Navigateur)

```javascript
🔍 Recherche API avec: ["Œufs", "Lait"]
✅ Résultats API: 3 recettes trouvées
📊 Détails: [{...}, {...}, {...}]
```

---

## 📝 Notes Importantes

1. **Ordre des Résultats** : Toujours triés du plus haut au plus bas pourcentage
2. **Déduplication** : Les recettes de l'utilisateur ne sont pas dupliquées avec les recettes partagées
3. **Ingrédients Vides** : Les recettes sans ingrédients ont un `matchPercentage` de 0%
4. **Token Expiré** : Si le token est expiré, seules les recettes publiques sont retournées

---

## 🚀 Améliorations Futures Possibles

- [ ] Cache Redis pour les recherches fréquentes
- [ ] Recherche par synonymes (ex: "poulet" = "volaille")
- [ ] Support de la recherche floue (Levenshtein distance)
- [ ] Pagination des résultats
- [ ] Recherche par catégorie de recettes
- [ ] Filtre par difficulté et temps de préparation
- [ ] Recherche multilingue

---

## 📞 Support

Pour toute question ou problème :

1. Vérifiez que le backend est démarré : `cd backend && npm start`
2. Consultez les logs du serveur
3. Consultez les logs de la console navigateur (F12)
4. Vérifiez le format de votre requête JSON

---

**Happy Cooking! 🧊👨‍🍳**
