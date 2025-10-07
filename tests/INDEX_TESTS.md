# 🧪 Index des Tests

## 📂 Organisation des Tests

Tous les tests et scripts du projet sont organisés dans ce dossier par catégorie.

---

## 📁 Structure des Dossiers

### 🔐 `auth/` - Tests d'Authentification

Scripts pour tester et débugger l'authentification :

| Fichier               | Description                               |
| --------------------- | ----------------------------------------- |
| `debug-auth-quick.js` | Debug rapide de l'authentification        |
| `debug-auth-state.js` | Debug de l'état d'authentification        |
| `fix-auth-data.js`    | Correction des données d'authentification |
| `fix-auth-state.js`   | Correction de l'état d'authentification   |
| `force-auth-sync.js`  | Synchronisation forcée de l'auth          |
| `test-auth-api.js`    | Tests de l'API d'authentification         |
| `test-auth.js`        | Tests d'authentification généraux         |
| `test-final-auth.js`  | Tests finaux d'authentification           |
| `test-simple-auth.js` | Tests simples d'authentification          |

**Usage :**

```bash
node tests/auth/test-auth.js
node tests/auth/debug-auth-quick.js
```

---

### 💾 `database/` - Tests de Base de Données

Scripts pour la base de données :

| Fichier                | Description                           |
| ---------------------- | ------------------------------------- |
| `setup-users.js`       | Configuration des utilisateurs en BDD |
| `test-database.js`     | Tests de connexion à la base          |
| `test-mysql-simple.js` | Tests MySQL simples                   |

**Usage :**

```bash
node tests/database/setup-users.js
node tests/database/test-database.js
```

---

### 🐛 `debug/` - Scripts de Debug

Outils de diagnostic et debug :

| Fichier                | Description                  |
| ---------------------- | ---------------------------- |
| `debug-navbar.js`      | Debug de la navbar           |
| `debug-navigation.js`  | Debug de la navigation       |
| `debug-recipes-api.js` | Debug de l'API des recettes  |
| `diagnose-storage.js`  | Diagnostic du stockage local |
| `diagnostic.js`        | Diagnostic général           |

**Usage :**

```bash
node tests/debug/diagnostic.js
node tests/debug/diagnose-storage.js
```

---

### 🔧 `fix/` - Scripts de Correction

Scripts pour corriger des problèmes spécifiques :

| Fichier                   | Description                           |
| ------------------------- | ------------------------------------- |
| `fix-all-api-calls.js`    | Correction de tous les appels API     |
| `fix-immediate-sync.js`   | Correction synchronisation immédiate  |
| `fix-logout-reconnect.js` | Correction reconnexion après logout   |
| `fix-reconnect-final.js`  | Correction finale de reconnexion      |
| `fix-reconnect-issues.js` | Correction problèmes de reconnexion   |
| `fix-token-sync.js`       | Correction synchronisation des tokens |

**Usage :**

```bash
node tests/fix/fix-logout-reconnect.js
node tests/fix/fix-token-sync.js
```

---

### 🚀 `scripts/` - Scripts Utilitaires

Scripts pour démarrer et gérer l'application :

| Fichier             | Description                       |
| ------------------- | --------------------------------- |
| `clean-start.js`    | Démarrage propre de l'application |
| `clear-storage.js`  | Nettoyage du stockage local       |
| `force-redirect.js` | Redirection forcée                |
| `start-app.js`      | Démarrage de l'application        |
| `start-clean.js`    | Démarrage propre                  |
| `start-fix-auth.js` | Démarrage avec correction d'auth  |

**Usage :**

```bash
node tests/scripts/start-app.js
node tests/scripts/clean-start.js
```

---

### ✅ `complete/` - Tests Complets

Scripts de test et correction globaux :

| Fichier                    | Description                |
| -------------------------- | -------------------------- |
| `COMPLETE_FIX_AND_TEST.js` | Correction et test complet |
| `FINAL_TEST_SCRIPT.js`     | Script de test final       |
| `ULTIMATE_FIX.js`          | Correction ultime          |
| `test-final-fix.js`        | Test de correction finale  |

**Usage :**

```bash
node tests/complete/FINAL_TEST_SCRIPT.js
node tests/complete/ULTIMATE_FIX.js
```

---

### 🧪 Tests Fonctionnels (Racine)

Tests de fonctionnalités spécifiques :

#### Tests de Recettes

- `test-recipe-details.js` - Détails des recettes
- `test-recipe-popup.js` - Popup de recettes
- `test-recipes-backend.js` - Backend des recettes
- `test-recipes-display.js` - Affichage des recettes

