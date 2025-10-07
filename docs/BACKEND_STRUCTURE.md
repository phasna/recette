# 🏗️ Structure du Backend Restructuré

## 📁 Architecture des dossiers

```
backend/
├── 📁 controllers/           # Logique métier
│   └── recipeController.js   # Contrôleur des recettes
├── 📁 middleware/           # Middlewares personnalisés
│   ├── errorHandler.js       # Gestion des erreurs
│   ├── logger.js             # Logging des requêtes
│   └── validation.js         # Validation des données
├── 📁 routes/                # Routes organisées
│   ├── index.js              # Routeur principal
│   └── recipes.js             # Routes des recettes
├── 📄 config.js              # Configuration
├── 📄 database.js            # Connexion DB
├── 📄 server.js              # Serveur principal
└── 📄 test-api.js            # Tests de l'API
```

## 🔄 Flux de données

```
Requête HTTP
    ↓
server.js (middlewares globaux)
    ↓
routes/index.js (routeur principal)
    ↓
routes/recipes.js (routes spécifiques)
    ↓
middleware/validation.js (validation)
    ↓
controllers/recipeController.js (logique métier)
    ↓
database.js (base de données)
    ↓
Réponse HTTP
```

## 🛠️ Composants détaillés

### 1. **server.js** - Point d'entrée

```javascript
// Configuration des middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Montage des routes
app.use("/api", apiRoutes);

// Gestion des erreurs
app.use(errorHandler);
```

### 2. **routes/index.js** - Routeur principal

```javascript
// Centralise toutes les routes
router.use("/recipes", recipesRoutes);
router.get("/test", (req, res) => { ... });
```

### 3. **routes/recipes.js** - Routes des recettes

```javascript
// Routes CRUD avec middlewares
router.get("/", recipeController.getAllRecipes);
router.post("/", validateRecipe, recipeController.createRecipe);
router.put("/:id", validateId, validateRecipe, recipeController.updateRecipe);
```

### 4. **controllers/recipeController.js** - Logique métier

```javascript
// Fonctions de traitement
const recipeController = {
  getAllRecipes: (req, res) => { ... },
  createRecipe: (req, res) => { ... },
  updateRecipe: (req, res) => { ... },
  deleteRecipe: (req, res) => { ... }
};
```

### 5. **middleware/** - Middlewares personnalisés

#### **validation.js**

- `validateRecipe` : Validation des données de recette
- `validateId` : Validation des IDs

#### **errorHandler.js**

- `errorHandler` : Gestion globale des erreurs
- `notFound` : Routes non trouvées

#### **logger.js**

- `logger` : Logging des requêtes
- `errorLogger` : Logging des erreurs

## 🚀 Avantages de cette structure

### ✅ **Séparation des responsabilités**

- **Routes** : Définition des endpoints uniquement
- **Contrôleurs** : Logique métier isolée
- **Middlewares** : Fonctionnalités transversales
- **Base de données** : Accès aux données centralisé

### ✅ **Maintenabilité**

- Code organisé et modulaire
- Facile à comprendre et modifier
- Réutilisabilité des composants
- Tests unitaires possibles

### ✅ **Scalabilité**

- Facile d'ajouter de nouvelles routes
- Middlewares réutilisables
- Structure extensible
- Séparation claire des préoccupations

### ✅ **Gestion des erreurs**

- Middleware centralisé
- Logging automatique
- Validation robuste
- Messages d'erreur cohérents

## 📊 Comparaison avant/après

### ❌ **Avant (monolithique)**

```javascript
// Tout dans server.js
app.get("/api/recipes", (req, res) => {
  // Logique de validation
  // Logique métier
  // Accès à la base de données
  // Gestion des erreurs
});
```

### ✅ **Après (structuré)**

```javascript
// server.js - Configuration
app.use("/api", apiRoutes);

// routes/recipes.js - Routes
router.get("/", recipeController.getAllRecipes);

// controllers/recipeController.js - Logique
getAllRecipes: (req, res) => { ... }

// middleware/validation.js - Validation
validateRecipe: (req, res, next) => { ... }
```

## 🧪 Tests

### Script de test automatique

```bash
cd backend
npm test
```

### Tests manuels

```bash
# Test de base
curl http://localhost:5000/api/test

# Récupérer toutes les recettes
curl http://localhost:5000/api/recipes

# Créer une recette
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","ingredients":"Test","instructions":"Test"}'
```

## 🔧 Configuration

### Variables d'environnement

```javascript
// config.js
module.exports = {
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "recipe_app",
  },
  port: process.env.PORT || 5000,
};
```

## 📝 Logs et monitoring

### Logs automatiques

- Toutes les requêtes entrantes
- Codes de statut des réponses
- Erreurs détaillées
- Informations de connexion

### Format des logs

```
[2024-01-15T10:30:00.000Z] GET /api/recipes - IP: 127.0.0.1
[2024-01-15T10:30:00.100Z] Response: 200
```

## 🚀 Démarrage

```bash
# Installation
npm install

# Développement
npm run dev

# Production
npm start

# Tests
npm test
```

Cette structure garantit un code propre, maintenable et évolutif ! 🎉
