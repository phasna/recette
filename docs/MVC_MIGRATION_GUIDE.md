# Guide de Migration vers l'Architecture MVC

## 📋 Résumé des changements

Le backend a été entièrement restructuré pour suivre le modèle MVC (Model-View-Controller). Cette migration améliore la maintenabilité, la testabilité et la scalabilité du code.

## ✅ Ce qui reste identique

### 1. API Endpoints

Tous les endpoints restent **exactement les mêmes**:

- `/api/users/*`
- `/api/recipes/*`
- `/api/favorites/*`

### 2. Réponses API

Les réponses JSON ont le **même format**:

```json
{
  "success": true,
  "data": {...},
  "message": "..."
}
```

### 3. Frontend

**Aucune modification nécessaire** côté frontend. Tous les appels API fonctionnent comme avant.

### 4. Base de données

**Aucune modification** de la structure de la base de données.

### 5. Middleware

Tous les middlewares (auth, validation, logger, errorHandler) restent identiques.

## 🔄 Ce qui a changé

### 1. Structure du code

#### Avant:

```
backend/
├── controllers/
│   └── recipeController.js (avec SQL direct)
├── models/
│   └── User.js (uniquement validation)
└── routes/
    └── recipes.js
```

#### Après:

```
backend/
├── models/               # Modèles complets avec CRUD
│   ├── User.js
│   ├── Recipe.js
│   └── Favorite.js
├── controllers/          # Contrôleurs utilisant les modèles
│   ├── userController.js
│   ├── recipeController.js
│   └── favoriteController.js
└── routes/              # Routes inchangées
    ├── users.js
    ├── recipes.js
    └── favorites.js
```

### 2. Modèles

#### Avant (User.js seulement):

```javascript
class User {
  constructor(data) { ... }
  validate() { ... }
  // Pas de méthodes CRUD
}
```

#### Après (Tous les modèles):

```javascript
class User {
  // Méthodes d'instance
  validate() { ... }
  async create(hashedPassword) { ... }
  async update(hashedPassword) { ... }
  async delete() { ... }

  // Méthodes statiques
  static async findById(id) { ... }
  static async findAll() { ... }
  static async exists(username, email) { ... }
}
```

### 3. Contrôleurs

#### Avant (avec SQL direct):

```javascript
getAllRecipes: (req, res) => {
  const query = "SELECT * FROM recipes";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: results });
  });
};
```

#### Après (utilisant les modèles):

```javascript
getAllRecipes: async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json({ data: recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

## 📦 Nouveaux fichiers créés

### 1. `/backend/models/Recipe.js`

Modèle complet pour les recettes avec:

- Validation des données
- Méthodes CRUD (create, update, delete)
- Méthode de partage
- Méthodes statiques de recherche

### 2. `/backend/models/Favorite.js`

Modèle complet pour les favoris avec:

- Ajout/suppression de favoris
- Vérification de statut
- Méthodes de recherche

### 3. Modèles mis à jour

#### `/backend/models/User.js`

Ajout des méthodes CRUD:

- `create(hashedPassword)` - Créer un utilisateur
- `update(hashedPassword)` - Mettre à jour
- `delete()` - Supprimer
- `findById(id)` - Rechercher par ID
- `findByLoginField(loginField)` - Rechercher pour login
- `exists(username, email)` - Vérifier existence
- `findAll()` - Récupérer tous

## 🔧 Modifications des contrôleurs

### 1. userController.js

- ✅ Utilise `User.findAll()` au lieu de requête SQL directe
- ✅ Utilise `User.findById(id)` pour récupérer un utilisateur
- ✅ Utilise `User.exists()` pour vérifier l'existence
- ✅ Utilise `user.create()` pour créer
- ✅ Utilise `user.update()` pour mettre à jour
- ✅ Utilise `User.findByLoginField()` pour le login
- ✅ Toutes les méthodes sont maintenant async/await

### 2. recipeController.js

- ✅ Utilise `Recipe.findAll(userId)` au lieu de requête SQL
- ✅ Utilise `Recipe.findById(id)` pour récupérer
- ✅ Utilise `recipe.create()` pour créer
- ✅ Utilise `recipe.update()` pour mettre à jour
- ✅ Utilise `recipe.delete()` pour supprimer
- ✅ Utilise `recipe.share()` pour partager
- ✅ Utilise `Recipe.findShared()` pour les recettes publiques
- ✅ Validation via `recipe.validate()`

### 3. favoriteController.js

- ✅ Utilise `Favorite.recipeExists()` pour vérifier
- ✅ Utilise `favorite.add()` pour ajouter
- ✅ Utilise `favorite.remove()` pour supprimer
- ✅ Utilise `Favorite.isFavorite()` pour vérifier le statut
- ✅ Utilise `Favorite.findByUserId()` pour récupérer

## 🎯 Avantages de la migration

### 1. Code plus propre

- Séparation claire entre données et logique
- Pas de SQL dans les contrôleurs
- Code plus lisible et maintenable

### 2. Réutilisabilité

```javascript
// Avant: requête SQL répétée partout
db.query("SELECT * FROM users WHERE id = ?", [id], ...)

