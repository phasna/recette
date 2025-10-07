# 🚨 Solution Rapide - Erreur MySQL

## 🎯 Problème Actuel

```
Error: Access denied for user 'root'@'localhost' (using password: NO)
```

## ⚡ Solution en 3 étapes

### **Étape 1: Tester la connexion MySQL**

Ouvrez un terminal et testez :

```bash
# Essai 1: Sans mot de passe
mysql -u root

# Essai 2: Avec mot de passe "root"
mysql -u root -proot

# Essai 3: Avec mot de passe "password"
mysql -u root -ppassword

# Essai 4: Avec mot de passe "admin"
mysql -u root -padmin
```

**Notez quelle commande fonctionne !**

### **Étape 2: Créer la base de données**

Une fois connecté à MySQL, exécutez :

```sql
CREATE DATABASE recipe_app;
USE recipe_app;

-- Créer la table
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INT,
  cook_time INT,
  servings INT,
  difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT 'Facile',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer des données d'exemple
INSERT INTO recipes (title, ingredients, instructions, prep_time, cook_time, servings, difficulty) VALUES
('Pâtes Carbonara', '400g spaghetti\n200g pancetta\n4 œufs', '1. Cuire les pâtes\n2. Faire revenir la pancetta', 15, 15, 4, 'Moyen');

EXIT;
```

### **Étape 3: Mettre à jour la configuration**

Modifiez `backend/config.js` avec le bon mot de passe :

```javascript
module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "VOTRE_MOT_DE_PASSE_ICI", // Remplacez par le mot de passe qui fonctionne
    database: "recipe_app",
  },
  port: 3000,
};
```

## 🧪 Test Final

```bash
cd backend
node test-database.js
```

Si ça fonctionne, vous verrez :

```
✅ Connexion MySQL réussie !
✅ Base de données 'recipe_app' créée
✅ Table 'recipes' créée
```

## 🚀 Démarrer l'Application

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

## 🔧 Solutions Alternatives

### **Si aucun mot de passe ne fonctionne :**

1. **Réinitialiser MySQL :**

   ```bash
   sudo service mysql stop
   sudo mysqld_safe --skip-grant-tables &
   mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   sudo service mysql restart
   ```

2. **Utiliser phpMyAdmin :**

   - Ouvrez http://localhost/phpmyadmin
   - Créez la base `recipe_app`
   - Importez `database_setup.sql`

3. **Créer un nouvel utilisateur :**

   ```sql
   CREATE USER 'recipe_user'@'localhost' IDENTIFIED BY 'recipe_password';
   GRANT ALL PRIVILEGES ON recipe_app.* TO 'recipe_user'@'localhost';
   ```

   Puis mettez à jour `config.js` :

   ```javascript
   user: "recipe_user",
   password: "recipe_password",
   ```

## ✅ Vérification

Une fois configuré, testez l'application complète :

```bash
node test-complete-app.js
```

**Votre application de gestion des recettes sera alors opérationnelle ! 🎉**
