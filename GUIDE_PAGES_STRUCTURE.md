# 📁 Guide de la Structure des Pages

## 🎯 **Architecture organisée**

L'application est maintenant organisée avec des dossiers spécifiques pour chaque page et des composants regroupés par fonctionnalité.

## 📂 **Structure des dossiers**

### **1. Pages principales**

```
frontend/src/pages/
├── favorites/           # Page des favoris
│   └── FavoritesPage.jsx
├── recipes/             # Page des recettes
│   └── RecipesPage.jsx
├── profile/             # Page de profil
│   └── ProfilePage.jsx
├── user/                # Pages utilisateur
│   ├── UserDashboard.jsx
│   ├── UserProfile.jsx
│   ├── AddRecipe.jsx
│   └── EditRecipe.jsx
├── visitor/             # Pages visiteur
│   └── VisitorHome.jsx
└── RecipeDetailsPage.jsx
```

### **2. Composants organisés**

```
frontend/src/components/
├── cards/               # Cartes de recettes
│   └── RecipeCard.jsx
├── layout/              # Mises en page
│   ├── VisitorLayout.jsx
│   └── UserLayout.jsx
├── RecipePopup.jsx      # Popup des détails
├── Navbar.jsx           # Navigation
└── ...
```

### **3. Contexte global**

```
frontend/src/contexts/
└── RecipePopupContext.jsx
```

## 🛣️ **Routes disponibles**

### **Pages publiques (accessibles à tous)**

- ✅ **/** - Page d'accueil (visiteur)
- ✅ **/recipes** - Toutes les recettes
- ✅ **/auth** - Authentification

### **Pages privées (authentification requise)**

- ✅ **/dashboard** - Dashboard utilisateur
- ✅ **/favorites** - Favoris de l'utilisateur
- ✅ **/profile** - Profil utilisateur
- ✅ **/add-recipe** - Ajouter une recette
- ✅ **/edit-recipe/:id** - Éditer une recette

## 🧩 **Composants par page**

### **1. FavoritesPage**

- **Fonctionnalités** : Affichage des favoris, suppression
- **Composants** : RecipeCard, RecipePopup
- **API** : GET /api/favorites, POST /api/favorites/remove/:id

### **2. RecipesPage**

- **Fonctionnalités** : Recherche, filtres, affichage
- **Composants** : RecipeCard, RecipePopup
- **API** : GET /api/recipes

### **3. ProfilePage**

- **Fonctionnalités** : Statistiques, actions rapides
- **Composants** : Boutons d'action, statistiques
- **API** : GET /api/recipes, GET /api/favorites

### **4. UserDashboard**

- **Fonctionnalités** : Recettes personnelles, actions
- **Composants** : RecipeCard, RecipePopup, statistiques
- **API** : GET /api/recipes, GET /api/favorites

### **5. VisitorHome**

- **Fonctionnalités** : Page d'accueil publique
- **Composants** : Présentation, boutons d'action
- **API** : Aucune

## 🧭 **Navigation**

### **Navbar mise à jour**

```javascript
const navItems = [
  {
    id: "home",
    label: "Accueil",
    icon: "🏠",
    path: "/",
  },
  {
    id: "recipes",
    label: "Recettes",
    icon: "🍳",
    path: "/recipes",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    path: "/dashboard",
    requiresAuth: true,
  },
  {
    id: "favorites",
    label: "Favoris",
    icon: "❤️",
    path: "/favorites",
    requiresAuth: true,
  },
  {
    id: "profile",
    label: "Profil",
    icon: "👤",
    path: "/profile",
    requiresAuth: true,
  },
];
```

### **Gestion de l'authentification**

- ✅ **Pages publiques** : Accessibles à tous
- ✅ **Pages privées** : Redirection vers /auth si non connecté
- ✅ **Navigation intelligente** : Selon le statut d'authentification

## 🔧 **Fonctionnalités par page**

### **FavoritesPage**

- ✅ Affichage des recettes favorites
- ✅ Suppression des favoris
- ✅ Actualisation des données
- ✅ Gestion des erreurs

### **RecipesPage**

- ✅ Affichage de toutes les recettes
- ✅ Recherche par titre et description
- ✅ Filtrage par difficulté
- ✅ Actions selon l'authentification

### **ProfilePage**

- ✅ Informations personnelles
- ✅ Statistiques utilisateur
- ✅ Actions rapides
- ✅ Déconnexion

### **UserDashboard**

- ✅ Recettes personnelles
- ✅ Statistiques
- ✅ Actions rapides
- ✅ Gestion des recettes

## 🧪 **Tests à effectuer**

### **Test 1 - Navigation**

```bash
# 1. Tester la navigation depuis la navbar
# 2. Vérifier que les pages s'affichent correctement
# 3. Tester l'authentification et les redirections
```

### **Test 2 - Fonctionnalités**

```bash
# 1. Tester les fonctionnalités spécifiques à chaque page
# 2. Vérifier que les composants sont organisés par dossier
# 3. Tester l'API et les interactions
```

### **Test 3 - Structure**

```bash
# 1. Vérifier que les dossiers sont organisés
# 2. Tester que les composants sont regroupés
# 3. Vérifier que les routes fonctionnent
```

## 🎯 **Avantages de cette structure**

### **1. Organisation claire**

- ✅ **Dossiers spécifiques** : Chaque page a son dossier
- ✅ **Composants regroupés** : Par fonctionnalité
- ✅ **Navigation intuitive** : Depuis la navbar

### **2. Maintenabilité**

- ✅ **Code organisé** : Facile à maintenir
- ✅ **Composants réutilisables** : Partagés entre pages
- ✅ **Structure logique** : Évidente et cohérente

### **3. Évolutivité**

- ✅ **Ajout facile** : Nouvelles pages et composants
- ✅ **Modularité** : Composants indépendants
- ✅ **Scalabilité** : Structure extensible

## 🚀 **Comment utiliser**

### \*\*1. Navigation

1. Utiliser la navbar pour naviguer
2. Les pages privées nécessitent une authentification
3. Redirection automatique selon le statut

### **2. Développement**

1. Ajouter de nouvelles pages dans le dossier approprié
2. Organiser les composants par fonctionnalité
3. Utiliser les routes définies dans App.jsx

### **3. Test**

1. Exécuter `test-pages-structure.js` pour vérifier
2. Tester la navigation et les fonctionnalités
3. Vérifier que l'organisation est respectée
