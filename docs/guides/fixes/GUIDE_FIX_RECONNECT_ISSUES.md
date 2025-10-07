# 🔧 Guide de Correction - Problèmes après Reconnexion

## 🚨 **Problèmes identifiés**

Après la reconnexion, vous rencontrez :

1. **Erreur 403 Forbidden** sur `/api/favorites` :

   ```
   XHR GET http://localhost:3000/api/favorites [HTTP/1.1 403 Forbidden 1ms]
   ```

2. **Bouton de déconnexion disparaît** :
   - L'interface ne reflète pas l'état d'authentification
   - L'utilisateur semble déconnecté dans l'interface

## 🔍 **Causes des problèmes**

### **1. Erreur 403 Forbidden**

- Le token n'est pas correctement envoyé dans les requêtes API
- Les intercepteurs axios utilisent un ancien token
- Synchronisation manquante entre localStorage et les services

### **2. Bouton de déconnexion disparaît**

- L'état React n'est pas mis à jour après la reconnexion
- Les composants ne reçoivent pas les nouvelles données utilisateur
- Désynchronisation entre localStorage et l'interface

## ⚡ **Solution immédiate**

### **Étape 1 : Correction automatique**

1. Ouvrez la console du navigateur (F12)
2. Copiez et collez le contenu de `fix-reconnect-issues.js`
3. Appuyez sur Entrée
4. Exécutez : `fixAllReconnectIssues()`

Cette fonction va :

- Corriger l'erreur 403 Forbidden
- Tester l'API des favoris
- Corriger la disparition du bouton de déconnexion
- Recharger la page

## 🔧 **Solutions manuelles**

### **Solution 1 : Corriger l'erreur 403**

```javascript
// Dans la console (F12)
function fix403() {
  const token = localStorage.getItem("token");

  if (window.axios) {
    window.axios.interceptors.request.clear();
    window.axios.interceptors.request.use((config) => {
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    });
  }

  console.log("✅ Intercepteurs axios mis à jour");
}

fix403();
```

### **Solution 2 : Tester l'API des favoris**

```javascript
// Dans la console (F12)
async function testFavorites() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  console.log("Status:", response.status);
  if (response.ok) {
    const data = await response.json();
    console.log("✅ API fonctionne:", data);
  } else {
    console.log("❌ API échouée:", response.status);
  }
}

testFavorites();
```

### **Solution 3 : Corriger le bouton de déconnexion**

```javascript
// Dans la console (F12)
function fixLogoutButton() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (user && token) {
    const parsedUser = JSON.parse(user);

    // Déclencher un événement pour forcer la mise à jour
    const authEvent = new CustomEvent("authStateChanged", {
      detail: { user: parsedUser, token: token },
    });

    window.dispatchEvent(authEvent);
    console.log("✅ Événement authStateChanged déclenché");

    // Recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

fixLogoutButton();
```

## 🛠️ **Corrections appliquées**

### **1. AuthService.js - Intercepteurs dynamiques**

```javascript
// Récupération du token depuis localStorage à chaque requête
const currentToken = localStorage.getItem("token");
if (currentToken) {
  config.headers.Authorization = `Bearer ${currentToken}`;
  console.log(
    "🔑 Token ajouté à la requête:",
    currentToken.substring(0, 20) + "..."
  );
}
```

### **2. App.jsx - Écoute des événements**

```javascript
// Écouter les changements d'authentification
window.addEventListener("authStateChanged", handleAuthUpdate);
```

### **3. UserDashboard.jsx - Récupération automatique**

```javascript
// Récupération automatique depuis localStorage
const currentUser =
  user ||
  (() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        return null;
      }
    }
    return null;
  })();
```

## 🧪 **Test de la correction**

### **Test automatique**

1. Ouvrez la console (F12)
2. Copiez et collez le contenu de `fix-reconnect-issues.js`
3. Exécutez : `diagnoseReconnectIssues()`

### **Test manuel**

1. **Connexion** : Connectez-vous via `/auth`
2. **Navigation** : Accédez au dashboard
3. **Test API** : Essayez d'ajouter aux favoris
4. **Vérification** : Vérifiez qu'il n'y a pas d'erreur 403
5. **Bouton déconnexion** : Vérifiez que le bouton est présent

## 📋 **Checklist de vérification**

- [ ] Token présent dans localStorage
- [ ] Données utilisateur valides dans localStorage
- [ ] Dashboard s'affiche correctement
- [ ] Bouton de déconnexion visible
- [ ] Requêtes API fonctionnent (pas d'erreur 403)
- [ ] Ajout aux favoris fonctionne
- [ ] Navigation entre pages protégées fonctionne

## 🎉 **Résultat attendu**

Après ces corrections :

- ✅ **Plus d'erreur 403 Forbidden** sur les requêtes API
- ✅ **Bouton de déconnexion visible** et fonctionnel
- ✅ **Ajout aux favoris fonctionne**
- ✅ **Navigation fluide** entre les pages
- ✅ **Cycle déconnexion/reconnexion stable**

## 🚀 **Commandes de test**

```bash
# Démarrer l'application
node start-fix-auth.js

# Tester l'API
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/favorites
```

## 📞 **Support**

Si le problème persiste :

1. Vérifiez les logs de la console
2. Testez l'API avec `testFavoritesAPI()`
3. Vérifiez que le backend est démarré
4. Utilisez `diagnoseReconnectIssues()` pour diagnostiquer
5. Redémarrez les serveurs si nécessaire

## 🔄 **Cycle de test recommandé**

1. Connexion → Dashboard ✅
2. Bouton déconnexion visible ✅
3. Test API → Pas d'erreur 403 ✅
4. Ajout aux favoris → Fonctionne ✅
5. Déconnexion → Accueil ✅
6. Reconnexion → Dashboard ✅
7. Bouton déconnexion visible ✅
8. Test API → Pas d'erreur 403 ✅

Si ce cycle fonctionne, le problème est résolu !
