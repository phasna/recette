# 📚 Index des Scripts Backend

Guide complet de tous les scripts disponibles dans le backend, organisés par catégorie.

## 🏗️ Structure complète

```
backend/
├── scripts/
│   ├── database/          # 🗄️ Configuration et migrations DB
│   │   ├── setup-database-complete.js
│   │   ├── add-favorites-table.js
│   │   └── add-share-columns.js
│   │
│   ├── seeds/            # 🌱 Données de test
│   │   ├── create-shared-recipe-test.js
│   │   ├── share-all-recipes.js
│   │   └── share-another-recipe.js
│   │
│   ├── tests/            # 🧪 Tests et validation
│   │   ├── test-mvc.js
│   │   ├── test-database.js
│   │   └── test-api.js
│   │
│   └── utils/            # 🔧 Utilitaires
│       └── check-recipes-status.js
│
├── models/               # Modèles MVC
├── controllers/          # Contrôleurs MVC
├── routes/              # Routes API
├── middleware/          # Middlewares
├── config.js            # Configuration
├── database.js          # Connexion DB
└── server.js           # Point d'entrée
```

## 📋 Scripts npm disponibles

### 🚀 Serveur

```bash
npm start              # Démarrer le serveur
npm run dev            # Mode développement (nodemon)
```

### 🧪 Tests

```bash
npm test               # Tester l'API (serveur doit tourner)
npm run test:mvc       # Tester l'architecture MVC
npm run test:db        # Tester la connexion DB
```

### 🗄️ Base de données

```bash
npm run db:setup       # Configuration complète de la DB
npm run db:migrate:favorites   # Ajouter table favorites
npm run db:migrate:share       # Ajouter colonnes de partage
```

### 🌱 Seeding (Données de test)

```bash
npm run db:seed        # Créer une recette de test
npm run db:seed:all    # Partager toutes les recettes
```

### 🔧 Utilitaires

```bash
npm run utils:check    # Vérifier le statut des recettes
```

## 🗂️ Scripts par catégorie

### 🗄️ DATABASE - Configuration de la base de données

#### `scripts/database/setup-database-complete.js`

Configuration complète de toutes les tables

- ✅ Crée les tables users, recipes, favorites
- ✅ Configure les clés étrangères
- ✅ Ajoute les index de performance

```bash
npm run db:setup
# ou
node scripts/database/setup-database-complete.js
```

#### `scripts/database/add-favorites-table.js`

Ajoute la table des favoris (migration)

- ✅ Crée la table favorites
- ✅ Relations avec users et recipes

```bash
npm run db:migrate:favorites
```

#### `scripts/database/add-share-columns.js`

Ajoute les colonnes de partage (migration)

- ✅ is_shared, share_message, allow_comments, etc.

```bash
npm run db:migrate:share
```

### 🌱 SEEDS - Données de test

#### `scripts/seeds/create-shared-recipe-test.js`

Crée une recette de test partagée

- ✅ Insère une recette complète
- ✅ Configure le partage

```bash
npm run db:seed
```

#### `scripts/seeds/share-all-recipes.js`

Partage toutes les recettes existantes

- ✅ Met à jour is_shared = 1 pour toutes

```bash
npm run db:seed:all
```

#### `scripts/seeds/share-another-recipe.js`

Partage une recette spécifique

- ✅ Partage par ID

```bash
node scripts/seeds/share-another-recipe.js
```

### 🧪 TESTS - Validation

#### `scripts/tests/test-mvc.js` ⭐

Teste l'architecture MVC complète

- ✅ Validation des modèles
- ✅ Méthodes CRUD
- ✅ Méthodes utilitaires

```bash
npm run test:mvc
```

**Sortie :**

```
🧪 Test de l'architecture MVC
✅ Modèle User: Complet avec validation et CRUD
✅ Modèle Recipe: Complet avec validation et CRUD
✅ Modèle Favorite: Complet avec méthodes CRUD
```

#### `scripts/tests/test-database.js`

Teste la connexion à la base de données

- ✅ Connexion MySQL
- ✅ Tables existantes

```bash
npm run test:db
```

#### `scripts/tests/test-api.js`

Teste les endpoints de l'API

- ✅ Tous les endpoints REST

```bash
npm test
# OU
npm run test
```

### 🔧 UTILS - Utilitaires

#### `scripts/utils/check-recipes-status.js`

Vérifie le statut des recettes

- ✅ Liste toutes les recettes
- ✅ Affiche le statut de partage
- ✅ Statistiques

```bash
npm run utils:check
```

**Sortie :**

```
📊 Statut des recettes
ID: 1 | Titre: Tarte aux pommes
  ✅ Partagée publiquement
  👤 Auteur visible: Oui

Total: 10 recettes
Partagées: 7 (70%)
Privées: 3 (30%)
```

## 🚦 Ordre d'exécution recommandé

### 🆕 Nouveau projet (première installation)

