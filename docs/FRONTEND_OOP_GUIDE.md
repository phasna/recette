# 🏗️ Frontend Orienté Objet - Guide Complet

## 📁 Architecture du Frontend

```
frontend/src/
├── 📁 components/          # Composants React orientés objet
│   ├── RecipeCard.js       # Composant de carte de recette
│   ├── RecipeForm.js       # Composant de formulaire
│   └── index.js            # Export des composants
├── 📁 hooks/               # Hooks personnalisés
│   ├── useRecipes.js       # Hook de gestion des recettes
│   ├── useRecipeForm.js    # Hook de gestion des formulaires
│   └── index.js            # Export des hooks
├── 📁 models/               # Modèles de données
│   ├── Recipe.js           # Classe Recipe
│   └── index.js            # Export des modèles
├── 📁 services/             # Services API
│   ├── RecipeService.js    # Service des recettes
│   └── index.js            # Export des services
├── 📁 utils/                # Utilitaires
│   ├── RecipeUtils.js      # Utilitaires pour les recettes
│   └── index.js            # Export des utilitaires
├── App.js                   # Composant principal
├── index.js                 # Point d'entrée
└── index.css               # Styles Tailwind
```

## 🎯 Principes Orientés Objet

### 1. **Encapsulation**

- **Modèles** : Encapsulent les données et la logique métier
- **Services** : Encapsulent les appels API
- **Hooks** : Encapsulent la logique d'état
- **Composants** : Encapsulent l'interface utilisateur

### 2. **Séparation des responsabilités**

- **Modèles** : Gestion des données et validation
- **Services** : Communication avec l'API
- **Hooks** : Logique d'état et effets
- **Composants** : Rendu et interaction utilisateur

### 3. **Réutilisabilité**

- Classes et hooks réutilisables
- Composants modulaires
- Utilitaires statiques

## 🏛️ Architecture Détaillée

### **Modèles (Models)**

#### **Recipe.js** - Classe de données

```javascript
class Recipe {
  constructor(data = {}) { ... }
  validate() { ... }
  toAPI() { ... }
  getTotalTime() { ... }
  getFormattedTotalTime() { ... }
  getDifficultyColor() { ... }
  getSummary() { ... }
  clone() { ... }
  isNew() { ... }
  getIngredientsList() { ... }
  getInstructionsList() { ... }
}
```

**Responsabilités :**

- ✅ Validation des données
- ✅ Formatage pour l'API
- ✅ Calculs métier (temps total, etc.)
- ✅ Méthodes utilitaires

### **Services (Services)**

#### **RecipeService.js** - Service API

```javascript
class RecipeService {
  constructor(baseURL) { ... }
  setupInterceptors() { ... }
  handleError(error) { ... }
  getAllRecipes() { ... }
  getRecipeById(id) { ... }
  createRecipe(recipeData) { ... }
  updateRecipe(id, recipeData) { ... }
  deleteRecipe(id) { ... }
  testConnection() { ... }
}
```

**Responsabilités :**

- ✅ Communication avec l'API
- ✅ Gestion des erreurs
- ✅ Configuration des requêtes
- ✅ Logging automatique

### **Hooks Personnalisés**

#### **useRecipes.js** - Gestion des recettes

```javascript
const useRecipes = () => {
  // État
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Actions
  const loadRecipes = useCallback(async () => { ... });
  const createRecipe = useCallback(async (recipe) => { ... });
  const updateRecipe = useCallback(async (recipe) => { ... });
  const deleteRecipe = useCallback(async (id) => { ... });

  // Utilitaires
  const searchRecipes = useCallback((query) => { ... });
  const filterByDifficulty = useCallback((difficulty) => { ... });
  const sortRecipes = useCallback((sortBy) => { ... });

  return { recipes, loading, error, ... };
};
```

**Responsabilités :**

- ✅ Gestion de l'état global des recettes
- ✅ Actions CRUD
- ✅ Recherche et filtrage
- ✅ Gestion des erreurs

#### **useRecipeForm.js** - Gestion des formulaires

```javascript
const useRecipeForm = (initialRecipe) => {
  const [recipe, setRecipe] = useState(() =>
    initialRecipe ? initialRecipe.clone() : new Recipe()
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const updateField = useCallback((field, value) => { ... });
  const validateField = useCallback((field) => { ... });
  const validateAll = useCallback(() => { ... });
  const resetForm = useCallback(() => { ... });

  return { recipe, errors, updateField, ... };
};
```

**Responsabilités :**

- ✅ Gestion de l'état du formulaire
- ✅ Validation en temps réel
- ✅ Gestion des erreurs de champ
- ✅ Réinitialisation

