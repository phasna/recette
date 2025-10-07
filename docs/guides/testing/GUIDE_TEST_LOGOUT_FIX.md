# 🧪 Guide de Test - Correction Déconnexion/Reconnexion

## 🎯 **Objectif du test**

Vérifier que le problème de déconnexion/reconnexion qui causait des erreurs "page non autorisé" est résolu.

## 📋 **Étapes de test**

### **1. Test de déconnexion**

1. **Démarrer l'application**

   ```bash
   cd frontend && npm start
   ```

2. **Se connecter**

   - Aller sur `/auth`
   - Se connecter avec un compte existant
   - Vérifier que vous accédez au dashboard

3. **Naviguer vers une page protégée**

   - Cliquer sur "Profil" ou "Favoris"
   - Vérifier que la page s'affiche correctement

4. **Se déconnecter**
   - Cliquer sur "Se déconnecter" dans la navbar
   - Vérifier que vous êtes redirigé vers la page d'accueil
   - Vérifier que la navbar affiche les boutons "Connexion" et "Inscription"

### **2. Test de reconnexion**

1. **Se reconnecter**

   - Cliquer sur "Connexion"
   - Saisir les mêmes identifiants
   - Vérifier que la connexion réussit

2. **Accéder aux pages protégées**

   - Cliquer sur "Profil" - doit fonctionner
   - Cliquer sur "Favoris" - doit fonctionner
   - Cliquer sur "Dashboard" - doit fonctionner

3. **Vérifier l'état**
   - Ouvrir la console (F12)
   - Vérifier qu'il n'y a pas d'erreurs
   - Vérifier que les données utilisateur sont correctes

### **3. Test de données corrompues**

1. **Corrompre les données**

   ```javascript
   // Dans la console
   localStorage.setItem("user", "données-invalides");
   ```

2. **Recharger la page**

   - F5 ou Ctrl+R
   - Vérifier que l'application gère l'erreur proprement
   - Vérifier que vous êtes redirigé vers la page de connexion

3. **Nettoyer et recommencer**
   ```javascript
   // Dans la console
   localStorage.clear();
   window.location.reload();
   ```

## ✅ **Résultats attendus**

### **Après déconnexion**

- ✅ Redirection vers la page d'accueil
- ✅ Navbar affiche les boutons de connexion
- ✅ Plus d'accès aux pages protégées
- ✅ localStorage nettoyé

### **Après reconnexion**

- ✅ Accès au dashboard
- ✅ Navigation vers les pages protégées fonctionne
- ✅ Pas d'erreurs "page non autorisé"
- ✅ État utilisateur correct

### **Gestion des erreurs**

- ✅ Données corrompues nettoyées automatiquement
- ✅ Redirection vers la page de connexion
- ✅ Pas de crash de l'application

## 🐛 **Diagnostic en cas de problème**

### **Vérifier l'état d'authentification**

```javascript
// Dans la console
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));

// Tester le parsing
try {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("✅ Utilisateur valide:", user);
} catch (error) {
  console.error("❌ Données corrompues:", error);
}
```

### **Forcer le nettoyage**

```javascript
// Nettoyer complètement
localStorage.clear();
window.location.reload();
```

### **Vérifier les routes**

```javascript
// Vérifier l'URL actuelle
console.log("URL actuelle:", window.location.pathname);

// Vérifier l'état de l'application
console.log("État utilisateur:", window.React?.useState);
```

## 📊 **Checklist de validation**

- [ ] Déconnexion fonctionne correctement
- [ ] Reconnexion fonctionne sans erreurs
- [ ] Accès aux pages protégées après reconnexion
- [ ] Gestion des données corrompues
- [ ] Pas d'erreurs dans la console
- [ ] Navigation fluide entre les pages
- [ ] État d'authentification cohérent

## 🎉 **Succès du test**

Si tous les éléments de la checklist sont validés, la correction est réussie !

Le problème de déconnexion/reconnexion qui causait des erreurs "page non autorisé" est résolu.

## 📞 **Support**

En cas de problème persistant :

1. Vérifier les logs de la console
2. Tester avec un navigateur en mode incognito
3. Vérifier que le backend est démarré
4. Consulter le guide de diagnostic complet
