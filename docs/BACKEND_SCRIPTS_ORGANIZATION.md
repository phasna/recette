# 📂 Organisation des Scripts Backend

## ✨ Nouvelle structure organisée

Le backend a été complètement réorganisé avec une structure MVC et des scripts bien organisés par catégorie.

## 🏗️ Structure avant/après

### ❌ Avant (désorganisé)

```
backend/
├── server.js
├── database.js
├── config.js
├── models/
├── controllers/
├── routes/
├── middleware/
├── add-favorites-table.js          ← Scripts mélangés
├── add-share-columns.js            ← à la racine
├── setup-database-complete.js      ←
├── test-api.js                     ←
├── test-database.js                ←
├── test-mvc.js                     ←
├── check-recipes-status.js         ←
├── create-shared-recipe-test.js    ←
├── share-all-recipes.js            ←
└── share-another-recipe.js         ←
```

### ✅ Après (organisé)

```
backend/
├── 📁 Core (Fichiers principaux)
│   ├── server.js
│   ├── database.js
│   └── config.js
│
├── 📁 MVC Architecture
│   ├── models/              # Modèles (User, Recipe, Favorite)
│   ├── controllers/         # Contrôleurs
│   ├── routes/             # Routes API
│   └── middleware/         # Middlewares
│
└── 📁 scripts/             # Scripts organisés par catégorie
    ├── 🗄️ database/        # Configuration & migrations
    │   ├── setup-database-complete.js
    │   ├── add-favorites-table.js
    │   ├── add-share-columns.js
    │   └── README.md
    │
    ├── 🌱 seeds/           # Données de test
    │   ├── create-shared-recipe-test.js
    │   ├── share-all-recipes.js
    │   ├── share-another-recipe.js
    │   └── README.md
    │
    ├── 🧪 tests/           # Tests & validation
    │   ├── test-mvc.js
    │   ├── test-database.js
    │   ├── test-api.js
    │   └── README.md
    │
    ├── 🔧 utils/           # Utilitaires
    │   ├── check-recipes-status.js
    │   └── README.md
    │
    └── README.md           # Index général
```

## 📋 Catégories de scripts

### 🗄️ Database (Base de données)

**Localisation :** `scripts/database/`

Scripts pour la configuration et la migration de la base de données.

| Script                       | Description                       | Commande npm                   |
| ---------------------------- | --------------------------------- | ------------------------------ |
| `setup-database-complete.js` | Configuration complète des tables | `npm run db:setup`             |
| `add-favorites-table.js`     | Ajoute la table favorites         | `npm run db:migrate:favorites` |
| `add-share-columns.js`       | Ajoute les colonnes de partage    | `npm run db:migrate:share`     |

### 🌱 Seeds (Données de test)

**Localisation :** `scripts/seeds/`

Scripts pour peupler la base de données avec des données de test.

| Script                         | Description                    | Commande npm                                 |
| ------------------------------ | ------------------------------ | -------------------------------------------- |
| `create-shared-recipe-test.js` | Crée une recette de test       | `npm run db:seed`                            |
| `share-all-recipes.js`         | Partage toutes les recettes    | `npm run db:seed:all`                        |
| `share-another-recipe.js`      | Partage une recette spécifique | `node scripts/seeds/share-another-recipe.js` |

### 🧪 Tests (Validation)

**Localisation :** `scripts/tests/`

Scripts pour tester et valider l'application.

| Script             | Description              | Commande npm       |
| ------------------ | ------------------------ | ------------------ |
| `test-mvc.js`      | Teste l'architecture MVC | `npm run test:mvc` |
| `test-database.js` | Teste la connexion DB    | `npm run test:db`  |
| `test-api.js`      | Teste les endpoints API  | `npm test`         |

### 🔧 Utils (Utilitaires)

**Localisation :** `scripts/utils/`

Scripts utilitaires pour diverses tâches.

| Script                    | Description                    | Commande npm          |
| ------------------------- | ------------------------------ | --------------------- |
| `check-recipes-status.js` | Vérifie le statut des recettes | `npm run utils:check` |

## 🚀 Commandes npm ajoutées

Toutes les commandes npm sont définies dans `package.json` :

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",

    "test": "node scripts/tests/test-api.js",
    "test:mvc": "node scripts/tests/test-mvc.js",
    "test:db": "node scripts/tests/test-database.js",

    "db:setup": "node scripts/database/setup-database-complete.js",
    "db:migrate:favorites": "node scripts/database/add-favorites-table.js",
    "db:migrate:share": "node scripts/database/add-share-columns.js",

    "db:seed": "node scripts/seeds/create-shared-recipe-test.js",
    "db:seed:all": "node scripts/seeds/share-all-recipes.js",

    "utils:check": "node scripts/utils/check-recipes-status.js"
  }
}
```

## 📖 Documentation disponible

Chaque dossier a sa propre documentation :

```
scripts/
├── README.md                    # 📚 Index général de tous les scripts
├── database/
│   └── README.md               # 🗄️ Guide des scripts de base de données
├── seeds/
│   └── README.md               # 🌱 Guide des scripts de seeding
├── tests/
│   └── README.md               # 🧪 Guide des scripts de test
└── utils/
    └── README.md               # 🔧 Guide des scripts utilitaires
