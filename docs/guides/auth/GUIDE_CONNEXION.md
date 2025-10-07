# 🔐 Guide de Connexion - Application de Recettes

## 📍 Où se connecter ?

La connexion se trouve maintenant dans la **barre de navigation en haut** de la page, pas dans le Dashboard.

## 🎯 Comment se connecter ?

### Option 1 - Connexion automatique (Recommandé)

1. **Cliquez sur le bouton "🧪 Test Auto"** dans la navbar (bouton violet)
2. L'application va automatiquement :
   - Créer un utilisateur de test
   - Se connecter avec cet utilisateur
   - Vous rediriger vers la page connectée

### Option 2 - Connexion manuelle

1. **Cliquez sur "🔐 Connexion"** dans la navbar
2. Remplissez le formulaire avec vos identifiants
3. Ou cliquez sur "📝 Inscription" pour créer un nouveau compte

## ✅ Après connexion

Une fois connecté, vous pourrez :

- ❤️ **Ajouter des recettes aux favoris** (bouton cœur)
- ✏️ **Modifier vos recettes** (bouton crayon)
- ➕ **Créer de nouvelles recettes**
- 👤 **Voir votre profil** dans la navbar

## 🔧 En cas de problème

### Vérifier que le backend est démarré

```bash
cd backend
npm start
```

### Diagnostic complet

1. Ouvrez la console (F12)
2. Copiez et collez le contenu du fichier `diagnostic.js`
3. Suivez les suggestions affichées

### Connexion manuelle via console

```javascript
// Copiez et collez ce code dans la console :
fetch("http://localhost:3000/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "testuser",
    email: "test@example.com",
    password: "password123",
    first_name: "Test",
    last_name: "User",
  }),
})
  .then(() => {
    return fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });
  })
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log("✅ Connecté ! Rechargez la page");
    location.reload();
  });
```

## 🎉 Résultat attendu

Après connexion, vous devriez voir :

- Votre nom dans la navbar
- Un bouton "Déconnexion"
- Les boutons de favoris fonctionnels
- La possibilité de créer/modifier des recettes
