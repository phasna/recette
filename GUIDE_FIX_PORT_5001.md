# 🚨 Solution Immédiate - Port 5001 "Accès non autorisé"

## 🎯 **Problème identifié**

Vous êtes sur `http://localhost:5001/dashboard` mais l'application affiche "Accès non autorisé" car :

1. Le backend n'est pas démarré (port 3000)
2. Le frontend n'est pas démarré correctement (port 5001)
3. L'état d'authentification n'est pas synchronisé

## ⚡ **Solution immédiate**

### **Étape 1 : Démarrer l'application correctement**

```bash
# Dans le terminal, depuis le dossier racine
node start-fix-auth.js
```

**OU manuellement :**

```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### **Étape 2 : Accéder à la bonne URL**

1. **Ouvrez votre navigateur**
2. **Allez sur :** `http://localhost:5001/auth`
3. **Connectez-vous** avec vos identifiants
4. **Accédez au dashboard :** `http://localhost:5001/dashboard`

## 🔧 **Si le problème persiste**

### **Solution 1 : Nettoyage complet**

```javascript
// Dans la console du navigateur (F12)
localStorage.clear();
window.location.href = "http://localhost:5001/auth";
```

### **Solution 2 : Vérification des ports**

```bash
# Vérifier que les ports sont libres
lsof -i :3000  # Backend
lsof -i :5001  # Frontend

# Tuer les processus si nécessaire
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:5001)
```

### **Solution 3 : Test de connexion automatique**

```javascript
// Dans la console du navigateur (F12)
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
      window.location.href = "http://localhost:5001/dashboard";
    } else {
      console.log("❌ Connexion échouée - Vérifiez le backend");
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
    console.log("🔧 Vérifiez que le backend est démarré sur le port 3000");
  }
}

testConnection();
```

## 📋 **Configuration des ports**

- **Backend :** `http://localhost:3000` (API)
- **Frontend :** `http://localhost:5001` (Interface)
- **Page de connexion :** `http://localhost:5001/auth`
- **Dashboard :** `http://localhost:5001/dashboard`

## 🧪 **Test de fonctionnement**

### **1. Vérifier le backend**

```bash
curl http://localhost:3000/api/test
```

**Résultat attendu :** `{"message":"API fonctionne"}`

### **2. Vérifier le frontend**

Ouvrez `http://localhost:5001` dans votre navigateur.

**Résultat attendu :** Page d'accueil de l'application

### **3. Test d'authentification**

1. Allez sur `http://localhost:5001/auth`
2. Connectez-vous
3. Vérifiez l'accès au dashboard

## 🎉 **Résultat attendu**

Après ces étapes :

- ✅ Backend démarré sur le port 3000
- ✅ Frontend démarré sur le port 5001
- ✅ Plus de message "Accès non autorisé"
- ✅ Accès normal au dashboard
- ✅ Authentification fonctionnelle

## 🚀 **Commandes de démarrage rapide**

```bash
# Option 1 : Script automatique
node start-fix-auth.js

# Option 2 : Démarrage manuel
cd backend && node server.js &
cd frontend && npm run dev
```

## 📞 **Support**

Si le problème persiste :

1. Vérifiez que les ports 3000 et 5001 sont libres
2. Redémarrez votre terminal
3. Vérifiez les logs de la console
4. Testez avec un navigateur en mode incognito
