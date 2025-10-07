# 🗄️ Configuration de la Base de Données MySQL

## 🔧 Problème de Connexion

L'erreur `Access denied for user 'root'@'localhost'` indique que MySQL nécessite un mot de passe pour l'utilisateur root.

## 🚀 Solutions

### **Solution 1 : Configurer le mot de passe MySQL**

1. **Ouvrir MySQL en ligne de commande :**

   ```bash
   mysql -u root -p
   ```

2. **Si vous connaissez le mot de passe, entrez-le. Sinon, essayez :**

   - Mot de passe vide (appuyez sur Entrée)
   - `root`
   - `password`
   - `admin`

3. **Une fois connecté, créer la base de données :**
   ```sql
   CREATE DATABASE recipe_app;
   USE recipe_app;
   ```

### **Solution 2 : Réinitialiser le mot de passe MySQL**

1. **Arrêter MySQL :**

   ```bash
   sudo service mysql stop
   # ou
   brew services stop mysql
   ```

2. **Démarrer MySQL en mode sécurisé :**

   ```bash
   sudo mysqld_safe --skip-grant-tables &
   ```

3. **Se connecter sans mot de passe :**

   ```bash
   mysql -u root
   ```

4. **Réinitialiser le mot de passe :**

   ```sql
   USE mysql;
   UPDATE user SET authentication_string=PASSWORD('') WHERE User='root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Redémarrer MySQL normalement :**
   ```bash
   sudo service mysql restart
   # ou
   brew services start mysql
   ```

### **Solution 3 : Utiliser phpMyAdmin**

1. **Ouvrir phpMyAdmin :**

   ```
   http://localhost/phpmyadmin
   ```

2. **Créer la base de données :**

   - Cliquer sur "Nouvelle base de données"
   - Nom : `recipe_app`
   - Collation : `utf8mb4_unicode_ci`
   - Cliquer sur "Créer"

3. **Importer le schéma :**
   - Sélectionner la base `recipe_app`
   - Cliquer sur "Importer"
   - Choisir le fichier `database_setup.sql`
   - Cliquer sur "Exécuter"

## ⚙️ Configuration Alternative

Si vous préférez utiliser un autre utilisateur MySQL :

### **1. Créer un nouvel utilisateur :**

```sql
CREATE USER 'recipe_user'@'localhost' IDENTIFIED BY 'recipe_password';
GRANT ALL PRIVILEGES ON recipe_app.* TO 'recipe_user'@'localhost';
FLUSH PRIVILEGES;
```

### **2. Mettre à jour la configuration :**

Modifiez `backend/config.js` :

```javascript
module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "recipe_user",
    password: "recipe_password",
    database: "recipe_app",
  },
  port: 5000,
};
```

## 🧪 Test de Connexion

Une fois la base de données configurée, testez la connexion :

```bash
cd backend
node test-database.js
```

## 📋 Vérifications

### **1. Vérifier que MySQL fonctionne :**

```bash
# Vérifier le statut
sudo service mysql status
# ou
brew services list | grep mysql

# Vérifier le port
lsof -i :3306
```

### **2. Vérifier la connexion :**

```bash
mysql -u root -p
# ou
mysql -u recipe_user -p
```

### **3. Vérifier la base de données :**

```sql
SHOW DATABASES;
USE recipe_app;
SHOW TABLES;
```

## 🔧 Configuration Recommandée

Pour un environnement de développement, utilisez cette configuration :

```javascript
// backend/config.js
module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", // ou votre mot de passe MySQL
    database: "recipe_app",
  },
  port: 5000,
};
```

## 🚨 Dépannage

### **Erreur : "Access denied"**

- Vérifiez le nom d'utilisateur et le mot de passe
- Vérifiez que l'utilisateur a les permissions nécessaires

### **Erreur : "Can't connect to MySQL server"**

- Vérifiez que MySQL est démarré
- Vérifiez que le port 3306 est libre
- Vérifiez la configuration réseau

### **Erreur : "Unknown database"**

- Créez la base de données `recipe_app`
- Vérifiez le nom de la base dans la configuration

## ✅ Une fois configuré

Votre application sera prête avec :

- ✅ Base de données MySQL fonctionnelle
- ✅ Table `recipes` créée
- ✅ Connexion backend/database établie
- ✅ API prête à recevoir des requêtes

**Votre application de gestion des recettes sera alors complètement opérationnelle ! 🎉**
