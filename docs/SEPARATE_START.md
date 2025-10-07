# 🚀 Démarrage Séparé - Backend et Frontend

## ✅ Configuration Terminée

- ✅ **PostCSS Tailwind CSS** : Configuration corrigée
- ✅ **Conflit de port** : Backend sur port 5000, Frontend sur port 3000
- ✅ **Scripts séparés** : Configurés pour démarrage individuel

## 🎯 Commandes de Démarrage

### **Option 1: Démarrage Séparé (Recommandé)**

#### **Terminal 1 - Backend**

```bash
npm run backend
# ou
cd backend && npm run dev
```

**Backend sera disponible sur :** http://localhost:5000

#### **Terminal 2 - Frontend**

```bash
npm run frontend
# ou
cd frontend && npm run dev
```

**Frontend sera disponible sur :** http://localhost:3000

### **Option 2: Démarrage Simultané**

```bash
npm run dev
```

Démarre backend et frontend en même temps.

## 🔧 Configuration des Ports

- **Backend API :** http://localhost:5000/api
- **Frontend :** http://localhost:3000
- **Base de données :** MySQL via MAMP (port 3306)

## 🧪 Tests

```bash
# Test complet
npm test

# Test backend uniquement
cd backend && node test-database.js

# Test frontend (dans la console du navigateur)
# Ouvrez http://localhost:3000 et exécutez runOOPTests()
```

## 📋 Ordre de Démarrage Recommandé

1. **Démarrer MAMP** (MySQL sur port 3306)
2. **Démarrer le Backend** : `npm run backend`
3. **Démarrer le Frontend** : `npm run frontend`
4. **Ouvrir l'application** : http://localhost:3000

## 🎉 Application Prête !

Votre application de gestion des recettes avec architecture orientée objet est maintenant configurée pour un démarrage séparé !

### **Fonctionnalités :**

- ➕ Ajouter des recettes
- 📋 Consulter les recettes
- ✏️ Modifier les recettes
- 🗑️ Supprimer les recettes
- 🎨 Interface moderne avec Tailwind CSS
- 🏗️ Architecture orientée objet
