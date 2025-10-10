# 🌱 Scripts de Seeding

Scripts pour peupler la base de données avec des données de test et d'exemple.

## 📋 Scripts disponibles

### 1. create-shared-recipe-test.js

**Créer une recette de test partagée**

Insère une recette d'exemple dans la base de données avec les paramètres de partage activés.

```bash
node create-shared-recipe-test.js
```

**Ce que fait le script :**

- ✅ Crée une recette complète avec tous les champs
- ✅ Configure le partage (is_shared = 1)
- ✅ Ajoute un message de partage
- ✅ Active les commentaires et les infos auteur

**Exemple de recette créée :**

```javascript
{
  title: "Tarte aux pommes maison",
  description: "Une délicieuse tarte aux pommes",
  ingredients: "Pommes, pâte brisée, sucre, cannelle",
  instructions: "1. Préparer la pâte\n2. Éplucher les pommes\n3. Cuire au four",
  prep_time: 30,
  cook_time: 45,
  servings: 6,
  difficulty: "Facile",
  is_shared: 1,
  share_message: "Ma recette préférée de tarte aux pommes !",
  allow_comments: 1,
  show_author_info: 1
}
```

### 2. share-all-recipes.js

**Partager toutes les recettes existantes**

Met à jour toutes les recettes de la base de données pour les rendre publiques.

```bash
node share-all-recipes.js
```

**Ce que fait le script :**

- ✅ Récupère toutes les recettes
- ✅ Active le partage pour chacune (is_shared = 1)
- ✅ Ajoute la date de partage (shared_at)
- ✅ Active les options de partage par défaut

**Utile pour :**

- Tests de la page visiteur
- Développement
- Démonstration

### 3. share-another-recipe.js

**Partager une recette spécifique**

Permet de partager une recette spécifique en utilisant son ID.

```bash
node share-another-recipe.js
```

**Ce que fait le script :**

- ✅ Demande l'ID de la recette
- ✅ Active le partage pour cette recette
- ✅ Configure les options de partage

**Utilisation interactive :**

```bash
$ node share-another-recipe.js
? ID de la recette à partager : 5
✅ Recette #5 partagée avec succès
```

## 🚀 Utilisation recommandée

### Pour le développement

```bash
# 1. Créer quelques recettes de test
node create-shared-recipe-test.js

# 2. Partager toutes les recettes pour les tests
node share-all-recipes.js
```

### Pour tester la fonctionnalité de partage

```bash
# Partager une recette spécifique
node share-another-recipe.js
```

### Pour réinitialiser les données de test

```bash
# 1. Supprimer toutes les recettes (via MySQL)
mysql -u root -p recettes_db -e "DELETE FROM recipes"

# 2. Créer de nouvelles recettes de test
node create-shared-recipe-test.js
```

## ⚙️ Configuration

Les scripts utilisent la configuration de la base de données dans `backend/config.js`.

## ⚠️ Précautions

- ✅ Assurez-vous que la base de données est configurée
- ✅ Vérifiez que les tables existent (lancez d'abord `scripts/database/setup-database-complete.js`)
- ⚠️ `share-all-recipes.js` modifie TOUTES les recettes
- ⚠️ Utilisez ces scripts uniquement en développement

## 💡 Cas d'usage

### Tester la page visiteur

La page visiteur affiche les recettes partagées. Pour la peupler :

```bash
# Créer 5 recettes de test
for i in {1..5}; do node create-shared-recipe-test.js; done

# OU partager toutes les recettes existantes
node share-all-recipes.js
```

### Tester le partage sélectif

Pour tester que seules certaines recettes apparaissent :

```bash
# Partager uniquement la recette #3
node share-another-recipe.js
# Entrer: 3
```

### Préparer une démo

```bash
# 1. Nettoyer les données
mysql -u root -p recettes_db -e "DELETE FROM recipes"

# 2. Créer des recettes variées
node create-shared-recipe-test.js

# 3. Les partager toutes
node share-all-recipes.js
```

## 🔧 Personnalisation

Pour créer vos propres scripts de seeding, utilisez ce template :

```javascript
import db from "../../database.js";

const createCustomRecipe = () => {
  const query = `
    INSERT INTO recipes (title, ingredients, instructions, is_shared)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    "Titre de ma recette",
    "Ingrédients",
    "Instructions",
    1, // Partagée
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erreur:", err);
    } else {
      console.log("✅ Recette créée:", result.insertId);
    }
    db.end();
  });
};

createCustomRecipe();
```

## 📚 Documentation liée

- [Guide de test](../../../docs/guides/testing/)
- [Architecture MVC](../../../docs/MVC_ARCHITECTURE.md)
- [API des recettes](../../../docs/guides/features/SHARE_RECIPES.md)
