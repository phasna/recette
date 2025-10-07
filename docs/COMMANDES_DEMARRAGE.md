# 🚀 Commandes de Démarrage - Simple et Efficace

## ✅ Configuration Terminée

Vos commandes préférées sont maintenant configurées :

### **Backend :** `node server.js`

### **Frontend :** `npm run dev`

## 🎯 Commandes de Démarrage

### **Option 1: Démarrage Séparé (Recommandé)**

#### **Terminal 1 - Backend**

```bash
cd backend
node server.js
```

**Backend sera disponible sur :** http://localhost:3000

#### **Terminal 2 - Frontend**

```bash
cd frontend
npm run dev
```

**Frontend sera disponible sur :** http://localhost:3001

### **Option 2: Démarrage depuis la racine**

#### **Backend**

```bash
npm run backend
# ou
npm run dev:backend
```

#### **Frontend**

```bash
npm run frontend
# ou
npm run dev:frontend
```

### **Option 3: Démarrage Simultané**

```bash
npm run dev
```

## 🔧 Configuration des Ports

- **Backend :** Port 3000 (comme demandé)
- **Frontend :** Port 3001 (automatique)
- **Base de données :** MySQL via MAMP (port 3306)

## 📱 Accès à l'Application

- **Frontend :** http://localhost:3001
- **Backend API :** http://localhost:3000/api
- **Test API :** http://localhost:3000/api/test

## 🧪 Tests

```bash
# Test complet
npm test

# Test backend uniquement
cd backend && node test-database.js

# Test API
curl http://localhost:3000/api/test
```

## 🎉 Application Prête !

Votre application de gestion des recettes avec architecture orientée objet et syntaxe ES modules est maintenant configurée avec vos commandes préférées !

### **Fonctionnalités :**

- ➕ Ajouter des recettes
- 📋 Consulter les recettes
- ✏️ Modifier les recettes
- 🗑️ Supprimer les recettes
- 🎨 Interface moderne avec Tailwind CSS
- 🏗️ Architecture orientée objet
- 📦 Syntaxe ES modules moderne
