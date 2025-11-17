# 🧪 Comment Lancer les Tests Backend

## 📋 Tests Disponibles

Il y a **2 tests backend** disponibles :

1. **Test du Modèle Recipe** (`test-recipe.js`)

   - ✅ Fonctionne immédiatement (pas besoin de backend)
   - Teste la validation du modèle

2. **Test de l'API Recette** (`test-api-recette.js`)
   - ⚠️ Nécessite le backend démarré
   - Teste la création via l'API

---

## 🚀 Méthode 1 : Test du Modèle (Simple)

### Commande :

```bash
cd /Users/phasna/Documents/Addproduct
node tests/unitaire/modeles/test-recipe.js
```

### Résultat attendu :

```
🧪 TESTS UNITAIRES - Modèle Recipe

==================================================
  ✅ Créer une recette valide
  ✅ Valider une recette valide
  ✅ Validation échoue si titre manquant
  ✅ Validation échoue si titre trop court
  ✅ Validation échoue si ingrédients manquants
  ✅ Validation échoue si instructions manquantes
  ✅ Validation échoue si portions < 1
  ✅ Servings = 0 est préservé

==================================================
📊 RÉSUMÉ DES TESTS
==================================================
✅ Tests passés : 8
❌ Tests échoués : 0

🎉 TOUS LES TESTS SONT PASSÉS !
```

---

## 🚀 Méthode 2 : Test de l'API (Nécessite le Backend)

### Étape 1 : Démarrer le Backend

**Terminal 1 :**

```bash
cd backend
npm start
```

Le serveur doit démarrer sur `http://localhost:3000`

### Étape 2 : Lancer le Test

**Terminal 2 :**

```bash
cd /Users/phasna/Documents/Addproduct
node tests/unitaire/api/test-api-recette.js
```

### Résultat attendu :

```
🧪 TESTS UNITAIRES - API Recette

==================================================
  ✅ Créer une recette valide
  ✅ Erreur si titre manquant
  ✅ Erreur si ingrédients manquants
  ✅ Erreur si instructions manquantes

==================================================
📊 RÉSUMÉ DES TESTS
==================================================
✅ Tests passés : 4
❌ Tests échoués : 0

🎉 TOUS LES TESTS SONT PASSÉS !
```

---

## 🚀 Méthode 3 : Lancer les Deux Tests

### Script Automatique :

```bash
cd /Users/phasna/Documents/Addproduct

# Test 1 : Modèle (pas besoin de backend)
echo "🧪 Test du Modèle Recipe..."
node tests/unitaire/modeles/test-recipe.js

echo ""
echo "🧪 Test de l'API Recette..."
echo "⚠️  Assurez-vous que le backend est démarré (cd backend && npm start)"
node tests/unitaire/api/test-api-recette.js
```

---

## 📁 Emplacement des Fichiers

- **Test Modèle :** `tests/unitaire/modeles/test-recipe.js`
- **Test API :** `tests/unitaire/api/test-api-recette.js`

---

## ⚠️ Problèmes Courants

### Erreur : "ECONNREFUSED" ou "Cannot connect"

**Problème :** Le backend n'est pas démarré

**Solution :**

```bash
# Terminal 1 : Démarrer le backend
cd backend
npm start

# Terminal 2 : Relancer le test
node tests/unitaire/api/test-api-recette.js
```

### Erreur : "Port 3000 already in use"

**Problème :** Un autre processus utilise le port 3000

**Solution :**

```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9

# Relancer le backend
cd backend
npm start
```

---

## 💡 Astuce : Test Rapide

Si vous voulez juste tester rapidement **sans démarrer le backend** :

```bash
node tests/unitaire/modeles/test-recipe.js
```

Ce test fonctionne immédiatement et teste toutes les validations ! ✅

---

**Guide pour lancer les tests backend !** 🎯
