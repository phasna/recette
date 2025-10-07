# 🧪 Guide de Test - Authentification

## 🚀 **Étapes pour tester la correction**

### 1. **Démarrer le backend**

```bash
cd backend
npm start
```

### 2. **Démarrer le frontend**

```bash
cd frontend
npm start
```

### 3. **Tester la page d'authentification**

1. Aller sur `http://localhost:3000/auth`
2. Tester la connexion avec email
3. Tester l'inscription
4. Utiliser le bouton "🧪 Test Auto"

## 🔧 **Corrections apportées**

### **Backend (API)**

- ✅ Accepte maintenant `email` OU `username` pour la connexion
- ✅ Message d'erreur mis à jour
- ✅ Requête SQL adaptée

### **Frontend (Page Auth)**

- ✅ Envoie `email` et `password` pour la connexion
- ✅ Envoie tous les champs pour l'inscription
- ✅ Gestion des erreurs améliorée

## 🎯 **Test de connexion avec email**

### **Données de test :**

```
Email: test@example.com
Password: password123
```

### **Test dans la console :**

```javascript
// Copier-coller dans la console du navigateur
fetch("http://localhost:3000/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log("✅ Connexion:", data))
  .catch((err) => console.error("❌ Erreur:", err));
```

## 🎯 **Test d'inscription**

### **Données de test :**

```
Username: newuser
Email: newuser@example.com
Password: password123
Prénom: New
Nom: User
```

## 🚨 **En cas de problème**

### **Erreur "Nom d'utilisateur et mot de passe requis"**

- ✅ **Corrigé** : L'API accepte maintenant l'email
- ✅ **Corrigé** : Le frontend envoie les bons champs

### **Erreur de connexion au serveur**

- Vérifier que le backend est démarré sur le port 3000
- Vérifier l'URL dans le frontend

### **Erreur CORS**

- Vérifier la configuration CORS dans le backend

## 📝 **Logs à vérifier**

### **Backend (Terminal)**

```
✅ Serveur démarré sur le port 3000
✅ Connexion réussie pour test@example.com
```

### **Frontend (Console)**

```
✅ Authentification réussie: {token: "...", user: {...}}
✅ Redirection vers l'accueil
```

## 🎉 **Résultat attendu**

1. **Page d'auth** : Interface moderne et responsive
2. **Connexion** : Fonctionne avec email
3. **Inscription** : Crée un nouvel utilisateur
4. **Test Auto** : Connexion automatique
5. **Redirection** : Retour à l'accueil après connexion
