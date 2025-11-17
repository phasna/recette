# 🧪 Guide des Tests Unitaires - Ajout de Recettes

## 📋 Vue d'ensemble

Ce guide explique comment exécuter les tests unitaires pour la fonctionnalité d'ajout de recettes. Les tests couvrent :

1. **Composant React** (`AddRecipe.jsx`)
2. **Modèle de données** (`Recipe.js`)
3. **Contrôleur backend** (`recipeController.js`)

---

## 🚀 Installation des dépendances

### Frontend (si nécessaire)

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Backend (si nécessaire)

```bash
cd backend
npm install --save-dev jest @babel/preset-env
```

---

## 🧪 Exécution des Tests

### Tests Frontend (React)

```bash
cd frontend
npm test
```

**Exécuter un test spécifique :**

```bash
# Test du composant AddRecipe
npm test AddRecipe.test.jsx

# Test du modèle Recipe
npm test Recipe.test.js

# Mode watch (surveille les changements)
npm test -- --watch

# Coverage (couverture de code)
npm test -- --coverage
```

### Tests Backend (Node.js)

```bash
cd backend
npm test
```

**Exécuter un test spécifique :**

```bash
# Test du contrôleur
node controllers/__tests__/recipeController.test.js
```

---

## 📁 Structure des Tests

```
frontend/
  src/
    pages/
      user/
        __tests__/
          AddRecipe.test.jsx    # Tests du composant React
    models/
      __tests__/
        Recipe.test.js          # Tests du modèle

backend/
  controllers/
    __tests__/
      recipeController.test.js  # Tests du contrôleur
```

---

## ✅ Tests Disponibles

### 1. Tests du Composant AddRecipe (`AddRecipe.test.jsx`)

#### Tests de rendu

- ✅ Affiche le titre de la page
- ✅ Affiche tous les champs du formulaire
- ✅ Affiche les boutons de soumission et d'annulation

#### Tests de validation

- ✅ Erreur si le titre est vide
- ✅ Erreur si la description est vide
- ✅ Erreur si les ingrédients sont vides
- ✅ Erreur si les instructions sont vides
- ✅ Erreur si le temps de préparation est négatif
- ✅ Erreur si le nombre de portions est invalide

#### Tests de soumission

- ✅ Envoie les données correctement au backend
- ✅ Affiche un message de succès après création
- ✅ Déclenche l'événement `recipeAdded`
- ✅ Redirige vers le dashboard après succès
- ✅ Affiche une erreur si la création échoue

#### Tests de gestion des images

- ✅ Permet de télécharger une image
- ✅ Affiche une erreur pour un fichier non-image

#### Tests d'accessibilité

- ✅ Redirige vers /auth si non connecté

---

### 2. Tests du Modèle Recipe (`Recipe.test.js`)

#### Tests de construction

- ✅ Crée une instance vide avec valeurs par défaut
- ✅ Initialise avec des données fournies

#### Tests de validation

- ✅ Valide une recette valide
- ✅ Rejette une recette sans titre
- ✅ Rejette un titre trop court/long
- ✅ Rejette une recette sans ingrédients
- ✅ Rejette des ingrédients trop courts
- ✅ Rejette une recette sans instructions
- ✅ Rejette une difficulté invalide
- ✅ Rejette des temps négatifs ou trop élevés
- ✅ Rejette un nombre de portions invalide

#### Tests de conversion

- ✅ Convertit en format API
- ✅ Crée une instance depuis des données API

#### Tests de méthodes utilitaires

- ✅ `isNew()` retourne true pour une nouvelle recette
- ✅ `clone()` crée une copie de la recette

---

### 3. Tests du Contrôleur Backend (`recipeController.test.js`)

#### Tests de création

- ✅ Crée une recette avec succès pour un utilisateur connecté
- ✅ Crée une recette avec succès sans utilisateur
- ✅ Retourne une erreur 400 si validation échoue
- ✅ Retourne une erreur 500 si création échoue
- ✅ Gère tous les champs optionnels (image_url, video_url)

---

## 📊 Résultats Attendus

### Tests Frontend

```bash
PASS  src/pages/user/__tests__/AddRecipe.test.jsx
  AddRecipe Component
    Rendu initial
      ✓ affiche le titre de la page (45ms)
      ✓ affiche tous les champs du formulaire (32ms)
      ...
    Validation des champs
      ✓ affiche une erreur si le titre est vide (28ms)
      ...
    Soumission du formulaire
      ✓ envoie les données correctement au backend (156ms)
      ...
```

### Tests Backend

```bash
PASS  controllers/__tests__/recipeController.test.js
  RecipeController
    createRecipe
      ✓ crée une recette avec succès pour un utilisateur connecté (12ms)
      ✓ crée une recette avec succès sans utilisateur (8ms)
      ...
```

---

## 🔧 Configuration Jest (si nécessaire)

### Frontend (`package.json` ou `jest.config.js`)

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  }
}
```

### Backend (`package.json` ou `jest.config.js`)

```json
{
  "jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "moduleFileExtensions": ["js", "json"],
    "testMatch": ["**/__tests__/**/*.js"]
  }
}
```

---

## 🐛 Debugging des Tests

### Mode verbose

```bash
npm test -- --verbose
```

### Mode debug

```bash
# Frontend
npm test -- --runInBand --no-cache

# Backend
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Afficher les console.log

Par défaut, Jest masque les `console.log`. Pour les voir :

```javascript
// Dans le test
console.log("Debug:", variable);
```

Ou utilisez `--verbose` :

```bash
npm test -- --verbose
```

---

## 📈 Couverture de Code

Générer un rapport de couverture :

```bash
npm test -- --coverage
```

Cela génère un rapport HTML dans `coverage/` montrant :

- Lignes couvertes
- Fonctions couvertes
- Branches couvertes
- Statements couverts

---

## 🎯 Bonnes Pratiques

### 1. Nommer les tests clairement

```javascript
test("affiche une erreur si le titre est vide", () => {
  // ...
});
```

### 2. Un test = une assertion principale

```javascript
test("valide une recette valide", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
    instructions: "Test instructions",
  });

  const validation = recipe.validate();
  expect(validation.isValid).toBe(true);
});
```

### 3. Utiliser des données de test réalistes

```javascript
const validRecipe = {
  title: "Pâtes Carbonara",
  description: "Un classique italien",
  ingredients: "400g spaghetti, 200g pancetta, 4 œufs",
  instructions: "1. Cuire les pâtes\n2. Préparer la sauce",
  prep_time: 15,
  cook_time: 20,
  servings: 4,
  difficulty: "Moyen",
};
```

### 4. Nettoyer après chaque test

```javascript
afterEach(() => {
  jest.clearAllMocks();
  fetch.mockClear();
});
```

---

## 🚨 Dépannage

### Erreur : "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "Test suite failed to run"

Vérifiez que tous les mocks sont correctement configurés et que les chemins d'import sont corrects.

### Tests qui échouent de manière intermittente

Vérifiez les timers (`setTimeout`) et utilisez `jest.useFakeTimers()` si nécessaire.

---

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)

---

## 🎉 Prochaines Étapes

1. ✅ Exécuter tous les tests
2. ✅ Vérifier la couverture de code (>80%)
3. ✅ Ajouter des tests pour les cas limites
4. ✅ Intégrer les tests dans CI/CD

---

**Créé le :** $(date)
**Dernière mise à jour :** $(date)
