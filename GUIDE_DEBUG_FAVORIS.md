# 🔍 Guide de Diagnostic des Favoris

## ✅ Ce qui fonctionne déjà

1. ✅ Serveur backend accessible sur http://localhost:3000
2. ✅ Table `favorites` créée dans MySQL
3. ✅ Routes `/api/favorites` enregistrées
4. ✅ Controller favoris configuré

## 🧪 Tests à effectuer

### 1. Vérifier que vous êtes connecté

**Le problème le plus courant** : Vous devez être **connecté** pour ajouter aux favoris.

- Cliquez sur "Connexion" en haut à droite
- Connectez-vous avec votre compte
- Le bouton ❤️ devrait devenir actif (non grisé)

### 2. Ouvrir la Console du Navigateur

**Chrome/Edge/Brave** : `Cmd + Option + J` (Mac) ou `Ctrl + Shift + J` (Windows)
**Firefox** : `Cmd + Option + K` (Mac) ou `Ctrl + Shift + K` (Windows)

### 3. Cliquer sur le bouton ❤️

Observez les messages dans la console :

#### ✅ Si vous voyez :

```
POST http://localhost:3000/api/favorites 201 (Created)
```

→ **Ça marche !** La recette a été ajoutée aux favoris

#### ❌ Si vous voyez :

```
POST http://localhost:3000/api/favorites 401 (Unauthorized)
```

→ **Problème d'authentification** : Reconnectez-vous

```
POST http://localhost:3000/api/favorites 404 (Not Found)
```

→ **Route non trouvée** : Redémarrez le serveur backend

```
Failed to fetch
```

→ **Serveur backend non accessible** : Démarrez le serveur

```
Erreur lors de la gestion des favoris
```

→ **Erreur générique** : Regardez les détails dans la console

### 4. Vérifier le Token d'authentification

Dans la console du navigateur, tapez :

```javascript
localStorage.getItem("token");
```

- Si vous voyez `null` → **Vous n'êtes pas connecté**
- Si vous voyez un long texte → **Vous êtes connecté**

### 5. Tester manuellement l'API

Ouvrez un nouvel onglet terminal et testez :

```bash
# Remplacez YOUR_TOKEN par votre token (visible dans localStorage)
curl -X POST http://localhost:3000/api/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"recipe_id": 1, "user_id": 1}'
```

## 🔧 Solutions aux problèmes courants

### Problème : "Vous devez être connecté"

**Solution** : Cliquez sur le bouton de connexion et connectez-vous

### Problème : Le bouton ❤️ est grisé

**Solution** : Vous n'êtes pas connecté. Le bouton nécessite une authentification.

### Problème : "Erreur 401 Unauthorized"

**Solution** :

1. Déconnectez-vous
2. Reconnectez-vous
3. Réessayez

### Problème : "Erreur 500 Internal Server Error"

**Solution** :

1. Vérifiez les logs du serveur backend
2. Vérifiez que la table `favorites` existe dans MySQL :
   ```bash
   cd backend
   node add-favorites-table.js
   ```

### Problème : Rien ne se passe quand je clique sur ❤️

**Solution** :

1. Ouvrez la console du navigateur (Cmd+Option+J)
2. Rechargez la page
3. Cliquez à nouveau sur ❤️
4. Lisez les messages d'erreur

## 🎯 Test rapide

1. **Êtes-vous connecté ?** (Regardez en haut à droite de l'interface)
2. **Le serveur backend est-il démarré ?** (Devrait afficher "🚀 Serveur démarré sur le port 3000")
3. **Le frontend est-il démarré ?** (http://localhost:3001)

## 📞 Information de débogage à fournir

Si le problème persiste, envoyez-moi :

1. **Message d'erreur complet** de la console du navigateur
2. **Status code** de la requête HTTP (visible dans l'onglet Network)
3. **État de connexion** : connecté ou non connecté ?
4. **Logs du serveur backend** (visible dans le terminal où le serveur tourne)

---

## 🚀 Commandes de démarrage

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm start
```

### Test de la table favorites

```bash
node backend/add-favorites-table.js
```

