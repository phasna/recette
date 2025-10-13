# 🌟 Guide Complet de l'Espace Communautaire

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation et Configuration](#installation-et-configuration)
3. [Fonctionnalités](#fonctionnalités)
4. [Utilisation](#utilisation)
5. [Architecture](#architecture)

---

## 🎯 Vue d'ensemble

L'espace communautaire transforme votre application de recettes en une plateforme sociale interactive où les utilisateurs peuvent :

- 🤝 **Suivre** d'autres cuisiniers amateurs
- 💬 **Commenter** et **noter** les recettes partagées
- 🎖️ **Gagner des badges** selon leur activité
- 🏆 **Voir les classements** des meilleurs cuisiniers
- 🔥 **Découvrir** les recettes les plus populaires
- 📰 **Recevoir un fil d'actualité** personnalisé

---

## 🚀 Installation et Configuration

### Étape 1 : Créer les tables de base de données

Exécutez le script de configuration de la communauté :

```bash
cd backend
node scripts/database/setup-community-tables.js
```

Ce script va créer :
- ✅ Tables : `user_follows`, `recipe_comments`, `comment_likes`, `badges`, `user_badges`, `recipe_stats`
- ✅ Colonnes additionnelles dans `users` : `bio`, `cooking_level`, `total_recipes`, `total_followers`, `total_following`, `total_badges`, `community_score`
- ✅ Triggers automatiques pour les statistiques
- ✅ 16 badges pré-configurés
- ✅ Vues SQL optimisées pour les classements

### Étape 2 : Démarrer le backend

```bash
cd backend
npm start
```

Le serveur démarre sur `http://localhost:5000`

### Étape 3 : Démarrer le frontend

```bash
cd frontend
npm start
```

L'application démarre sur `http://localhost:3000`

### Étape 4 : Tester l'espace communautaire

1. Connectez-vous avec votre compte
2. Accédez à l'onglet **"Communauté"** dans le menu de gauche
3. Explorez les différents onglets !

---

## ✨ Fonctionnalités

### 1. 🔍 Onglet Explorer

**Découvrez la communauté et les recettes populaires**

- **Recettes populaires** : 
  - Filtres par période (Semaine, Mois, Tout)
  - Tri par score de popularité (favoris × 3 + commentaires × 2 + vues × 0.1)
  - Affichage avec statistiques (❤️ favoris, 💬 commentaires, ⭐ notes)

- **Cuisiniers à découvrir** :
  - Suggestions basées sur l'activité et le score communautaire
  - Bouton "Suivre" en un clic
  - Affichage des statistiques (recettes, abonnés, badges)

- **Activité récente** :
  - Les 5 derniers commentaires de la communauté
  - Lien direct vers les recettes commentées

### 2. 🤝 Onglet Abonnements

**Gérez vos relations et votre fil d'actualité**

- **Fil d'actualité personnalisé** :
  - Recettes des cuisiniers que vous suivez
  - Recettes populaires recommandées
  - Actualisation en temps réel

- **Liste de vos abonnements** :
  - Tous les cuisiniers que vous suivez
  - Bouton pour se désabonner
  - Date depuis laquelle vous les suivez

### 3. 🏆 Onglet Classements

**Découvrez les meilleurs cuisiniers**

- **Podium interactif** (Top 3) :
  - Médailles 🥇 🥈 🥉
  - Design distinctif pour chaque position
  - Statistiques complètes

- **Classement complet** :
  - Tri par : Score Global, Recettes, Abonnés, Badges
  - Mise en évidence de votre position
  - Statistiques détaillées pour chaque utilisateur

### 4. 🎖️ Onglet Badges

**Système de gamification complet**

#### Catégories de badges :

**📚 Badges de Recettes**
- 🍳 Premier Pas (1 recette)
- 👨‍🍳 Chef Maison (5 recettes)
- 🎖️ Cordon Bleu (10 recettes)
- 👑 Grand Chef (25 recettes)
- ⭐ Maître Cuisinier (50 recettes)

**👥 Badges de Popularité**
- 📢 Populaire (10 abonnés)
- 🌟 Influenceur (50 abonnés)
- 💫 Star de la Cuisine (100 abonnés)

**💬 Badges de Commentaires**
- 💬 Commentateur (10 commentaires)
- 📝 Critique Culinaire (50 commentaires)
- 🍷 Expert Gastronome (100 commentaires)

**🤝 Badges Sociaux**
- 🤝 Social (10 cuisiniers suivis)
- 🔍 Explorateur (50 cuisiniers suivis)

**❤️ Badges de Favoris**
- ❤️ Favoris Lover (25 favoris)
- 📚 Collectionneur (100 favoris)

#### Fonctionnalités des badges :
- **Tous les badges** : Vue d'ensemble de tous les badges disponibles
- **Mes badges** : Badges que vous avez débloqués avec la date d'obtention
- **Progression** : Badges prochains avec barres de progression

### 5. 💬 Système de Commentaires

**Intégré aux pages de recettes**

- **Ajouter un commentaire** :
  - Champ de texte riche
  - Note de 1 à 5 étoiles (optionnel)
  - Publication instantanée

- **Gérer vos commentaires** :
  - Modifier vos commentaires
  - Supprimer vos commentaires
  - Voir vos commentaires sur votre profil

- **Interactions** :
  - Liker les commentaires (❤️)
  - Voir le nombre de likes
  - Tri par date (plus récents en premier)

---

## 💻 Utilisation

### Pour les utilisateurs

#### 1. Suivre un cuisinier

```
1. Allez dans "Communauté" > "Explorer"
2. Trouvez un cuisinier dans "Cuisiniers à découvrir"
3. Cliquez sur "Suivre"
4. Vous verrez maintenant ses recettes dans votre fil d'actualité
```

#### 2. Commenter une recette

```
1. Ouvrez une recette partagée
2. Scrollez jusqu'à la section "Commentaires"
3. Écrivez votre avis
4. (Optionnel) Donnez une note de 1 à 5 étoiles
5. Cliquez sur "Publier"
```

#### 3. Gagner des badges

Les badges sont attribués **automatiquement** lorsque vous :
- Créez des recettes
- Recevez des abonnés
- Laissez des commentaires
- Suivez d'autres utilisateurs
- Ajoutez des recettes aux favoris

Vérifiez vos progrès dans "Communauté" > "Badges" > "Progression"

#### 4. Voir les classements

```
1. Allez dans "Communauté" > "Classements"
2. Choisissez le critère de tri :
   - ⭐ Score Global
   - 🍳 Recettes
   - 👥 Abonnés
   - 🎖️ Badges
3. Voyez votre position dans le classement
```

### Pour les développeurs

#### API Endpoints

**Suivis (Follow)**
```javascript
POST   /api/follow                    // Suivre un utilisateur
DELETE /api/follow/:userId            // Ne plus suivre
GET    /api/follow/:userId/followers  // Récupérer les abonnés
GET    /api/follow/:userId/following  // Récupérer les abonnements
GET    /api/follow/suggestions/users  // Suggestions
GET    /api/follow/:userId/status     // Vérifier si on suit
GET    /api/follow/:userId/stats      // Statistiques
```

**Commentaires (Comments)**
```javascript
POST   /api/comments                  // Créer un commentaire
PUT    /api/comments/:commentId       // Modifier
DELETE /api/comments/:commentId       // Supprimer
GET    /api/comments/recipe/:recipeId // Commentaires d'une recette
GET    /api/comments/user/:userId     // Commentaires d'un utilisateur
POST   /api/comments/:commentId/like  // Liker
DELETE /api/comments/:commentId/like  // Retirer le like
GET    /api/comments/recent           // Commentaires récents
```

**Badges**
```javascript
GET  /api/badges                      // Tous les badges
GET  /api/badges/categories           // Badges par catégorie
GET  /api/badges/user/:userId         // Badges d'un utilisateur
POST /api/badges/check                // Vérifier et attribuer
GET  /api/badges/next                 // Prochains badges
GET  /api/badges/leaderboard          // Classement
```

**Communauté**
```javascript
GET /api/community/stats              // Statistiques globales
GET /api/community/recipes/top        // Recettes populaires
GET /api/community/users/top          // Utilisateurs actifs
GET /api/community/users/search       // Rechercher
GET /api/community/trends/monthly     // Tendances du mois
GET /api/community/feed               // Fil d'actualité
```

#### Utiliser le composant RecipeComments

```jsx
import RecipeComments from "../components/recipe/RecipeComments";

// Dans votre page de détails de recette
<RecipeComments 
  recipeId={recipe.id} 
  user={currentUser} 
  allowComments={recipe.allow_comments}
/>
```

---

## 🏗️ Architecture

### Backend

```
backend/
├── models/
│   ├── Follow.js          # Gestion des relations de suivi
│   ├── Comment.js         # Gestion des commentaires
│   └── Badge.js           # Gestion des badges
├── controllers/
│   ├── followController.js
│   ├── commentController.js
│   ├── badgeController.js
│   └── communityController.js
├── routes/
│   ├── follow.js
│   ├── comments.js
│   ├── badges.js
│   └── community.js
└── scripts/
    └── database/
        └── setup-community-tables.js
```

### Frontend

```
frontend/src/
├── pages/
│   └── community/
│       └── CommunityPage.jsx      # Page principale
├── components/
│   ├── community/
│   │   ├── ExplorerTab.jsx        # Onglet Explorer
│   │   ├── FollowingTab.jsx       # Onglet Abonnements
│   │   ├── LeaderboardTab.jsx     # Onglet Classements
│   │   ├── BadgesTab.jsx          # Onglet Badges
│   │   ├── UserCard.jsx           # Carte utilisateur
│   │   ├── RecipeCard.jsx         # Carte recette
│   │   └── CommentItem.jsx        # Élément commentaire
│   └── recipe/
│       └── RecipeComments.jsx     # Section commentaires
└── services/
    ├── followService.js
    ├── commentService.js
    ├── badgeService.js
    └── communityService.js
```

### Base de données

**Nouvelles tables :**

1. **user_follows** : Relations de suivi
2. **recipe_comments** : Commentaires sur les recettes
3. **comment_likes** : Likes sur les commentaires
4. **badges** : Badges disponibles
5. **user_badges** : Badges obtenus par les utilisateurs
6. **recipe_stats** : Statistiques des recettes

**Triggers automatiques :**

- Mise à jour automatique des compteurs (followers, recipes, etc.)
- Calcul automatique de la note moyenne
- Attribution automatique des badges

**Vues optimisées :**

- `v_top_users` : Meilleurs utilisateurs
- `v_top_recipes` : Recettes populaires
- `v_recent_comments` : Commentaires récents

**Procédures stockées :**

- `update_user_community_score()` : Calcul du score communautaire
- `check_and_award_badges()` : Vérification et attribution des badges

---

## 🎨 Design et UX

### Palette de couleurs

- **Indigo-Purple** : Actions principales et gradients
- **Bronze-Silver-Gold** : Badges et niveaux
- **Rouge** : Likes et favoris
- **Bleu** : Commentaires
- **Vert** : Succès

### Composants réutilisables

- Cartes avec ombres et hover effects
- Boutons avec gradients
- Badges colorés selon le niveau
- Animations fluides (transitions 200ms)
- Design responsive (mobile, tablette, desktop)

---

## 📊 Statistiques et gamification

### Score communautaire

Calculé automatiquement :
```
Score = (recettes × 10) + (abonnés × 5) + (badges × 20) + (commentaires × 2)
```

### Score de popularité des recettes

```
Popularité = (favoris × 3) + (commentaires × 2) + (vues × 0.1)
```

---

## 🔧 Maintenance

### Vérifier l'état de la base de données

```bash
cd backend
node scripts/database/setup-community-tables.js
```

### Recalculer les scores

```sql
-- Recalculer tous les scores communautaires
CALL update_user_community_score(user_id);

-- Vérifier et attribuer les badges
CALL check_and_award_badges(user_id);
```

### Nettoyer les données

```sql
-- Supprimer les commentaires orphelins
DELETE FROM recipe_comments WHERE recipe_id NOT IN (SELECT id FROM recipes);

-- Supprimer les follows orphelins
DELETE FROM user_follows WHERE follower_id NOT IN (SELECT id FROM users);
```

---

## 🎉 Conclusion

L'espace communautaire est maintenant complet et fonctionnel ! Vos utilisateurs peuvent :

✅ Découvrir et suivre d'autres cuisiniers
✅ Commenter et noter les recettes
✅ Gagner des badges et progresser
✅ Voir les classements et comparer
✅ Recevoir un fil d'actualité personnalisé

**Bon appétit et bonne découverte ! 🍽️**

---

## 📞 Support

Pour toute question ou problème :
- Consultez les logs backend : `backend/logs/`
- Vérifiez la console du navigateur (F12)
- Testez les endpoints API avec Postman ou curl

---

**Créé avec ❤️ pour rendre la cuisine plus sociale et interactive !**

