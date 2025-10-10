# 🔧 Scripts Utilitaires

Scripts pour diverses tâches de maintenance, vérification et débogage.

## 📋 Scripts disponibles

### 1. check-recipes-status.js

**Vérifier le statut des recettes**

Affiche toutes les recettes avec leur statut de partage et leurs informations.

```bash
node check-recipes-status.js
```

**Ce que fait le script :**

- ✅ Liste toutes les recettes de la base de données
- ✅ Affiche le statut de partage (partagée/privée)
- ✅ Montre les informations de partage
- ✅ Compte les recettes par statut

**Sortie attendue :**

```
📊 Statut des recettes

ID: 1 | Titre: Tarte aux pommes
  ✅ Partagée publiquement
  👤 Auteur visible: Oui
  💬 Commentaires: Activés
  📅 Partagée le: 2024-01-15

ID: 2 | Titre: Soupe à l'oignon
  🔒 Privée

ID: 3 | Titre: Crêpes bretonnes
  ✅ Partagée publiquement
  👤 Auteur visible: Non
  💬 Commentaires: Désactivés

────────────────────────────────
📈 Résumé:
  Total: 3 recettes
  Partagées: 2 recettes (66%)
  Privées: 1 recette (33%)
```

## 🚀 Utilisation

### Vérifier toutes les recettes

```bash
node check-recipes-status.js
```

### Trouver les recettes partagées

```bash
node check-recipes-status.js | grep "✅ Partagée"
```

### Compter les recettes partagées

```bash
node check-recipes-status.js | grep -c "✅ Partagée"
```

## 💡 Cas d'usage

### Débogage du partage

Si les recettes n'apparaissent pas sur la page visiteur :

```bash
# 1. Vérifier le statut
node check-recipes-status.js

# 2. Vérifier qu'au moins une recette est partagée
# Chercher "✅ Partagée publiquement"
```

### Audit des recettes

Pour vérifier quelles recettes sont publiques :

```bash
node check-recipes-status.js > recipes-status.txt
# Analyser le fichier recipes-status.txt
```

### Vérification après migration

Après avoir ajouté les colonnes de partage :

```bash
# Vérifier que les nouvelles colonnes existent
node check-recipes-status.js
```

## 🔧 Personnalisation

### Afficher uniquement les recettes partagées

Modifiez le script pour filtrer :

```javascript
// Dans check-recipes-status.js
const query = `
  SELECT * FROM recipes 
  WHERE is_shared = 1 
  ORDER BY shared_at DESC
`;
```

### Afficher avec les informations utilisateur

```javascript
const query = `
  SELECT r.*, u.username, u.first_name, u.last_name 
  FROM recipes r 
  LEFT JOIN users u ON r.user_id = u.id
  ORDER BY r.created_at DESC
`;
```

### Exporter en JSON

Ajoutez à la fin du script :

```javascript
const fs = require("fs");

db.query(query, (err, results) => {
  if (!err) {
    fs.writeFileSync("recipes-export.json", JSON.stringify(results, null, 2));
    console.log("✅ Exporté vers recipes-export.json");
  }
  db.end();
});
```

## 🛠️ Créer d'autres utilitaires

### Template d'utilitaire simple

```javascript
import db from "../../database.js";

console.log("🔧 Mon utilitaire\n");

// Votre logique ici
const query = "SELECT COUNT(*) as total FROM recipes";

db.query(query, (err, results) => {
  if (err) {
    console.error("❌ Erreur:", err);
  } else {
    console.log(`✅ Total de recettes: ${results[0].total}`);
  }
  db.end();
});
```

### Idées d'utilitaires

**1. Nettoyage des recettes orphelines**

```javascript
// clean-orphan-recipes.js
DELETE FROM recipes WHERE user_id IS NULL;
```

**2. Statistiques des recettes**

```javascript
// recipe-stats.js
SELECT
  difficulty,
  COUNT(*) as count,
  AVG(prep_time) as avg_prep_time
FROM recipes
GROUP BY difficulty;
```

