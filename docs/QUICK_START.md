# 🚀 Démarrage Rapide

## Installation en 3 étapes

### 1. Installer les dépendances

```bash
npm run install-all
```

### 2. Configurer la base de données

1. Ouvrez phpMyAdmin : http://localhost/phpmyadmin
2. Créez une base de données nommée `recipe_app`
3. Importez le fichier `database_setup.sql` ou exécutez le script SQL

### 3. Démarrer l'application

```bash
npm run dev
```

## Accès

- **Application** : http://localhost:3000
- **API** : http://localhost:5000
- **phpMyAdmin** : http://localhost/phpmyadmin

## Configuration MySQL

Si vous avez des problèmes de connexion, modifiez `backend/config.js` :

```javascript
database: {
  host: 'localhost',
  user: 'root',           // Votre nom d'utilisateur MySQL
  password: '',           // Votre mot de passe MySQL
  database: 'recipe_app'
}
```

## Test rapide

1. Ouvrez http://localhost:3000
2. Cliquez sur "Ajouter une recette"
3. Remplissez le formulaire
4. Sauvegardez et vérifiez que la recette apparaît

🎉 **C'est tout ! Votre application est prête.**
