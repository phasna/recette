# 🚀 Démarrage avec npm run dev

## ✅ Configuration Terminée

Tous les problèmes ont été résolus :

- ✅ Configuration PostCSS pour Tailwind CSS
- ✅ Erreur ESLint dans RecipeUtils.js
- ✅ Scripts npm run dev configurés

## 🎯 Commandes Disponibles

### **Démarrage Complet (Recommandé)**

```bash
npm run dev
```

Démarre le backend et frontend simultanément.

### **Démarrage Individuel**

#### **Backend uniquement**

```bash
npm run dev:backend
# ou
cd backend && npm run dev
```

#### **Frontend uniquement**

```bash
npm run dev:frontend
# ou
cd frontend && npm run dev
```

## 🔧 Configuration MAMP

Assurez-vous que MAMP est démarré avec :

- **MySQL :** Port 3306
- **Apache :** Port 80 (optionnel)

## 📱 Accès à l'Application

Une fois démarrée :

- **Frontend :** http://localhost:3000
- **Backend API :** http://localhost:3000/api
- **Base de données :** MySQL via MAMP

## 🧪 Tests

```bash
# Test complet
npm test

# Test base de données
cd backend && node test-database.js

# Test API
cd backend && node test-api.js
```

## 🎉 Application Prête !

Votre application de gestion des recettes avec architecture orientée objet est maintenant configurée et prête à être utilisée !

### **Fonctionnalités :**

- ➕ Ajouter des recettes
- 📋 Consulter les recettes
- ✏️ Modifier les recettes
- 🗑️ Supprimer les recettes
- 🎨 Interface moderne avec Tailwind CSS
- 🏗️ Architecture orientée objet
