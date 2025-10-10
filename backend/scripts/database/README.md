# 🗄️ Scripts de Base de Données

Scripts pour la configuration, la migration et la maintenance de la base de données MySQL.

## 📋 Scripts disponibles

### 1. setup-database-complete.js

**Configuration complète de la base de données**

Crée toutes les tables nécessaires pour l'application :

- Table `users` : Utilisateurs de l'application
- Table `recipes` : Recettes de cuisine
- Table `favorites` : Favoris des utilisateurs
- Index de performance

```bash
node setup-database-complete.js
```

**Ce script fait :**

- ✅ Crée les tables si elles n'existent pas
- ✅ Configure les clés étrangères
- ✅ Ajoute les index pour la performance
- ✅ Gère les contraintes d'unicité

### 2. add-favorites-table.js

**Migration : Ajout de la table favorites**

Ajoute la table des favoris si elle n'existe pas encore.

```bash
node add-favorites-table.js
```

**Structure créée :**

```sql
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_recipe (user_id, recipe_id)
);
```

### 3. add-share-columns.js

**Migration : Ajout des colonnes de partage**

Ajoute les colonnes nécessaires pour la fonctionnalité de partage de recettes.

```bash
node add-share-columns.js
```

**Colonnes ajoutées :**

- `is_shared` : BOOLEAN - La recette est partagée publiquement
- `share_message` : TEXT - Message de partage personnalisé
- `allow_comments` : BOOLEAN - Autoriser les commentaires
- `show_author_info` : BOOLEAN - Afficher les infos de l'auteur
- `shared_at` : TIMESTAMP - Date de partage

## 🔄 Ordre d'exécution recommandé

Pour une nouvelle installation :

```bash
# 1. Configuration complète (recommandé)
node setup-database-complete.js
```

OU pour des migrations séparées :

```bash
# 1. Ajouter la table favorites
node add-favorites-table.js

# 2. Ajouter les colonnes de partage
node add-share-columns.js
```

## ⚙️ Configuration

Les scripts utilisent la configuration définie dans `backend/config.js` :

```javascript
database: {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'recettes_db'
}
```

## ⚠️ Précautions

- ✅ Les scripts sont **idempotents** (peuvent être exécutés plusieurs fois)
- ✅ Utilisent `IF NOT EXISTS` pour éviter les erreurs
- ⚠️ Assurez-vous que MySQL est démarré
- ⚠️ Vérifiez que la base de données existe
- ⚠️ Sauvegardez vos données avant les migrations

## 🐛 Dépannage

### Erreur de connexion

```bash
Error: ER_ACCESS_DENIED_ERROR
```

**Solution :** Vérifiez les credentials dans `config.js`

### Base de données inexistante

```bash
Error: ER_BAD_DB_ERROR
```

**Solution :** Créez d'abord la base de données :

```sql
CREATE DATABASE recettes_db;
```

### Table déjà existante

**Pas de problème !** Les scripts vérifient avec `IF NOT EXISTS`

## 📚 Documentation liée

- [Configuration de la base de données](../../../docs/DATABASE_SETUP.md)
- [Architecture MVC](../../../docs/MVC_ARCHITECTURE.md)
