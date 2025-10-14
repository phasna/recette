# 🧪 Tests de l'API Communauté

## ✅ Tests de la base de données : **RÉUSSIS !**

Tous les 22 tests sont passés avec succès :

- ✅ 6 tables créées (user_follows, recipe_comments, comment_likes, badges, user_badges, recipe_stats)
- ✅ 7 colonnes ajoutées à `users`
- ✅ 5 colonnes de partage dans `recipes`
- ✅ 15 badges créés
- ✅ 6 recettes partagées
- ✅ 3 utilisateurs dans la base

## 🚀 Pour tester l'API

### 1. Démarrer le backend

```bash
cd backend
npm start
```

Le serveur devrait démarrer sur `http://localhost:3000`

### 2. Tester les endpoints avec curl

#### Test 1 : Récupérer les statistiques de la communauté

```bash
curl http://localhost:3000/api/community/stats
```

**Résultat attendu :**

```json
{
  "active_users": 2,
  "shared_recipes": 6,
  "total_comments": 0,
  "total_follows": 0,
  "total_badges_earned": 0,
  "average_global_rating": 0
}
```

#### Test 2 : Récupérer tous les badges

```bash
curl http://localhost:3000/api/badges
```

**Résultat attendu :** Liste de 15 badges

#### Test 3 : Récupérer les recettes populaires

```bash
curl http://localhost:3000/api/community/recipes/top?limit=5&period=all
```

**Résultat attendu :** Les 6 recettes partagées

#### Test 4 : Récupérer les utilisateurs actifs

```bash
curl http://localhost:3000/api/community/users/top?limit=5&sortBy=recipes
```

**Résultat attendu :** Liste des utilisateurs avec le nombre de recettes

## 🌐 Tester avec le navigateur

### 1. Démarrer le frontend

Dans un autre terminal :

```bash
cd frontend
npm start
```

L'application s'ouvre sur `http://localhost:3000`

### 2. Se connecter

Connectez-vous avec votre compte :

- Username : `Phasna` (ou votre username)
- Password : votre mot de passe

### 3. Tester l'espace Communauté

#### ✅ Test 1 : Accéder à la communauté

1. Cliquez sur **"🌟 Communauté"** dans le menu de gauche
2. ✔️ La page doit charger avec 4 onglets

#### ✅ Test 2 : Onglet Explorer

1. Vous devriez voir :

   - **🔥 Recettes Populaires** : vos 6 recettes partagées
   - **👥 Cuisiniers à Découvrir** : autres utilisateurs (testuser, Phasna1)
   - **💬 Activité Récente** : aucun commentaire pour l'instant

2. Testez les filtres de période :
   - Cliquez sur "Semaine"
   - Cliquez sur "Mois"
   - Cliquez sur "Tout"

#### ✅ Test 3 : Onglet Badges

