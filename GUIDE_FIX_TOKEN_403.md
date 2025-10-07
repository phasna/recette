# 🔧 Guide de Correction - Erreur 403 Forbidden

## 🚨 **Problème identifié**

L'image montre que :

- ✅ **L'authentification fonctionne côté client** (console affiche "Authentification valide depuis localStorage")
- ✅ **Le dashboard s'affiche correctement** (plus de message "Accès non autorisé")
- ❌ **Mais les appels API échouent avec 403 Forbidden** (console montre `XHR GET http://localhost:3000/api/favorites [HTTP/1.1 403 Forbidden]`)

## 🔍 **Cause du problème**

Le problème vient du fait que **le token n'est pas correctement envoyé dans les requêtes API** après la reconnexion. Cela peut être dû à :

1. **Token statique dans AuthService** - Le token n'est pas mis à jour après reconnexion
2. **Intercepteurs axios non synchronisés** - Les intercepteurs utilisent un ancien token
3. **Cache du navigateur** - L'ancien token reste en mémoire
4. **Synchronisation entre localStorage et services** - Les services ne récupèrent pas le nouveau token

## ⚡ **Solution immédiate**

### **Étape 1 : Diagnostic automatique**

1. Ouvrez la console du navigateur (F12)
2. Copiez et collez le contenu de `fix-token-sync.js`
3. Appuyez sur Entrée
4. Exécutez : `diagnoseTokenIssue()`

### **Étape 2 : Correction automatique**

Dans la console, exécutez :

```javascript
autoFixTokenIssue();
```

Cette fonction va :

- Diagnostiquer le problème de token
- Tester une requête API
- Forcer la synchronisation du token
- Recharger la page

## 🔧 **Solutions manuelles**

### **Solution 1 : Test de l'API**

```javascript
// Dans la console (F12)
async function testAPI() {
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

testAPI();
```

### **Solution 2 : Synchronisation forcée du token**

```javascript
// Dans la console (F12)
function syncToken() {
  const token = localStorage.getItem("token");
  if (token) {
    // Forcer la mise à jour des intercepteurs axios
    if (window.axios) {
      window.axios.interceptors.request.clear();
      window.axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
    console.log("✅ Token synchronisé");
  }
}

syncToken();
```

### **Solution 3 : Rechargement avec cache-busting**

```javascript
// Dans la console (F12)
window.location.href = "/dashboard?_t=" + Date.now();
```

## 🛠️ **Corrections appliquées**

### **1. AuthService.js - Intercepteurs dynamiques**

```javascript
// Avant (token statique)
if (this.token) {
  config.headers.Authorization = `Bearer ${this.token}`;
}

// Après (token dynamique)
const currentToken = localStorage.getItem("token");
if (currentToken) {
  config.headers.Authorization = `Bearer ${currentToken}`;
  console.log(
    "🔑 Token ajouté à la requête:",
    currentToken.substring(0, 20) + "..."
  );
}
```

### **2. UserDashboard.jsx - Récupération automatique**

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
2. Copiez et collez le contenu de `fix-token-sync.js`
3. Exécutez : `testAPIRequest()`

### **Test manuel**

1. **Connexion** : Connectez-vous via `/auth`
2. **Navigation** : Accédez au dashboard
3. **Test API** : Essayez d'ajouter aux favoris
4. **Vérification** : Vérifiez qu'il n'y a pas d'erreur 403

## 📋 **Checklist de vérification**

- [ ] Token présent dans localStorage
- [ ] Données utilisateur valides dans localStorage
- [ ] Dashboard s'affiche correctement
- [ ] Pas de message "Accès non autorisé"
- [ ] Requêtes API fonctionnent (pas d'erreur 403)
- [ ] Ajout aux favoris fonctionne
- [ ] Navigation entre pages protégées fonctionne

## 🎉 **Résultat attendu**

Après ces corrections :

- ✅ Authentification côté client fonctionne
- ✅ Dashboard s'affiche correctement
- ✅ Requêtes API fonctionnent (pas d'erreur 403)
- ✅ Ajout aux favoris fonctionne
- ✅ Navigation fluide entre les pages
- ✅ Cycle déconnexion/reconnexion stable

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
2. Testez l'API avec `testAPIRequest()`
3. Vérifiez que le backend est démarré
4. Utilisez `diagnoseTokenIssue()` pour diagnostiquer
5. Redémarrez les serveurs si nécessaire

## 🔄 **Cycle de test recommandé**

1. Connexion → Dashboard ✅
2. Test API → Pas d'erreur 403 ✅
3. Ajout aux favoris → Fonctionne ✅
4. Déconnexion → Accueil ✅
5. Reconnexion → Dashboard ✅
6. Test API → Pas d'erreur 403 ✅

Si ce cycle fonctionne, le problème est résolu !
