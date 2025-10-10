# 📂 Scripts Backend - Organisation

Ce dossier contient tous les scripts utilitaires, de configuration et de test du backend, organisés par catégorie.

## 📁 Structure des dossiers

```
scripts/
├── database/          # Scripts de configuration et migration de base de données
├── seeds/            # Scripts pour peupler la base avec des données de test
├── tests/            # Scripts de test et validation
└── utils/            # Scripts utilitaires divers
```

## 🗄️ Database (Base de données)

Scripts pour la configuration et la migration de la base de données.

### `setup-database-complete.js`

**Description:** Script complet de configuration de la base de données

- Crée la table `users`
- Crée la table `recipes`
- Crée la table `favorites`
- Ajoute les index de performance
- Gère les relations entre tables

**Utilisation:**

```bash
cd backend
node scripts/database/setup-database-complete.js
```

### `add-favorites-table.js`

**Description:** Ajoute la table des favoris (migration)

- Crée la table `favorites` si elle n'existe pas
- Établit les relations avec `users` et `recipes`

**Utilisation:**

```bash
node scripts/database/add-favorites-table.js
```

### `add-share-columns.js`

**Description:** Ajoute les colonnes de partage aux recettes (migration)

- Ajoute `is_shared`, `share_message`, `allow_comments`, etc.
- Met à jour la structure de la table `recipes`

**Utilisation:**

```bash
node scripts/database/add-share-columns.js
```

## 🌱 Seeds (Données de test)

Scripts pour peupler la base de données avec des données de test.

### `create-shared-recipe-test.js`

**Description:** Crée une recette partagée de test

- Insère une recette exemple
- Configure les paramètres de partage

**Utilisation:**

```bash
node scripts/seeds/create-shared-recipe-test.js
```

### `share-all-recipes.js`

**Description:** Partage toutes les recettes existantes

- Met à jour toutes les recettes pour les rendre publiques
- Utile pour les tests

**Utilisation:**

```bash
node scripts/seeds/share-all-recipes.js
```

### `share-another-recipe.js`

**Description:** Partage une recette spécifique

- Permet de partager une recette par son ID

**Utilisation:**

```bash
node scripts/seeds/share-another-recipe.js
```

## 🧪 Tests (Scripts de test)

Scripts pour tester différentes parties de l'application.

### `test-mvc.js`

**Description:** Teste l'architecture MVC

- Valide tous les modèles (User, Recipe, Favorite)
- Vérifie les méthodes CRUD
- Teste la validation des données
- Affiche un rapport complet

**Utilisation:**

```bash
node scripts/tests/test-mvc.js
```

**Sortie attendue:**

```
🧪 Test de l'architecture MVC
✅ Modèle User: Complet avec validation et CRUD
✅ Modèle Recipe: Complet avec validation et CRUD
✅ Modèle Favorite: Complet avec méthodes CRUD
```

### `test-api.js`

**Description:** Teste les endpoints de l'API

- Vérifie les routes `/api/users`, `/api/recipes`, `/api/favorites`
- Teste les réponses HTTP

**Utilisation:**

```bash
# Démarrer le serveur d'abord
npm start

# Dans un autre terminal
node scripts/tests/test-api.js
```

### `test-database.js`

**Description:** Teste la connexion à la base de données

- Vérifie la connexion MySQL
- Teste les requêtes basiques
- Affiche l'état de la base de données

**Utilisation:**

```bash
node scripts/tests/test-database.js
```

## 🔧 Utils (Utilitaires)

Scripts utilitaires pour diverses tâches.

### `check-recipes-status.js`

**Description:** Vérifie le statut des recettes

- Liste toutes les recettes
- Affiche leur statut de partage
- Utile pour le débogage

**Utilisation:**

```bash
node scripts/utils/check-recipes-status.js
```

## 🚀 Scripts npm recommandés

Ajoutez ces scripts dans votre `package.json` pour faciliter l'utilisation :

```json
{
  "scripts": {
    "db:setup": "node scripts/database/setup-database-complete.js",
    "db:seed": "node scripts/seeds/share-all-recipes.js",
    "test:mvc": "node scripts/tests/test-mvc.js",
    "test:db": "node scripts/tests/test-database.js",
    "utils:check": "node scripts/utils/check-recipes-status.js"
  }
}
```

Puis utilisez :

```bash
npm run db:setup      # Configuration de la base
npm run db:seed       # Peupler avec des données
npm run test:mvc      # Tester l'architecture
npm run test:db       # Tester la connexion DB
npm run utils:check   # Vérifier les recettes
```

## 📝 Ordre d'exécution recommandé

Pour configurer un nouveau projet :

1. **Configuration de la base de données**

   ```bash
   npm run db:setup
   ```

2. **Tester la connexion**

   ```bash
   npm run test:db
   ```

3. **Tester l'architecture MVC**

   ```bash
   npm run test:mvc
   ```

4. **Démarrer le serveur**

   ```bash
   npm start
   ```

5. **Optionnel: Ajouter des données de test**
   ```bash
   npm run db:seed
   ```

## ⚠️ Important

- Assurez-vous que MySQL est démarré avant d'exécuter les scripts
- Vérifiez la configuration dans `config.js`
- Les scripts de migration sont idempotents (peuvent être exécutés plusieurs fois)
- Sauvegardez vos données avant d'exécuter les migrations

## 🔗 Liens utiles

- [Architecture MVC](../../docs/MVC_ARCHITECTURE.md)
- [Guide de migration MVC](../../docs/MVC_MIGRATION_GUIDE.md)
- [Configuration de la base de données](../../docs/DATABASE_SETUP.md)

---

**Dernière mise à jour:** $(date +"%d/%m/%Y")