```bash
# 1. Configuration de la base de données
npm run db:setup

# 2. Tester la connexion
npm run test:db

# 3. Tester l'architecture MVC
npm run test:mvc

# 4. Créer des données de test
npm run db:seed

# 5. Démarrer le serveur
npm start

# 6. Tester l'API (dans un autre terminal)
npm test
```

### 🔄 Développement quotidien

```bash
# Démarrer en mode dev
npm run dev

# Vérifier les recettes (si besoin)
npm run utils:check

# Ajouter des données de test (si besoin)
npm run db:seed
```

### 🐛 Après des modifications

```bash
# Après modification des modèles
npm run test:mvc

# Après modification de la DB
npm run test:db
npm run db:setup  # si nécessaire

# Après modification des routes/contrôleurs
npm start
npm test
```

### 🔧 Maintenance

```bash
# Vérifier l'état de la base
npm run test:db
npm run utils:check

# Réinitialiser les données de test
mysql -u root -p recettes_db -e "DELETE FROM recipes"
npm run db:seed
npm run db:seed:all
```

## 📖 Documentation détaillée

Chaque catégorie a sa propre documentation :

- [📁 scripts/README.md](./scripts/README.md) - Vue d'ensemble
- [🗄️ scripts/database/README.md](./scripts/database/README.md) - Scripts DB
- [🌱 scripts/seeds/README.md](./scripts/seeds/README.md) - Scripts de seeding
- [🧪 scripts/tests/README.md](./scripts/tests/README.md) - Scripts de test
- [🔧 scripts/utils/README.md](./scripts/utils/README.md) - Scripts utilitaires

## 🎯 Cas d'usage courants

### Déboguer le partage de recettes

```bash
# 1. Vérifier quelles recettes sont partagées
npm run utils:check

# 2. Partager toutes les recettes
npm run db:seed:all

# 3. Vérifier à nouveau
npm run utils:check
```

### Tester une nouvelle fonctionnalité

```bash
# 1. Tester que l'architecture MVC fonctionne
npm run test:mvc

# 2. Tester la base de données
npm run test:db

# 3. Démarrer le serveur
npm start

# 4. Tester l'API
npm test
```

### Préparer une démo

```bash
# 1. Nettoyer les données
mysql -u root -p recettes_db -e "DELETE FROM recipes"

# 2. Créer plusieurs recettes de test
for i in {1..5}; do npm run db:seed; done

# 3. Les partager toutes
npm run db:seed:all

# 4. Vérifier
npm run utils:check

# 5. Démarrer
npm start
```

### Réinitialiser complètement

```bash
# 1. Supprimer toutes les données
mysql -u root -p recettes_db -e "DROP DATABASE recettes_db"
mysql -u root -p -e "CREATE DATABASE recettes_db"

# 2. Recréer les tables
npm run db:setup

# 3. Ajouter des données de test
npm run db:seed
npm run db:seed:all

# 4. Vérifier
npm run test:db
npm run test:mvc
```

## 🔐 Variables d'environnement

Les scripts utilisent la configuration dans `config.js` :

```javascript
export default {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "recettes_db",
  },
  port: 3000,
};
```

## ⚠️ Précautions importantes

- ✅ Les scripts de migration sont **idempotents** (peuvent être exécutés plusieurs fois)
- ✅ Toujours tester sur des données de développement d'abord
- ⚠️ `db:seed:all` modifie **TOUTES** les recettes
- ⚠️ Assurez-vous que MySQL est démarré
- ⚠️ Sauvegardez vos données avant les migrations en production

## 🐛 Dépannage rapide

### MySQL non démarré

```bash
# macOS
brew services start mysql

# Linux
sudo service mysql start
```

### Connexion refusée

```bash
# Vérifier la config
cat config.js

# Tester la connexion
npm run test:db
```

### Tables manquantes

```bash
# Recréer les tables
npm run db:setup
```

### Serveur ne démarre pas

```bash
# Vérifier le port
lsof -i :3000

# Tuer le processus si nécessaire
kill -9 <PID>

# Redémarrer
npm start
```

## 📚 Ressources

- [Architecture MVC](../docs/MVC_ARCHITECTURE.md)
- [Guide de migration MVC](../docs/MVC_MIGRATION_GUIDE.md)
- [Configuration DB](../docs/DATABASE_SETUP.md)
- [Structure backend](../docs/BACKEND_STRUCTURE.md)

## ✅ Checklist avant déploiement

- [ ] ✅ `npm run test:db` passe
- [ ] ✅ `npm run test:mvc` passe
- [ ] ✅ `npm test` passe
- [ ] ✅ Toutes les migrations sont appliquées
- [ ] ✅ Les variables d'environnement sont configurées
- [ ] ✅ MySQL est accessible
- [ ] ✅ Aucune erreur dans les logs

---

**Dernière mise à jour :** $(date +"%d/%m/%Y")  
**Organisation :** Backend MVC avec scripts organisés  
**Version :** 2.0
