# Architecture MVC du Backend

## 📋 Vue d'ensemble

Le backend a été restructuré pour suivre le modèle MVC (Model-View-Controller) de manière stricte. Cette architecture sépare clairement les responsabilités et améliore la maintenabilité du code.

## 🏗️ Structure MVC

```
backend/
├── models/              # Modèles (Couche de données)
│   ├── User.js         # Modèle utilisateur avec méthodes CRUD
│   ├── Recipe.js       # Modèle recette avec méthodes CRUD
│   └── Favorite.js     # Modèle favoris avec méthodes CRUD
├── controllers/         # Contrôleurs (Logique métier)
│   ├── userController.js
│   ├── recipeController.js
│   └── favoriteController.js
├── routes/             # Routes (Points d'entrée API)
│   ├── users.js
│   ├── recipes.js
│   ├── favorites.js
│   └── index.js
├── middleware/         # Middlewares
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── logger.js
└── database.js         # Configuration de la base de données
```

## 📦 Les Modèles (Models)

Les modèles encapsulent toute la logique de données et les requêtes SQL. Ils fournissent une interface propre pour interagir avec la base de données.

### User.js

**Méthodes d'instance:**

- `validate()` - Valider les données de l'utilisateur
- `create(hashedPassword)` - Créer un nouvel utilisateur
- `update(hashedPassword)` - Mettre à jour un utilisateur
- `delete()` - Supprimer un utilisateur
- `getFullName()` - Obtenir le nom complet
- `getInitials()` - Obtenir les initiales
- `getPublicData()` - Obtenir les données publiques (sans mot de passe)
- `toJSON()` - Convertir en JSON

**Méthodes statiques:**

- `findById(id)` - Récupérer un utilisateur par ID
- `findByLoginField(loginField)` - Récupérer par username ou email
- `exists(username, email)` - Vérifier si un utilisateur existe
- `findAll()` - Récupérer tous les utilisateurs

### Recipe.js

**Méthodes d'instance:**

- `validate()` - Valider les données de la recette
- `create()` - Créer une nouvelle recette
- `update()` - Mettre à jour une recette
- `delete()` - Supprimer une recette
- `share(options)` - Partager/retirer du partage une recette
- `toJSON()` - Convertir en JSON

**Méthodes statiques:**

- `findById(id)` - Récupérer une recette par ID
- `findAll(userId)` - Récupérer toutes les recettes (avec filtre optionnel par utilisateur)
- `findShared(limit)` - Récupérer les recettes partagées
- `belongsToUser(recipeId, userId)` - Vérifier si une recette appartient à un utilisateur

### Favorite.js

**Méthodes d'instance:**

- `add()` - Ajouter une recette aux favoris
- `remove()` - Supprimer une recette des favoris
- `toJSON()` - Convertir en JSON

**Méthodes statiques:**

- `isFavorite(userId, recipeId)` - Vérifier si une recette est favorite
- `findByUserId(userId)` - Récupérer tous les favoris d'un utilisateur
- `recipeExists(recipeId)` - Vérifier si une recette existe
- `findById(id)` - Récupérer un favori par ID
- `deleteByRecipeId(recipeId)` - Supprimer tous les favoris d'une recette
- `deleteByUserId(userId)` - Supprimer tous les favoris d'un utilisateur

## 🎮 Les Contrôleurs (Controllers)

Les contrôleurs contiennent la logique métier et utilisent les modèles pour interagir avec la base de données. Ils ne contiennent **AUCUNE** requête SQL directe.

### userController.js

- `getAllUsers()` - Liste tous les utilisateurs (admin)
- `getUserById()` - Récupère un utilisateur par ID
- `createUser()` - Inscription (création + hashage du mot de passe + JWT)
- `loginUser()` - Connexion (vérification + JWT)
- `updateUser()` - Mise à jour du profil
- `deleteUser()` - Suppression du compte
- `getProfile()` - Récupère le profil de l'utilisateur connecté

### recipeController.js

- `getAllRecipes()` - Liste toutes les recettes (filtrées par utilisateur si connecté)
- `getRecipeById()` - Récupère une recette par ID
- `createRecipe()` - Crée une nouvelle recette avec validation
- `updateRecipe()` - Met à jour une recette avec validation
- `deleteRecipe()` - Supprime une recette
- `shareRecipe()` - Partage/retire une recette (avec vérification de propriété)
- `getSharedRecipes()` - Liste les recettes partagées publiquement

### favoriteController.js

- `addToFavorites()` - Ajoute une recette aux favoris (avec vérifications)
- `removeFromFavorites()` - Retire une recette des favoris
- `checkFavoriteStatus()` - Vérifie si une recette est favorite
- `getUserFavorites()` - Liste tous les favoris d'un utilisateur

## 🛣️ Les Routes (Routes)

Les routes définissent les endpoints de l'API et appliquent les middlewares appropriés.

### users.js

