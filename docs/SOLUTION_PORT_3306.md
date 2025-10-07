# 🔧 Solution - Port 3306 MySQL

## 🎯 Problème Identifié

L'application ne peut pas se connecter à MySQL sur le port 3306. Voici les solutions :

## 🚀 Solution Rapide

### **1. Vérifier que MySQL fonctionne**

```bash
# Vérifier le statut de MySQL
sudo service mysql status
# ou sur macOS
brew services list | grep mysql

# Vérifier le port 3306
lsof -i :3306
```

### **2. Démarrer MySQL si nécessaire**

```bash
# Sur Ubuntu/Debian
sudo service mysql start

# Sur macOS avec Homebrew
brew services start mysql

# Sur macOS avec MySQL.app
# Ouvrir MySQL.app depuis Applications
```

### **3. Tester la connexion MySQL**

```bash
# Se connecter à MySQL
mysql -u root -p
# (entrez votre mot de passe ou appuyez sur Entrée si aucun)

# Si ça fonctionne, créer la base de données
CREATE DATABASE recipe_app;
EXIT;
```

## ⚙️ Configuration Alternative

Si MySQL nécessite un mot de passe, modifiez `backend/config.js` :

```javascript
module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "VOTRE_MOT_DE_PASSE_ICI", // Ajoutez votre mot de passe
    database: "recipe_app",
  },
  port: 5000,
};
```

## 🧪 Test de Connexion

Une fois MySQL configuré, testez :

```bash
cd backend
node test-database.js
```

## 🔧 Solutions par Système

### **macOS avec Homebrew**

```bash
# Installer MySQL
brew install mysql

# Démarrer MySQL
brew services start mysql

# Configurer MySQL
mysql_secure_installation

# Se connecter
mysql -u root -p
```

### **Ubuntu/Debian**

```bash
# Installer MySQL
sudo apt update
sudo apt install mysql-server

# Démarrer MySQL
sudo service mysql start

# Configurer MySQL
sudo mysql_secure_installation

# Se connecter
sudo mysql -u root -p
```

### **Windows**

1. Télécharger MySQL depuis https://dev.mysql.com/downloads/
2. Installer MySQL Server
3. Configurer le mot de passe root
4. Démarrer MySQL Service

## 🎯 Configuration Recommandée

Pour un environnement de développement local :

```javascript
// backend/config.js
module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", // Laissez vide si pas de mot de passe
    database: "recipe_app",
  },
  port: 5000,
};
```

## 🧪 Test Complet

Une fois la base de données configurée :

```bash
# 1. Tester la base de données
cd backend && node test-database.js

# 2. Démarrer le backend
cd backend && npm run dev

# 3. Démarrer le frontend
cd frontend && npm start

# 4. Tester l'application complète
node test-complete-app.js
```

## 🚨 Dépannage

### **Erreur : "Access denied"**

- Vérifiez le mot de passe MySQL
- Essayez avec un mot de passe vide
- Créez un nouvel utilisateur MySQL

### **Erreur : "Can't connect to MySQL server"**

- Vérifiez que MySQL est démarré
- Vérifiez que le port 3306 est libre
- Vérifiez la configuration réseau

### **Erreur : "Unknown database"**

- Créez la base de données `recipe_app`
- Vérifiez le nom dans la configuration

## ✅ Vérification Finale

Une fois tout configuré, vous devriez voir :

```
✅ Connexion MySQL réussie !
✅ Base de données 'recipe_app' créée
✅ Table 'recipes' créée
✅ Données d'exemple insérées
```

## 🎉 Prêt !

Votre application de gestion des recettes avec architecture orientée objet sera alors complètement opérationnelle sur le port 3306 ! 🚀