### **Composants**

#### **RecipeCard.js** - Carte de recette

```javascript
class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
  }

  toggleExpanded = () => { ... };
  handleEdit = () => { ... };
  handleDelete = () => { ... };

  render() {
    // Rendu de la carte
  }
}
```

**Responsabilités :**

- ✅ Affichage d'une recette
- ✅ Gestion de l'expansion
- ✅ Actions (modifier/supprimer)
- ✅ Formatage des données

#### **RecipeForm.js** - Formulaire

```javascript
const RecipeForm = ({ initialRecipe, onSubmit, onCancel, isEditing }) => {
  const {
    recipe, errors, updateField, validateField, save
  } = useRecipeForm(initialRecipe);

  const handleSubmit = (e) => { ... };
  const handleCancel = () => { ... };
  const renderField = (field, label, type, options) => { ... };

  return (
    // Rendu du formulaire
  );
};
```

**Responsabilités :**

- ✅ Rendu du formulaire
- ✅ Validation des champs
- ✅ Gestion des erreurs
- ✅ Soumission

### **Utilitaires**

#### **RecipeUtils.js** - Utilitaires statiques

```javascript
class RecipeUtils {
  static formatTime(minutes) { ... }
  static getDifficultyColor(difficulty) { ... }
  static getDifficultyIcon(difficulty) { ... }
  static sortRecipes(recipes, sortBy, order) { ... }
  static filterRecipes(recipes, filters) { ... }
  static groupRecipes(recipes, groupBy) { ... }
  static getRecipeStats(recipes) { ... }
  static exportToJSON(recipes) { ... }
  static importFromJSON(jsonData) { ... }
}
```

**Responsabilités :**

- ✅ Formatage des données
- ✅ Tri et filtrage
- ✅ Statistiques
- ✅ Import/Export

## 🔄 Flux de Données

```
User Action
    ↓
Component (RecipeCard/RecipeForm)
    ↓
Hook (useRecipes/useRecipeForm)
    ↓
Service (RecipeService)
    ↓
API (Backend)
    ↓
Model (Recipe)
    ↓
Component Update
```

## 🎯 Avantages de l'Approche Orientée Objet

### ✅ **Maintenabilité**

- Code organisé et modulaire
- Responsabilités claires
- Facile à comprendre et modifier

### ✅ **Réutilisabilité**

- Composants réutilisables
- Hooks partagés
- Utilitaires statiques

### ✅ **Testabilité**

- Logique isolée
- Hooks testables
- Services mockables

### ✅ **Scalabilité**

- Architecture extensible
- Nouveaux composants faciles
- Évolution progressive

### ✅ **Performance**

- Optimisations React
- Mémoisation des calculs
- Gestion efficace de l'état

## 🧪 Exemples d'Utilisation

### **Création d'une recette**

```javascript
// Dans un composant
const { createRecipe } = useRecipes();

const handleCreate = async (formData) => {
  const recipe = new Recipe(formData);
  const success = await createRecipe(recipe);
  if (success) {
    console.log("Recette créée !");
  }
};
```

### **Validation d'une recette**

```javascript
const recipe = new Recipe(formData);
const validation = recipe.validate();

if (!validation.isValid) {
  console.error("Erreurs:", validation.errors);
}
```

### **Formatage des données**

```javascript
const totalTime = recipe.getTotalTime();
const formattedTime = recipe.getFormattedTotalTime();
const difficultyColor = recipe.getDifficultyColor();
```

### **Recherche et filtrage**

```javascript
const { searchRecipes, filterByDifficulty } = useRecipes();

const results = searchRecipes("pâtes");
const easyRecipes = filterByDifficulty("Facile");
```

## 🚀 Démarrage

```bash
# Installation
npm install

# Développement
npm start

# Build
npm run build
```

## 📊 Comparaison Avant/Après

### ❌ **Avant (Fonctionnel)**

```javascript
// Tout mélangé dans App.js
const [recipes, setRecipes] = useState([]);
const [formData, setFormData] = useState({});

const handleSubmit = async (e) => {
  // Logique de validation
  // Appel API
  // Gestion des erreurs
  // Mise à jour de l'état
};
```

### ✅ **Après (Orienté Objet)**

```javascript
// Séparation claire des responsabilités
const { recipes, createRecipe } = useRecipes();
const { recipe, save } = useRecipeForm();

const handleSubmit = async (recipe) => {
  const success = await createRecipe(recipe);
  // Logique encapsulée dans les hooks
};
```

Cette architecture garantit un code propre, maintenable et évolutif ! 🎉