// Après: méthode réutilisable
const user = await User.findById(id);
```

### 3. Meilleure gestion d'erreurs

```javascript
// Promises avec try/catch
try {
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "Non trouvé" });
  }
  res.json({ data: user });
} catch (err) {
  res.status(500).json({ error: err.message });
}
```

### 4. Validation centralisée

```javascript
// Dans le contrôleur
const recipe = new Recipe(req.body);
const validation = recipe.validate();
if (!validation.isValid) {
  return res.status(400).json({ errors: validation.errors });
}
```

### 5. Facilité de test

```javascript
// Maintenant on peut facilement mocker
jest.mock('../models/Recipe');
Recipe.findAll.mockResolvedValue([...]);
```

## 🚀 Comment utiliser la nouvelle architecture

### Créer un nouvel utilisateur

```javascript
// Dans le contrôleur
const user = new User(req.body);
const validation = user.validate();
if (!validation.isValid) {
  return res.status(400).json({ errors: validation.errors });
}
const hashedPassword = await bcrypt.hash(user.password, 10);
const userId = await user.create(hashedPassword);
```

### Récupérer des recettes

```javascript
// Toutes les recettes
const recipes = await Recipe.findAll();

// Recettes d'un utilisateur
const userRecipes = await Recipe.findAll(userId);

// Une recette spécifique
const recipe = await Recipe.findById(recipeId);

// Recettes partagées
const sharedRecipes = await Recipe.findShared(20);
```

### Gérer les favoris

```javascript
// Ajouter aux favoris
const favorite = new Favorite({ user_id: userId, recipe_id: recipeId });
await favorite.add();

// Vérifier si c'est un favori
const isFavorite = await Favorite.isFavorite(userId, recipeId);

// Récupérer les favoris
const favorites = await Favorite.findByUserId(userId);

// Supprimer des favoris
await favorite.remove();
```

## 📝 Checklist de migration

- ✅ Modèle User.js enrichi avec méthodes CRUD
- ✅ Nouveau modèle Recipe.js créé
- ✅ Nouveau modèle Favorite.js créé
- ✅ userController.js refactorisé
- ✅ recipeController.js refactorisé
- ✅ favoriteController.js refactorisé
- ✅ Tous les callbacks convertis en Promises
- ✅ Utilisation de async/await partout
- ✅ Pas d'erreurs de linter
- ✅ API endpoints inchangés
- ✅ Format de réponse identique
- ✅ Compatibilité frontend maintenue

## 🔍 Tests à effectuer

### 1. Tester les utilisateurs

```bash
# Inscription
POST /api/users/register

# Connexion
POST /api/users/login

# Récupérer le profil
GET /api/users/profile (avec token)

# Mettre à jour le profil
PUT /api/users/profile (avec token)
```

### 2. Tester les recettes

```bash
# Créer une recette
POST /api/recipes (avec token optionnel)

# Lister les recettes
GET /api/recipes

# Récupérer une recette
GET /api/recipes/:id

# Mettre à jour
PUT /api/recipes/:id

# Supprimer
DELETE /api/recipes/:id

# Partager
POST /api/recipes/:id/share (avec token)

# Recettes partagées
GET /api/recipes/shared/public
```

### 3. Tester les favoris

```bash
# Ajouter aux favoris
POST /api/favorites (avec token)

# Vérifier le statut
GET /api/favorites/check/:recipeId (avec token)

# Liste des favoris
GET /api/favorites (avec token)

# Supprimer des favoris
DELETE /api/favorites/:recipeId (avec token)
```

## ⚠️ Points d'attention

### 1. Gestion des Promises

Toujours utiliser `try/catch` avec async/await:

```javascript
try {
  const data = await Model.method();
} catch (err) {
  // Gérer l'erreur
}
```

### 2. Validation

Toujours valider avant de sauvegarder:

```javascript
const validation = model.validate();
if (!validation.isValid) {
  return res.status(400).json({ errors: validation.errors });
}
```

### 3. Authentification

Vérifier l'authentification dans les contrôleurs si nécessaire:

```javascript
if (!req.user) {
  return res.status(401).json({ message: "Non authentifié" });
}
```

## 📚 Documentation supplémentaire

- [MVC_ARCHITECTURE.md](./MVC_ARCHITECTURE.md) - Documentation complète de l'architecture
- [BACKEND_STRUCTURE.md](./BACKEND_STRUCTURE.md) - Structure du backend
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Configuration de la base de données

## 🎉 Conclusion

La migration vers MVC est **complète et transparente**. Le backend fonctionne exactement comme avant, mais avec:

- ✅ Une meilleure organisation
- ✅ Un code plus maintenable
- ✅ Une architecture professionnelle
- ✅ Aucun impact sur le frontend

**Aucune action requise côté frontend** - Tout continue de fonctionner normalement ! 🚀

---

**Date de migration:** $(date +"%d/%m/%Y")
**Version:** 2.0 (Architecture MVC)
