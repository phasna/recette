# 📢 Comment partager des recettes dans la Communauté

## 🎯 Vue d'ensemble

Pour qu'une recette apparaisse dans l'espace **Communauté**, elle doit être **partagée** (`is_shared = 1`).

## 🔧 Méthodes pour partager une recette

### Méthode 1 : Via l'interface utilisateur (RECOMMANDÉ)

Si vous avez une fonctionnalité de partage dans votre interface :

1. Ouvrez une de vos recettes
2. Cliquez sur le bouton "Partager"
3. Configurez les options :

   - ✅ Afficher sur la page visiteurs
   - 📝 Message de partage (optionnel)
   - 💬 Autoriser les commentaires
   - 👤 Afficher les infos de l'auteur

4. Cliquez sur "Partager"

### Méthode 2 : Directement en SQL (pour tester)

Vous pouvez partager des recettes directement dans la base de données :

```sql
-- Partager une recette spécifique
UPDATE recipes
SET
  is_shared = 1,
  allow_comments = 1,
  show_author_info = 1,
  shared_at = NOW()
WHERE id = 1; -- Remplacez 1 par l'ID de votre recette

-- Partager TOUTES vos recettes
UPDATE recipes
SET
  is_shared = 1,
  allow_comments = 1,
  show_author_info = 1,
  shared_at = NOW()
WHERE user_id = YOUR_USER_ID;
```

### Méthode 3 : Via l'API

Utilisez l'endpoint de partage :

```javascript
// Dans votre code frontend
const shareRecipe = async (recipeId) => {
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}/share`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showOnVisitorPage: true,
        shareMessage: "Essayez cette délicieuse recette !",
        allowComments: true,
        showAuthorInfo: true,
      }),
    }
  );

  const data = await response.json();
  console.log("Recette partagée!", data);
};
```

## 📊 Vérifier les recettes partagées

### Voir combien de recettes sont partagées

```sql
SELECT COUNT(*) as total_partagees
FROM recipes
WHERE is_shared = 1;
```

### Lister toutes les recettes partagées

```sql
SELECT
  r.id,
  r.title,
  r.difficulty,
  u.username as auteur,
  r.shared_at as date_partage
FROM recipes r
JOIN users u ON r.user_id = u.id
WHERE r.is_shared = 1
ORDER BY r.shared_at DESC;
```

## 🌟 Où apparaissent les recettes partagées

### 1. Espace Communauté > Explorer

- Section "🔥 Recettes Populaires"
- Filtrables par période (Semaine, Mois, Tout)
- Triées par score de popularité

### 2. Espace Communauté > Abonnements

- Fil d'actualité personnalisé
- Recettes des cuisiniers que vous suivez

### 3. Page visiteurs (VisitorHome)

- Accessible sans connexion
- Affiche toutes les recettes partagées publiquement

## 🎨 Caractéristiques des recettes partagées

Chaque recette partagée affiche :

✅ **Informations de base**

- Titre et description
- Difficulté
- Temps de préparation et cuisson
- Nombre de portions

✅ **Statistiques sociales**

- ❤️ Nombre de favoris
- 💬 Nombre de commentaires
- ⭐ Note moyenne
- 👁️ Nombre de vues

✅ **Informations de l'auteur** (si autorisé)

- Nom de l'utilisateur
- Avatar
- Niveau de cuisinier
- Badges obtenus

✅ **Interactions**

- Ajouter aux favoris
- Commenter et noter
- Suivre l'auteur

## 🚀 Script rapide pour partager toutes les recettes

Créez un fichier `share-all-recipes.js` :

```javascript
import db from "./backend/database.js";

db.query(
  `UPDATE recipes 
   SET is_shared = 1, 
       allow_comments = 1, 
       show_author_info = 1, 
       shared_at = NOW() 
   WHERE is_shared = 0`,
  (err, result) => {
    if (err) {
      console.error("Erreur:", err);
    } else {
      console.log(`✅ ${result.affectedRows} recettes partagées!`);
    }
    db.end();
  }
);
```

Puis exécutez :

```bash
node share-all-recipes.js
```

## 📈 Statistiques en temps réel

Les recettes partagées bénéficient de :

- **Vues** : Incrémentées à chaque consultation
- **Favoris** : Comptabilisés automatiquement
- **Commentaires** : Nombre mis à jour en temps réel
- **Note moyenne** : Calculée automatiquement

## 🎯 Bonnes pratiques

1. ✅ **Partagez des recettes complètes** avec tous les détails
2. ✅ **Activez les commentaires** pour favoriser l'interaction
3. ✅ **Ajoutez un message** pour personnaliser le partage
4. ✅ **Affichez vos infos** pour gagner en visibilité
5. ✅ **Répondez aux commentaires** pour engager votre communauté

## 🔄 Retirer une recette du partage

Pour retirer une recette de la communauté :

```sql
UPDATE recipes
SET is_shared = 0
WHERE id = YOUR_RECIPE_ID;
```

Ou via l'API :

```javascript
DELETE /api/recipes/:id/share
```

---

**Bon partage ! 🍽️✨**