```javascript
// Publiques
POST   /api/users/register       - Inscription
POST   /api/users/login          - Connexion

// Protégées (authentification requise)
GET    /api/users/profile        - Profil de l'utilisateur connecté
PUT    /api/users/profile        - Mise à jour du profil
DELETE /api/users/profile        - Suppression du compte

// Admin
GET    /api/users                - Liste tous les utilisateurs
GET    /api/users/:id            - Récupère un utilisateur par ID
```

### recipes.js

```javascript
GET    /api/recipes              - Liste toutes les recettes
GET    /api/recipes/:id          - Récupère une recette par ID
POST   /api/recipes              - Crée une nouvelle recette
PUT    /api/recipes/:id          - Met à jour une recette
DELETE /api/recipes/:id          - Supprime une recette
POST   /api/recipes/:id/share    - Partage/retire une recette
GET    /api/recipes/shared/public - Liste les recettes partagées
```

### favorites.js

```javascript
// Toutes les routes nécessitent une authentification
POST   /api/favorites            - Ajoute aux favoris
POST   /api/favorites/add/:recipeId - Ajoute aux favoris (alt)
DELETE /api/favorites/:recipeId   - Retire des favoris
POST   /api/favorites/remove/:recipeId - Retire des favoris (alt)
GET    /api/favorites/check/:recipeId - Vérifie le statut favori
GET    /api/favorites            - Liste tous les favoris
```

## 🔄 Flux de données

### Exemple: Création d'une recette

1. **Route** (`POST /api/recipes`)

   ```javascript
   router.post("/", validateRecipe, recipeController.createRecipe);
   ```

2. **Middleware de validation** (`validateRecipe`)

   - Valide les données entrantes

3. **Contrôleur** (`recipeController.createRecipe`)

   ```javascript
   const recipe = new Recipe(req.body);
   const validation = recipe.validate();
   if (!validation.isValid) return error;
   const recipeId = await recipe.create();
   ```

4. **Modèle** (`Recipe.create()`)
   ```javascript
   async create() {
     // Exécute la requête SQL INSERT
     // Retourne l'ID de la recette créée
   }
   ```

## ✨ Avantages de cette architecture

### 1. Séparation des préoccupations

- **Modèles**: Gèrent uniquement les données
- **Contrôleurs**: Gèrent uniquement la logique métier
- **Routes**: Gèrent uniquement le routage et les middlewares

### 2. Réutilisabilité

- Les modèles peuvent être utilisés par différents contrôleurs
- Les méthodes des modèles sont réutilisables

### 3. Testabilité

- Chaque couche peut être testée indépendamment
- Les mocks sont plus faciles à créer

### 4. Maintenabilité

- Le code est mieux organisé
- Les modifications sont plus faciles à localiser
- Moins de duplication de code

### 5. Scalabilité

- Facile d'ajouter de nouvelles fonctionnalités
- Facile d'ajouter de nouveaux modèles/contrôleurs

## 🔧 Utilisation des Promises

Tous les modèles utilisent des **Promises** au lieu de callbacks pour une meilleure gestion asynchrone:

```javascript
// ❌ Ancien style (callbacks imbriqués)
db.query(query, (err, results) => {
  if (err) {
    // gérer l'erreur
  } else {
    // gérer les résultats
  }
});

// ✅ Nouveau style (async/await avec Promises)
try {
  const results = await Model.findAll();
  // gérer les résultats
} catch (err) {
  // gérer l'erreur
}
```

## 📝 Validation

La validation se fait à deux niveaux:

1. **Middleware de validation** (routes)

   - Validation basique des données entrantes
   - Vérification des types et formats

2. **Méthode validate() des modèles**
   - Validation métier approfondie
   - Règles spécifiques au domaine

## 🔐 Sécurité

- Les mots de passe sont hashés avec **bcryptjs**
- L'authentification utilise des **JWT tokens**
- Les requêtes SQL utilisent des **paramètres préparés** (protection contre les injections SQL)
- Les données sensibles sont filtrées via `getPublicData()`

## 🚀 Pour démarrer

```bash
# Installer les dépendances
cd backend
npm install

# Démarrer le serveur
npm start

# Le serveur démarre sur http://localhost:3000
# API disponible sur http://localhost:3000/api
```

## 📊 Comparaison Avant/Après

### Avant (Contrôleur avec SQL direct)

```javascript
getAllRecipes: (req, res) => {
  const query = "SELECT * FROM recipes WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: results });
  });
};
```

### Après (MVC avec Modèle)

```javascript
// Contrôleur
getAllRecipes: async (req, res) => {
  try {
    const recipes = await Recipe.findAll(userId);
    res.json({ data: recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Modèle
static async findAll(userId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM recipes WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
}
```

## 🎯 Résultat

Le backend conserve **exactement les mêmes fonctionnalités** qu'avant, mais avec:

- ✅ Une meilleure organisation du code
- ✅ Une séparation claire des responsabilités
- ✅ Une architecture MVC complète et professionnelle
- ✅ Un code plus maintenable et évolutif
- ✅ Aucune modification nécessaire côté frontend

---

**Documentation créée le:** $(date +"%d/%m/%Y")
**Architecture:** MVC (Model-View-Controller)
**Base de données:** MySQL
**ORM:** Aucun (SQL natif avec Promises)
