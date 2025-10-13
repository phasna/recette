# 🚀 Guide de Démarrage Rapide - Espace Communauté

## ⚡ Installation en 3 étapes

### Étape 1 : Configurer la base de données

Ouvrez un terminal et exécutez :

```bash
cd backend
node scripts/database/setup-community-tables.js
```

✅ **Résultat attendu :**
```
🚀 Début de la configuration de la dimension communautaire...

✅ Table 'user_follows': 0 entrées
✅ Table 'recipe_comments': 0 entrées
✅ Table 'comment_likes': 0 entrées
✅ Table 'badges': 16 entrées
✅ Table 'user_badges': 0 entrées
✅ Table 'recipe_stats': X entrées

🎖️ 16 badges créés:
   Premier Pas (Niveau 1, bronze)
   Chef Maison (Niveau 2, silver)
   ...

✨ Configuration de la dimension communautaire terminée!
```

### Étape 2 : Démarrer le backend

```bash
cd backend
npm start
```

Le serveur démarre sur **http://localhost:5000**

### Étape 3 : Démarrer le frontend

Ouvrez un nouveau terminal :

```bash
cd frontend
npm start
```

L'application démarre sur **http://localhost:3000**

---

## 🎯 Tester l'espace communautaire

1. **Connectez-vous** à votre compte (ou créez-en un)

2. **Accédez à la Communauté** :
   - Cliquez sur **"🌟 Communauté"** dans le menu de gauche

3. **Explorez les onglets** :
   - 🔍 **Explorer** : Découvrez les recettes populaires et les cuisiniers
   - 🤝 **Abonnements** : Suivez des cuisiniers et voyez leur fil
   - 🏆 **Classements** : Comparez-vous aux meilleurs
   - 🎖️ **Badges** : Gagnez des récompenses

4. **Testez les fonctionnalités** :
   - ✅ Suivre un cuisinier
   - ✅ Commenter une recette partagée
   - ✅ Noter une recette (1-5 étoiles)
   - ✅ Voir votre progression de badges

---

## 🎖️ Badges disponibles

Vous gagnerez automatiquement des badges en :
- 🍳 Créant des recettes (1, 5, 10, 25, 50)
- 👥 Recevant des abonnés (10, 50, 100)
- 💬 Laissant des commentaires (10, 50, 100)
- 🤝 Suivant d'autres cuisiniers (10, 50)
- ❤️ Ajoutant des favoris (25, 100)

---

## 🔥 Fonctionnalités principales

### 1. Système de suivi
- Suivez vos cuisiniers préférés
- Recevez leurs nouvelles recettes dans votre fil
- Voyez qui vous suit

### 2. Commentaires et notes
- Laissez des avis sur les recettes
- Notez de 1 à 5 étoiles
- Modifiez ou supprimez vos commentaires
- Likez les commentaires des autres

### 3. Classements
- Score global combiné
- Top par nombre de recettes
- Top par nombre d'abonnés
- Top par nombre de badges

### 4. Gamification
- 16 badges différents
- 5 niveaux de couleur (bronze, silver, gold, platinum, diamond)
- Progression visible en temps réel
- Score communautaire calculé automatiquement

---

## 📊 Statistiques automatiques

Le système met à jour automatiquement :
- ✅ Nombre d'abonnés / abonnements
- ✅ Nombre de recettes
- ✅ Note moyenne des recettes
- ✅ Nombre de commentaires
- ✅ Score communautaire
- ✅ Attribution des badges

---

## 🆘 En cas de problème

### La base de données ne se crée pas ?

Vérifiez que MySQL est démarré et que les identifiants sont corrects dans `backend/config.js`

### Les badges ne s'affichent pas ?

Vérifiez dans la console backend si le script s'est exécuté sans erreur.

### L'espace communauté n'apparaît pas ?

1. Vérifiez que le frontend est bien redémarré
2. Videz le cache du navigateur (Ctrl+Shift+R)
3. Vérifiez la console du navigateur (F12)

---

## 📚 Documentation complète

Pour plus de détails, consultez :
- **Guide complet** : `docs/COMMUNITY_FEATURE_GUIDE.md`
- **API Backend** : Tous les endpoints disponibles
- **Composants Frontend** : Comment les utiliser dans votre code

---

## 🎉 C'est prêt !

Votre espace communautaire est maintenant opérationnel ! 

**Amusez-vous bien ! 🍽️✨**

---

## 📌 Checklist rapide

- [ ] Script de base de données exécuté
- [ ] Backend démarré (port 5000)
- [ ] Frontend démarré (port 3000)
- [ ] Compte utilisateur créé/connecté
- [ ] Onglet "Communauté" visible dans le menu
- [ ] Au moins 16 badges visibles dans l'onglet Badges

Si tout est coché, vous êtes prêt ! 🚀

