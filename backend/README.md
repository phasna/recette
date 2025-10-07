# 🚀 Backend API - Structure Organisée

## 📁 Architecture du projet

```
backend/
├── controllers/           # Contrôleurs (logique métier)
│   └── recipeController.js
├── middleware/           # Middlewares personnalisés
│   ├── errorHandler.js   # Gestion des erreurs
│   ├── logger.js         # Logging des requêtes
│   └── validation.js     # Validation des données
├── routes/               # Routes organisées
│   ├── index.js          # Routeur principal
│   └── recipes.js        # Routes des recettes
├── config.js             # Configuration
├── database.js           # Connexion à la base de données
└── server.js             # Serveur principal
```

## 🔧 Structure des fichiers

### 1. **server.js** - Point d'entrée

- Configuration des middlewares globaux
- Montage des routes
- Gestion des erreurs
- Démarrage du serveur

### 2. **routes/index.js** - Routeur principal

- Centralise toutes les routes
- Montage des sous-routes
- Route de test générale

### 3. **routes/recipes.js** - Routes des recettes

- Routes CRUD pour les recettes
- Middlewares de validation
- Appel aux contrôleurs

### 4. **controllers/recipeController.js** - Logique métier

- Fonctions de traitement des données
- Interaction avec la base de données
- Gestion des réponses

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

## 🛠️ Avantages de cette structure

### ✅ **Séparation des responsabilités**

- **Routes** : Définition des endpoints
- **Contrôleurs** : Logique métier
- **Middlewares** : Fonctionnalités transversales
- **Modèles** : Interaction avec la base de données

### ✅ **Maintenabilité**

- Code organisé et modulaire
- Facile à comprendre et modifier
- Réutilisabilité des composants

### ✅ **Scalabilité**

- Facile d'ajouter de nouvelles routes
- Middlewares réutilisables
- Structure extensible

### ✅ **Gestion des erreurs**

- Middleware centralisé
- Logging automatique
- Validation robuste

## 🚀 API Endpoints

### Recettes

- `GET /api/recipes` - Récupérer toutes les recettes
- `GET /api/recipes/:id` - Récupérer une recette par ID
- `POST /api/recipes` - Créer une nouvelle recette
- `PUT /api/recipes/:id` - Mettre à jour une recette
- `DELETE /api/recipes/:id` - Supprimer une recette

### Test

- `GET /api/test` - Tester la connexion API

## 🔍 Validation des données

### Champs requis pour les recettes

- `title` (string, max 255 caractères)
- `ingredients` (string)
- `instructions` (string)

### Champs optionnels

- `description` (string)
- `prep_time` (number, positif)
- `cook_time` (number, positif)
- `servings` (number, positif)
- `difficulty` (enum: "Facile", "Moyen", "Difficile")

## 📊 Gestion des erreurs

### Codes de statut HTTP

- `200` - Succès
- `201` - Créé avec succès
- `400` - Erreur de validation
- `404` - Ressource non trouvée
- `500` - Erreur serveur
- `503` - Service indisponible

### Format des erreurs

```json
{
  "error": "Description de l'erreur",
  "field": "Champ concerné (optionnel)",
  "details": "Détails supplémentaires (optionnel)"
}
```

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start
```

## 🧪 Test de l'API

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

## 📝 Logs

Le serveur log automatiquement :

- Toutes les requêtes entrantes
- Les réponses avec codes de statut
- Les erreurs détaillées
- Les informations de connexion

## 🔧 Configuration

Modifiez `config.js` pour ajuster :

- Paramètres de base de données
- Port du serveur
- Autres configurations