**3. Recettes populaires (par favoris)**

```javascript
// popular-recipes.js
SELECT
  r.title,
  COUNT(f.id) as favorites_count
FROM recipes r
LEFT JOIN favorites f ON r.id = f.recipe_id
GROUP BY r.id
ORDER BY favorites_count DESC
LIMIT 10;
```

**4. Utilisateurs actifs**

```javascript
// active-users.js
SELECT
  u.username,
  COUNT(r.id) as recipes_count
FROM users u
LEFT JOIN recipes r ON u.id = r.user_id
GROUP BY u.id
ORDER BY recipes_count DESC;
```

**5. Export de sauvegarde**

```javascript
// backup-export.js
const fs = require("fs");

const queries = {
  users: "SELECT * FROM users",
  recipes: "SELECT * FROM recipes",
  favorites: "SELECT * FROM favorites",
};

// Exporter chaque table en JSON
```

## 📊 Scripts utiles supplémentaires

### Vérifier l'intégrité des données

```javascript
// check-data-integrity.js
import db from "../../database.js";

// Vérifier les recettes sans utilisateur
const orphanRecipes = `
  SELECT id, title FROM recipes 
  WHERE user_id NOT IN (SELECT id FROM users)
`;

// Vérifier les favoris invalides
const invalidFavorites = `
  SELECT f.* FROM favorites f
  LEFT JOIN recipes r ON f.recipe_id = r.id
  WHERE r.id IS NULL
`;
```

### Générer des statistiques

```javascript
// generate-stats.js
const stats = {
  totalRecipes: "SELECT COUNT(*) FROM recipes",
  sharedRecipes: "SELECT COUNT(*) FROM recipes WHERE is_shared = 1",
  totalUsers: "SELECT COUNT(*) FROM users",
  totalFavorites: "SELECT COUNT(*) FROM favorites",
  avgPrepTime: "SELECT AVG(prep_time) FROM recipes WHERE prep_time IS NOT NULL",
};

// Exécuter toutes les stats et afficher un rapport
```

## ⚙️ Configuration

Les scripts utilisent la configuration définie dans `backend/config.js`.

## ⚠️ Bonnes pratiques

- ✅ Toujours fermer la connexion avec `db.end()`
- ✅ Gérer les erreurs avec `if (err)`
- ✅ Utiliser des requêtes préparées pour éviter les injections SQL
- ✅ Ajouter des logs clairs et informatifs
- ⚠️ Ne pas modifier les données sans confirmation
- ⚠️ Tester sur des données de test avant la production

## 🐛 Dépannage

### Script ne se termine pas

**Problème :** Connexion DB non fermée

**Solution :**

```javascript
db.query(query, (err, results) => {
  // ... votre code
  db.end(); // ← Important !
});
```

### Erreur de requête SQL

**Problème :** Syntaxe SQL incorrecte

**Solution :** Tester la requête dans MySQL d'abord

```bash
mysql -u root -p recettes_db
mysql> SELECT * FROM recipes WHERE is_shared = 1;
```

### Résultats vides

**Problème :** Pas de données dans la table

**Solution :** Peupler avec des données de test

```bash
node ../seeds/create-shared-recipe-test.js
```

## 📚 Documentation liée

- [Scripts de seeding](../seeds/README.md)
- [Scripts de test](../tests/README.md)
- [Configuration de la base de données](../database/README.md)

## 🎯 Liste d'utilitaires recommandés

Créez ces utilitaires pour votre projet :

- [ ] ✅ `check-recipes-status.js` (existant)
- [ ] `clean-old-data.js` - Nettoyer les vieilles données
- [ ] `export-backup.js` - Exporter une sauvegarde
- [ ] `import-data.js` - Importer des données
- [ ] `generate-stats.js` - Statistiques complètes
- [ ] `check-integrity.js` - Vérifier l'intégrité
- [ ] `reset-dev-data.js` - Réinitialiser pour le dev