1. Cliquez sur l'onglet **"🎖️ Badges"**
2. Vous devriez voir :

   - **Statistiques** : vos badges actuels (probablement 0 pour l'instant)
   - 3 vues : "Tous les badges" / "Mes badges" / "Progression"

3. Cliquez sur "Tous les badges"

   - ✔️ 15 badges doivent s'afficher
   - ✔️ Chaque badge montre son icône, nom, description, niveau et couleur

4. Cliquez sur "Progression"
   - ✔️ Affiche les prochains badges à débloquer avec barres de progression

#### ✅ Test 4 : Onglet Classements

1. Cliquez sur l'onglet **"🏆 Classements"**
2. Testez les filtres :

   - **⭐ Score Global**
   - **🍳 Recettes**
   - **👥 Abonnés**
   - **🎖️ Badges**

3. ✔️ Votre utilisateur doit apparaître dans le classement

#### ✅ Test 5 : Commenter une recette

1. Cliquez sur une recette dans "Recettes Populaires"
2. Scrollez jusqu'à la section **"💬 Commentaires"**
3. Ajoutez un commentaire :

   - Écrivez : "Super recette ! 😋"
   - Donnez une note : cliquez sur 5 étoiles
   - Cliquez sur **"Publier"**

4. ✔️ Le commentaire doit apparaître immédiatement

5. Retournez dans Communauté > Explorer
   - ✔️ Votre commentaire doit apparaître dans "Activité Récente"

#### ✅ Test 6 : Suivre un utilisateur

1. Dans l'onglet **"🔍 Explorer"**
2. Dans "Cuisiniers à Découvrir", trouvez un autre utilisateur
3. Cliquez sur **"Suivre"**
4. ✔️ Le bouton doit changer en "Abonné"

5. Allez dans l'onglet **"🤝 Abonnements"**
   - ✔️ L'utilisateur doit apparaître dans votre liste

#### ✅ Test 7 : Vérifier l'attribution des badges

1. Retournez dans l'onglet **"🎖️ Badges"**
2. Cliquez sur "Mes badges"
3. ✔️ Vous devriez avoir gagné :
   - 🍳 **Premier Pas** (si vous avez au moins 1 recette)
   - Possiblement d'autres selon votre activité

## 📊 Résultats attendus

Après tous ces tests, vous devriez avoir :

### Base de données

- ✅ Au moins 1 commentaire dans `recipe_comments`
- ✅ Au moins 1 relation dans `user_follows`
- ✅ Au moins 1 badge dans `user_badges`
- ✅ Statistiques mises à jour dans `recipe_stats`

### Interface

- ✅ Recettes affichées dans Explorer
- ✅ Commentaires visibles
- ✅ Badges gagnés affichés
- ✅ Classement mis à jour
- ✅ Fil d'actualité fonctionnel

## 🐛 En cas de problème

### Le backend ne démarre pas

```bash
# Vérifiez que MySQL est démarré (MAMP)
# Vérifiez le fichier backend/config.js

cd backend
npm install  # Réinstaller les dépendances si besoin
npm start
```

### Le frontend ne compile pas

```bash
cd frontend
npm install  # Réinstaller les dépendances
npm start
```

### Les recettes ne s'affichent pas

```bash
# Vérifiez qu'elles sont partagées
cd backend
node scripts/share-all-recipes.js
```

### Erreur 404 sur les API

- ✔️ Vérifiez que le backend est démarré
- ✔️ Vérifiez l'URL : `http://localhost:3000/api/...`
- ✔️ Regardez les logs du backend

### Les badges ne s'attribuent pas

```bash
# Relancer le script de création
cd backend
node scripts/database/create-community-simple.js
```

## ✅ Checklist finale

- [ ] Backend démarré sans erreur
- [ ] Frontend compile et s'affiche
- [ ] Connexion réussie
- [ ] Onglet Communauté accessible
- [ ] Recettes visibles dans Explorer
- [ ] Badges affichés (15 au total)
- [ ] Possibilité de commenter
- [ ] Possibilité de suivre
- [ ] Classement affiché
- [ ] Statistiques visibles

Si tous ces points sont cochés : **🎉 BRAVO ! L'espace communauté fonctionne parfaitement !**

---

## 📸 Captures d'écran attendues

### Onglet Explorer

```
┌─────────────────────────────────────┐
│ 🌟 Communauté                       │
│ Découvrez, partagez et échangez     │
│                                     │
│ Statistiques: 2 Cuisiniers | 6 Recettes │
│                                     │
│ [🔍 Explorer] [🤝 Abonnements]     │
│ [🏆 Classements] [🎖️ Badges]       │
│                                     │
│ 🔥 Recettes Populaires              │
│ [Semaine] [Mois] [Tout]            │
│                                     │
│ ┌────┐ ┌────┐ ┌────┐              │
│ │🍳  │ │🍳  │ │🍳  │              │
│ │Rec1│ │Rec2│ │Rec3│              │
│ └────┘ └────┘ └────┘              │
│                                     │
│ 👥 Cuisiniers à Découvrir           │
│ ┌──────────────┐                   │
│ │ User1 [Suivre]│                  │
│ └──────────────┘                   │
└─────────────────────────────────────┘
```

---

**Bon testing ! 🧪✨**

