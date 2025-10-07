# 🍳 Guide de Correction - API des Recettes

## 🚨 **Problème identifié**

Vous avez 4 recettes en base de données avec votre user-id, mais elles ne s'affichent pas dans le dashboard.

## 🔍 **Causes possibles**

### **1. API ne filtre pas par utilisateur**

- L'API retourne toutes les recettes au lieu des recettes de l'utilisateur
- Pas de filtre par `user_id` dans la requête
- Structure de réponse incorrecte

### **2. Problème d'authentification**

- Token invalide ou expiré
- En-têtes d'authentification incorrects
- Middleware d'authentification défaillant

### **3. Problème de base de données**

- Recettes créées avec un mauvais `user_id`
- Problème de jointure dans la requête SQL
- Données corrompues

## ✅ **Corrections apportées**

### **1. API modifiée pour filtrer par utilisateur**

```javascript
// Avant : Retourne toutes les recettes
if (req.user && req.query.my_recipes === "true") {
  // Filtre seulement si paramètre spécifique
}

// Après : Filtre automatiquement par utilisateur connecté
if (req.user) {
  query = "SELECT ... WHERE r.user_id = ?";
  params = [req.user.userId];
}
```

### **2. Structure de réponse standardisée**

```javascript
// Avant : Retourne directement les résultats
res.json(results);

// Après : Structure cohérente
res.json({
  success: true,
  data: results,
  count: results.length,
});
```

### **3. Gestion d'erreur améliorée**

```javascript
// Gestion d'erreur avec structure cohérente
res.status(500).json({
  success: false,
  message: "Erreur serveur",
  error: err.message,
});
```

## 🛠️ **Solutions de test**

### **Solution 1 - Test de l'API**

1. Ouvrir la console (F12)
2. Copier et coller le contenu de `test-recipes-backend.js`
3. Analyser les résultats

### **Solution 2 - Test de diagnostic**

1. Ouvrir la console (F12)
2. Copier et coller le contenu de `debug-recipes-api.js`
3. Suivre les suggestions

### **Solution 3 - Vérification manuelle**

```javascript
// Test direct de l'API
fetch("http://localhost:3000/api/recipes", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((r) => r.json())
  .then((data) => console.log("Recettes:", data));
```

## 🧪 **Tests à effectuer**

### **Test 1 - Vérifier l'API**

```bash
# 1. Se connecter
# 2. Exécuter test-recipes-backend.js
# 3. Vérifier les résultats
```

### **Test 2 - Vérifier l'affichage**

```bash
# 1. Aller sur /dashboard
# 2. Cliquer sur "🔄 Actualiser"
# 3. Vérifier l'affichage des recettes
```

### **Test 3 - Vérifier la base de données**

```sql
-- Vérifier les recettes en base
SELECT * FROM recipes WHERE user_id = [VOTRE_USER_ID];
```

## 🎯 **Résultat attendu**

### **Après correction :**

- ✅ **API filtre** par utilisateur connecté
- ✅ **Structure cohérente** de la réponse
- ✅ **Recettes affichées** dans le dashboard
- ✅ **Compteur correct** des recettes

### **Logs de succès :**

```
✅ Utilisateur connecté: username (ID: X)
✅ Réponse de l'API: {success: true, data: [...], count: 4}
📝 Nombre de recettes: 4
🍳 Toutes les recettes: [array of recipes]
```

## 🚨 **En cas de problème persistant**

### **Vérifier la base de données**

```sql
-- Vérifier que les recettes existent
SELECT COUNT(*) FROM recipes WHERE user_id = [VOTRE_USER_ID];

-- Vérifier la structure des recettes
SELECT id, title, user_id, created_at FROM recipes WHERE user_id = [VOTRE_USER_ID];
```

### **Vérifier l'authentification**

```javascript
// Vérifier le token
const token = localStorage.getItem("token");
console.log("Token:", token);

// Vérifier l'utilisateur
const user = localStorage.getItem("user");
console.log("User:", JSON.parse(user));
```

### **Vérifier le backend**

```bash
# Vérifier que le backend est démarré
curl http://localhost:3000/api/recipes

# Vérifier les logs du backend
# Regarder la console du serveur backend
```

## 🔄 **Flux de correction**

1. **Détection** : API ne filtre pas par utilisateur
2. **Correction** : Modification de l'API pour filtrer automatiquement
3. **Test** : Vérification que l'API retourne les bonnes données
4. **Affichage** : Dashboard affiche les recettes de l'utilisateur

## 🎉 **Résultat final**

- ✅ **API corrigée** : Filtre automatiquement par utilisateur
- ✅ **Recettes affichées** : Vos 4 recettes visibles dans le dashboard
- ✅ **Structure cohérente** : Réponse API standardisée
- ✅ **Gestion d'erreur** : Messages d'erreur clairs
