# 🧪 Scripts de Test

Scripts pour tester et valider différentes parties de l'application backend.

## 📋 Scripts disponibles

### 1. test-mvc.js ⭐ (Recommandé)

**Teste l'architecture MVC complète**

Valide que tous les modèles sont correctement implémentés avec leurs méthodes CRUD.

```bash
node test-mvc.js
```

**Ce que teste le script :**

- ✅ Validation des modèles (User, Recipe, Favorite)
- ✅ Méthodes d'instance (create, update, delete, etc.)
- ✅ Méthodes statiques (findById, findAll, etc.)
- ✅ Méthodes utilitaires (getFullName, getInitials, etc.)
- ✅ Validation des données

**Sortie attendue :**

```
🧪 Test de l'architecture MVC

1️⃣ Test de validation User...
   ✅ User valide

2️⃣ Test des méthodes User...
   Nom complet: Test User
   Initiales: TU

3️⃣ Test de validation Recipe...
   ✅ Recipe valide

4️⃣ Test de validation Recipe avec erreurs...
   ✅ Erreurs détectées correctement:
      - title: Le titre est requis
      - ingredients: Les ingrédients sont requis

5️⃣ Test du modèle Favorite...
   ✅ Favorite créé

6️⃣ Vérification de la structure MVC...
   ✅ validate()
   ✅ create()
   ✅ update()
   [...]

✅ Architecture MVC validée avec succès!
```

### 2. test-database.js

**Teste la connexion à la base de données**

Vérifie que la connexion MySQL fonctionne et que les tables existent.

```bash
node test-database.js
```

**Ce que teste le script :**

- ✅ Connexion à MySQL
- ✅ Accès à la base de données
- ✅ Existence des tables (users, recipes, favorites)
- ✅ Requêtes basiques

**Sortie attendue :**

```
🔌 Test de connexion à la base de données
✅ Connecté à MySQL
✅ Base de données accessible
✅ Table users existe (X lignes)
✅ Table recipes existe (X lignes)
✅ Table favorites existe (X lignes)
```

### 3. test-api.js

**Teste les endpoints de l'API REST**

Vérifie que tous les endpoints répondent correctement.

```bash
# D'abord, démarrer le serveur
npm start

# Dans un autre terminal
node test-api.js
```

**Ce que teste le script :**

- ✅ GET /api/users
- ✅ GET /api/recipes
- ✅ GET /api/recipes/shared/public
- ✅ GET /api/favorites (avec authentification)
- ✅ Codes de statut HTTP
- ✅ Format des réponses JSON

**Sortie attendue :**

```
🌐 Test des endpoints API

✅ GET /api/users → 200 OK
✅ GET /api/recipes → 200 OK
✅ GET /api/recipes/shared/public → 200 OK
✅ POST /api/users/login → 200 OK (ou 401)

✅ Tous les endpoints fonctionnent!
```

## 🚀 Ordre d'exécution recommandé

### Pour un nouveau projet

```bash
# 1. Tester la base de données
node test-database.js

# 2. Tester l'architecture MVC
node test-mvc.js

# 3. Démarrer le serveur
npm start

# 4. Tester l'API (dans un autre terminal)
node test-api.js
```

### Pour vérifier après des modifications

```bash
# Après modification des modèles
node test-mvc.js

# Après modification de la base de données
node test-database.js

# Après modification des contrôleurs/routes
npm start
node test-api.js
```

## 📊 Interprétation des résultats

### ✅ Tous les tests passent

Votre application est prête ! Tous les composants fonctionnent correctement.

### ❌ test-database.js échoue

**Problème :** Connexion MySQL ou tables manquantes

**Solutions :**

```bash
# 1. Vérifier que MySQL est démarré
brew services start mysql  # macOS
sudo service mysql start   # Linux

# 2. Vérifier la configuration
cat config.js

# 3. Créer les tables
node ../database/setup-database-complete.js
```

### ❌ test-mvc.js échoue

**Problème :** Modèles incomplets ou méthodes manquantes

**Solutions :**

- Vérifier que tous les modèles existent dans `models/`
- Vérifier que les méthodes sont bien implémentées
- Consulter [MVC_ARCHITECTURE.md](../../../docs/MVC_ARCHITECTURE.md)

### ❌ test-api.js échoue

**Problème :** Serveur non démarré ou routes incorrectes

**Solutions :**

```bash
# 1. Vérifier que le serveur tourne
curl http://localhost:3000/api

# 2. Vérifier les logs du serveur
npm start

# 3. Tester manuellement un endpoint
curl http://localhost:3000/api/recipes
```

## 🔧 Ajouter vos propres tests

### Template de test simple

```javascript
import db from "../../database.js";

console.log("🧪 Mon test personnalisé\n");

// Test de connexion
db.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("❌ Erreur:", err);
  } else {
    console.log("✅ Test réussi:", results[0].result);
  }
  db.end();
});
```

### Template avec Promises

```javascript
import User from "../../models/User.js";

async function testUser() {
  try {
    console.log("🧪 Test du modèle User\n");

    // Test 1: Récupérer tous les utilisateurs
    const users = await User.findAll();
    console.log(`✅ ${users.length} utilisateurs trouvés`);

    // Test 2: Créer un utilisateur de test
    const testUser = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const validation = testUser.validate();
    if (validation.isValid) {
      console.log("✅ Validation réussie");
    } else {
      console.log("❌ Erreurs:", validation.errors);
    }
  } catch (err) {
    console.error("❌ Erreur:", err.message);
  }
}

testUser();
```

## 📈 Tests avancés avec Jest

Pour des tests plus robustes, utilisez Jest :

```bash
# Installer Jest
npm install --save-dev jest

# Créer un fichier de test
# __tests__/models.test.js
```

```javascript
import User from "../models/User.js";

describe("User Model", () => {
  test("should validate correct user data", () => {
    const user = new User({
      username: "test",
      email: "test@example.com",
      password: "password123",
    });

    const validation = user.validate();
    expect(validation.isValid).toBe(true);
  });

  test("should reject invalid email", () => {
    const user = new User({
      username: "test",
      email: "invalid-email",
      password: "password123",
    });

    const validation = user.validate();
    expect(validation.isValid).toBe(false);
  });
});
```

## 🐛 Dépannage

### Les tests ne trouvent pas les modules

```bash
Error: Cannot find module '../models/User.js'
```

**Solution :** Vérifiez que vous êtes dans le bon dossier

```bash
cd backend/scripts/tests
node test-mvc.js
```

### Erreur de connexion à la base de données

```bash
Error: ER_ACCESS_DENIED_ERROR
```

**Solution :** Vérifiez `config.js` et les credentials MySQL

### Le serveur ne démarre pas pour test-api.js

**Solution :** Démarrez d'abord le serveur dans un terminal séparé

```bash
# Terminal 1
npm start

# Terminal 2
node scripts/tests/test-api.js
```

## 📚 Documentation liée

- [Architecture MVC](../../../docs/MVC_ARCHITECTURE.md)
- [Guide de migration MVC](../../../docs/MVC_MIGRATION_GUIDE.md)
- [Tests complets](../../../tests/README.md)

## 🎯 Checklist de validation

Avant de déployer, vérifiez que :

- [ ] ✅ `test-database.js` passe
- [ ] ✅ `test-mvc.js` passe
- [ ] ✅ `test-api.js` passe
- [ ] ✅ Aucune erreur dans les logs du serveur
- [ ] ✅ Tous les endpoints répondent correctement
