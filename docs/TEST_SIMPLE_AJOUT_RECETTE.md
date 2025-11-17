# 🧪 Test Simple - Ajout de Recette

## 📋 Ce que teste ce script

Ce test vérifie que **l'ajout d'une recette fonctionne correctement** :

1. ✅ **Création** : On peut créer une recette via l'API
2. ✅ **Stockage** : La recette est bien enregistrée dans la base de données
3. ✅ **Récupération** : On peut récupérer la recette créée
4. ✅ **Données** : Toutes les données sont correctement sauvegardées

---

## 🚀 Comment exécuter le test

### Méthode 1 : Directement avec Node.js

```bash
node tests/test-add-recipe-simple.js
```

### Méthode 2 : Depuis la racine du projet

```bash
cd /Users/phasna/Documents/Addproduct
node tests/test-add-recipe-simple.js
```

---

## ✅ Résultat attendu

Si tout fonctionne, vous verrez :

```
🧪 Test simple d'ajout de recette

============================================================

1️⃣ Création d'une recette...
📝 Titre: Test Recette 1234567890
⏱️ Temps: 15min préparation, 20min cuisson
👥 Portions: 4
✅ Recette créée avec succès !
   ID: 42
   Titre: Test Recette 1234567890

2️⃣ Vérification que la recette existe...
✅ Recette récupérée avec succès !
   Titre: Test Recette 1234567890
   Description: Une délicieuse recette de test...

3️⃣ Vérification des données...
   ✅ title: Test Recette 1234567890 (correct)
   ✅ prep_time: 15 (correct)
   ✅ cook_time: 20 (correct)
   ✅ servings: 4 (correct)
   ✅ difficulty: Facile (correct)

============================================================
🎉 TEST RÉUSSI !
✅ L'ajout de recette fonctionne correctement

📋 Récapitulatif :
   • Recette créée avec l'ID: 42
   • Toutes les données sont correctes
   • La recette peut être récupérée
============================================================
```

---

## ❌ Si le test échoue

### Erreur : "Cannot connect to server"

```
💡 Solutions possibles :
   1. Vérifiez que le backend est démarré (port 3000)
   2. Vérifiez la connexion à la base de données
   3. Exécutez: cd backend && npm start
```

### Erreur : "Erreur 400/500"

- Vérifiez que la base de données est bien configurée
- Vérifiez les logs du backend pour plus de détails

---

## 🔍 Ce que le test fait en détail

1. **Crée une recette** avec ces données :

   - Titre : "Test Recette" + timestamp (unique)
   - Description, ingrédients, instructions
   - Temps de préparation : 15 min
   - Temps de cuisson : 20 min
   - Portions : 4
   - Difficulté : Facile

2. **Envoie une requête POST** à `http://localhost:3000/api/recipes`

3. **Vérifie la réponse** :

   - Le statut est 201 (créé) ou 200 (OK)
   - La recette a un ID

4. **Récupère la recette** avec une requête GET

5. **Compare les données** :
   - Le titre correspond
   - Les temps correspondent
   - Les portions correspondent
   - La difficulté correspond

---

## 📝 Note importante

**Ce test crée une vraie recette dans votre base de données !**

Si vous voulez nettoyer après le test, vous pouvez :

- Supprimer manuellement la recette via l'interface
- Ou la laisser (elle a un nom unique avec timestamp)

---

**Créé pour tester simplement que l'ajout de recette fonctionne !** 🎯