```

**Index principal :** [SCRIPTS_INDEX.md](../backend/SCRIPTS_INDEX.md)

## 🎯 Avantages de cette organisation

### 1. 📁 Meilleure organisation

- ✅ Scripts regroupés par fonction
- ✅ Facile de trouver ce qu'on cherche
- ✅ Structure claire et logique

### 2. 📚 Documentation complète

- ✅ README dans chaque dossier
- ✅ Index général
- ✅ Exemples d'utilisation

### 3. 🚀 Facilité d'utilisation

- ✅ Commandes npm courtes
- ✅ Nommage cohérent
- ✅ Accessible depuis n'importe où

### 4. 🧹 Code plus propre

- ✅ Racine du backend épurée
- ✅ Séparation claire des responsabilités
- ✅ Maintenance facilitée

### 5. 🔄 Scalabilité

- ✅ Facile d'ajouter de nouveaux scripts
- ✅ Structure extensible
- ✅ Catégories claires

## 🔄 Workflow recommandé

### Installation initiale

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la base de données
npm run db:setup

# 3. Tester la configuration
npm run test:db
npm run test:mvc

# 4. Ajouter des données de test
npm run db:seed

# 5. Démarrer le serveur
npm start
```

### Développement quotidien

```bash
# Démarrer en mode dev avec auto-reload
npm run dev

# Dans un autre terminal : tester
npm test
```

### Debug et maintenance

```bash
# Vérifier le statut des recettes
npm run utils:check

# Tester la DB
npm run test:db

# Tester l'architecture
npm run test:mvc
```

## 📝 Conventions de nommage

### Scripts npm

```
<catégorie>:<action>:<détail>

Exemples :
db:setup          # Setup de la base de données
db:migrate:share  # Migration pour le partage
db:seed:all       # Seeding de toutes les données
test:mvc          # Test de l'architecture MVC
utils:check       # Utilitaire de vérification
```

### Fichiers de scripts

```
<action>-<objet>-<détail>.js

Exemples :
setup-database-complete.js    # Setup complet de la DB
add-favorites-table.js        # Ajouter une table
test-mvc.js                   # Tester le MVC
check-recipes-status.js       # Vérifier le statut
```

## 🔧 Personnalisation

### Ajouter un nouveau script de migration

1. Créer le fichier dans `scripts/database/`
2. Ajouter la commande npm dans `package.json`
3. Documenter dans `scripts/database/README.md`

Exemple :

```bash
# 1. Créer le script
touch scripts/database/add-comments-table.js

# 2. Éditer package.json
"db:migrate:comments": "node scripts/database/add-comments-table.js"

# 3. Documenter
echo "### add-comments-table.js" >> scripts/database/README.md
```

### Ajouter un nouveau test

```bash
# 1. Créer le test
touch scripts/tests/test-comments.js

# 2. Ajouter la commande
"test:comments": "node scripts/tests/test-comments.js"
```

### Ajouter un utilitaire

```bash
# 1. Créer l'utilitaire
touch scripts/utils/export-recipes.js

# 2. Ajouter la commande
"utils:export": "node scripts/utils/export-recipes.js"
```

## 🎨 Vue d'ensemble visuelle

```
┌─────────────────────────────────────────────┐
│           BACKEND STRUCTURE                 │
├─────────────────────────────────────────────┤
│                                             │
│  🏗️  Core                                   │
│  ├── server.js                              │
│  ├── database.js                            │
│  └── config.js                              │
│                                             │
│  📊 MVC Architecture                        │
│  ├── 📁 models/      (User, Recipe, etc.)   │
│  ├── 📁 controllers/ (Logique métier)       │
│  ├── 📁 routes/      (Endpoints API)        │
│  └── 📁 middleware/  (Auth, validation)     │
│                                             │
│  🔧 Scripts organisés                       │
│  └── 📁 scripts/                            │
│      ├── 🗄️  database/  (Setup, migrations)│
│      ├── 🌱 seeds/     (Données de test)   │
│      ├── 🧪 tests/     (Validation)         │
│      └── 🛠️  utils/     (Utilitaires)       │
│                                             │
└─────────────────────────────────────────────┘
```

## ✅ Checklist de migration

- [x] ✅ Scripts déplacés dans `scripts/`
- [x] ✅ Dossiers créés (database, seeds, tests, utils)
- [x] ✅ Commandes npm ajoutées
- [x] ✅ README créés pour chaque dossier
- [x] ✅ Index général créé
- [x] ✅ Documentation mise à jour
- [x] ✅ Package.json mis à jour
- [x] ✅ Tests validés

## 📚 Liens utiles

- [📋 Index des scripts](../backend/SCRIPTS_INDEX.md)
- [🗄️ Scripts database](../backend/scripts/database/README.md)
- [🌱 Scripts seeds](../backend/scripts/seeds/README.md)
- [🧪 Scripts tests](../backend/scripts/tests/README.md)
- [🔧 Scripts utils](../backend/scripts/utils/README.md)
- [🏗️ Architecture MVC](./MVC_ARCHITECTURE.md)
- [📖 Guide de migration MVC](./MVC_MIGRATION_GUIDE.md)

---

**Date de réorganisation :** $(date +"%d/%m/%Y")  
**Organisation :** Scripts backend organisés par catégorie  
**Version :** 2.0 - Structure MVC complète
