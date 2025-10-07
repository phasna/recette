# 🚨 Solution Rapide - "Accès non autorisé"

## 🎯 **Problème actuel**

Vous voyez le message "Accès non autorisé - Vous devez être connecté pour accéder à cette page."

## ⚡ **Solution immédiate**

### **Étape 1 : Diagnostic automatique**

1. Ouvrez la console du navigateur (F12)
2. Copiez et collez le contenu de `debug-auth-quick.js`
3. Appuyez sur Entrée
4. Suivez les instructions affichées

### **Étape 2 : Correction automatique**

1. Dans la console, copiez et collez le contenu de `fix-auth-state.js`
2. Appuyez sur Entrée
3. Le script va automatiquement corriger le problème

## 🔧 **Solutions manuelles**

### **Solution 1 : Nettoyage complet**

```javascript
// Dans la console (F12)
localStorage.clear();
window.location.href = "/auth";
```

### **Solution 2 : Vérification de l'état**

```javascript
// Dans la console (F12)
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));

// Si les données sont présentes mais corrompues
try {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("✅ Utilisateur valide:", user);
} catch (error) {
  console.error("❌ Données corrompues:", error);
  localStorage.clear();
  window.location.href = "/auth";
}
```

### **Solution 3 : Redirection forcée**

```javascript
// Dans la console (F12)
window.location.href = "/auth";
```

## 🚀 **Démarrage de l'application**

### **1. Démarrer le backend**

```bash
cd backend
npm start
```

### **2. Démarrer le frontend**

```bash
cd frontend
npm start
```

### **3. Tester la connexion**

1. Aller sur `http://localhost:3001/auth`
2. Se connecter avec un compte existant
3. Vérifier l'accès aux pages protégées

## 🧪 **Test de connexion automatique**

Si vous voulez tester rapidement :

```javascript
// Dans la console (F12)
async function testConnection() {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      window.location.reload();
    } else {
      console.log("❌ Connexion échouée");
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

testConnection();
```

## 📋 **Checklist de vérification**

- [ ] Backend démarré sur le port 3000
- [ ] Frontend démarré sur le port 3001
- [ ] localStorage nettoyé
- [ ] Redirection vers /auth
- [ ] Connexion réussie
- [ ] Accès aux pages protégées

## 🎉 **Résultat attendu**

Après ces étapes :

- ✅ Plus de message "Accès non autorisé"
- ✅ Accès normal aux pages protégées
- ✅ Navigation fluide dans l'application

## 📞 **Support**

Si le problème persiste :

1. Vérifiez les logs de la console
2. Vérifiez que les ports 3000 et 3001 sont libres
3. Redémarrez les serveurs
4. Testez avec un navigateur en mode incognito