#### Tests de Favoris

- `test-favorites-api.js` - API des favoris
- `test-favorites-detailed.js` - Favoris détaillés
- `test-favorites.js` - Tests généraux favoris

#### Tests de Navigation

- `test-navbar.js` - Tests navbar
- `test-navbar-recipes-page.js` - Navbar page recettes
- `test-navigation-fix.js` - Correction navigation
- `test-navigation-fix-final.js` - Correction finale navigation
- `test-smart-navigation.js` - Navigation intelligente
- `test-pages-structure.js` - Structure des pages

#### Tests de Connexion/Reconnexion

- `test-connection.js` - Test de connexion
- `test-logout-reconnect.js` - Reconnexion après logout
- `test-reconnect-no-refresh.js` - Reconnexion sans refresh

#### Tests de Fonctionnalités UI

- `test-edit-functionality.js` - Fonctionnalité d'édition
- `test-external-popup.js` - Popup externe
- `test-delete.js` - Suppression

#### Tests de Partage

- `test-share-api.js` - API de partage
- `create-test-shared-recipe.js` - Création recette partagée

#### Autres

- `diagnose-mysql.js` - Diagnostic MySQL
- `README.md` - Documentation des tests

---

## 🎯 Guide d'Utilisation

### 1. Tests par Problème

#### Problème d'Authentification

```bash
# Debug rapide
node tests/auth/debug-auth-quick.js

# Test complet
node tests/auth/test-auth.js

# Correction
node tests/auth/fix-auth-state.js
```

#### Problème de Reconnexion

```bash
# Test
node tests/test-logout-reconnect.js

# Debug
node tests/debug/diagnose-storage.js

# Correction
node tests/fix/fix-reconnect-final.js
```

#### Problème de Base de Données

```bash
# Test connexion
node tests/database/test-database.js

# Test MySQL
node tests/database/test-mysql-simple.js

# Diagnostic
node tests/diagnose-mysql.js
```

#### Problème de Navigation

```bash
# Debug
node tests/debug/debug-navigation.js

# Test
node tests/test-smart-navigation.js
```

### 2. Workflow de Test Complet

```bash
# 1. Nettoyer l'environnement
node tests/scripts/clean-start.js

# 2. Tester la base de données
node tests/database/test-database.js

# 3. Tester l'authentification
node tests/auth/test-auth.js

# 4. Tester les fonctionnalités
node tests/test-recipes-backend.js
node tests/test-favorites-api.js

# 5. Test final complet
node tests/complete/FINAL_TEST_SCRIPT.js
```

### 3. Scripts de Démarrage Rapide

```bash
# Démarrage propre
node tests/scripts/start-clean.js

# Démarrage avec l'app
node tests/scripts/start-app.js

# Démarrage avec correction auth
node tests/scripts/start-fix-auth.js
```

---

## 📊 Statistiques

- **Total de tests :** 50+
- **Tests d'authentification :** 9
- **Tests de base de données :** 3
- **Scripts de debug :** 5
- **Scripts de correction :** 6
- **Scripts utilitaires :** 6
- **Tests complets :** 4
- **Tests fonctionnels :** 20+

---

## 🔍 Recherche Rapide

| Besoin               | Fichier à Utiliser              |
| -------------------- | ------------------------------- |
| Tester l'auth        | `auth/test-auth.js`             |
| Débugger l'auth      | `auth/debug-auth-quick.js`      |
| Tester la BDD        | `database/test-database.js`     |
| Débugger général     | `debug/diagnostic.js`           |
| Corriger reconnexion | `fix/fix-reconnect-final.js`    |
| Nettoyer le storage  | `scripts/clear-storage.js`      |
| Démarrer proprement  | `scripts/clean-start.js`        |
| Test complet         | `complete/FINAL_TEST_SCRIPT.js` |
| Tester les recettes  | `test-recipes-backend.js`       |
| Tester les favoris   | `test-favorites-api.js`         |
| Tester la navigation | `test-smart-navigation.js`      |

---

## 💡 Bonnes Pratiques

1. **Toujours commencer par les tests de base** (BDD, auth)
2. **Utiliser les scripts de debug** avant de modifier le code
3. **Nettoyer le storage** si problème de session
4. **Exécuter les tests complets** après des modifications importantes
5. **Consulter la documentation** dans `/docs` pour plus de détails

---

**Dernière Mise à Jour :** Octobre 2025  
**Statut :** ✅ Organisé et maintenu
