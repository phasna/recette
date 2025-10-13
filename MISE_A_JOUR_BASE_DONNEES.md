# 🔧 Guide Simple : Ajouter la Colonne Pays à la Base de Données

## ⚠️ IMPORTANT : Votre base de données n'a pas encore été mise à jour !

Pour que le champ "pays" fonctionne, vous devez suivre **UNE SEULE** de ces méthodes :

---

## 📌 MÉTHODE 1 : Via phpMyAdmin (LA PLUS SIMPLE) ✅

### Étape par étape :

1. **Ouvrez phpMyAdmin**

   - Si vous utilisez MAMP : http://localhost:8888/phpMyAdmin
   - Sinon : http://localhost/phpMyAdmin

2. **Connectez-vous** (si demandé)

   - Utilisateur : `root`
   - Mot de passe : `root` (ou vide)

3. **Sélectionnez la base de données**

   - Cliquez sur `recipe_app` dans la liste à gauche

4. **Ouvrez l'onglet SQL**

   - Cliquez sur l'onglet "SQL" en haut

5. **Copiez-collez cette commande :**

   ```sql
   ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;
   ```

6. **Cliquez sur "Exécuter"** (ou "Go")

7. **Vérifiez le résultat**
   - Vous devriez voir un message de succès ✅
   - Allez sur la table `users` et vérifiez que la colonne `country` existe

---

## 📌 MÉTHODE 2 : Via Terminal MySQL

### Si MySQL est démarré :

```bash
# Ouvrez un terminal et tapez :
mysql -u root -p

# Entrez votre mot de passe (souvent 'root' ou vide)

# Puis exécutez ces commandes :
USE recipe_app;
ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;
DESCRIBE users;

# Vous devriez voir la colonne 'country' dans la liste
```

---

## 📌 MÉTHODE 3 : Via MySQL Workbench

1. Ouvrez MySQL Workbench
2. Connectez-vous à votre serveur MySQL
3. Sélectionnez la base `recipe_app`
4. Exécutez cette requête :
   ```sql
   ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;
   ```

---

## ✅ Comment vérifier que ça a fonctionné ?

### Via phpMyAdmin :

1. Allez sur la base `recipe_app`
2. Cliquez sur la table `users`
3. Cliquez sur l'onglet "Structure"
4. Vous devriez voir une colonne nommée `country` de type VARCHAR(100)

### Via Terminal :

```bash
mysql -u root -p recipe_app
```

Puis :

```sql
DESCRIBE users;
```

Vous devriez voir quelque chose comme :

```
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| id           | int          | NO   | PRI | NULL    | auto_increment |
| username     | varchar(50)  | NO   | UNI | NULL    |                |
| email        | varchar(100) | NO   | UNI | NULL    |                |
| password     | varchar(255) | NO   |     | NULL    |                |
| first_name   | varchar(50)  | YES  |     | NULL    |                |
| last_name    | varchar(50)  | YES  |     | NULL    |                |
| country      | varchar(100) | YES  |     | NULL    |    ← NOUVEAU!  |
| avatar_url   | varchar(255) | YES  |     | NULL    |                |
| created_at   | timestamp    | YES  |     | CURRENT |                |
| updated_at   | timestamp    | YES  |     | CURRENT |                |
+--------------+--------------+------+-----+---------+----------------+
```

---

## 🚀 Après la mise à jour

Une fois la colonne `country` ajoutée :

1. **Redémarrez le backend**

   ```bash
   cd backend
   npm start
   ```

2. **Redémarrez le frontend** (si nécessaire)

   ```bash
   cd frontend
   npm start
   ```

3. **Testez l'inscription**

   - Allez sur http://localhost:3001/auth
   - Créez un nouveau compte
   - Vous devriez voir le champ "Pays 🌍"

4. **Testez le profil**
   - Connectez-vous
   - Allez sur votre profil
   - Vous devriez voir vos informations avec le pays

---

## ❌ Problèmes courants

### "Table 'users' doesn't exist"

➡️ Vérifiez que vous avez sélectionné la bonne base de données `recipe_app`

### "Column 'country' already exists"

➡️ Parfait ! La colonne existe déjà, vous pouvez passer à l'étape suivante

### "Access denied"

➡️ Vérifiez vos identifiants MySQL (utilisateur/mot de passe)

### MySQL ne démarre pas

➡️ Si vous utilisez MAMP, assurez-vous que MAMP est démarré

---

## 📝 Commande SQL à copier-coller

Voici la commande exacte à exécuter (choisissez la méthode qui vous convient le mieux) :

```sql
ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;
```

---

## 🎯 Résumé en 3 étapes

1. ✅ **Ouvrez phpMyAdmin** → http://localhost:8888/phpMyAdmin
2. ✅ **Sélectionnez `recipe_app`** → Onglet SQL
3. ✅ **Exécutez** : `ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;`

C'est tout ! 🎉

---

_Une fois terminé, testez l'inscription avec le champ pays et vérifiez votre profil !_
