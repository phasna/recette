# 🍳 Application de Gestion des Recettes

Une application web moderne pour gérer vos recettes de cuisine, développée avec React, Express.js et MySQL.

## 🚀 Fonctionnalités

- ✅ **Ajouter des recettes** : Créez de nouvelles recettes avec tous les détails
- ✅ **Consulter les recettes** : Visualisez toutes vos recettes dans une interface élégante
- ✅ **Modifier les recettes** : Éditez vos recettes existantes
- ✅ **Supprimer les recettes** : Supprimez les recettes que vous ne voulez plus
- ✅ **Interface moderne** : Design responsive et intuitif
- ✅ **Base de données persistante** : Vos recettes sont sauvegardées en base

## 🛠️ Technologies utilisées

### Frontend

- **React** - Framework JavaScript pour l'interface utilisateur
- **Tailwind CSS** - Framework CSS utilitaire pour un design moderne et responsive
- **Axios** - Client HTTP pour les appels API

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web pour Node.js
- **MySQL2** - Driver MySQL pour Node.js
- **CORS** - Gestion des requêtes cross-origin

### Base de données

- **MySQL** - Base de données relationnelle
- **phpMyAdmin** - Interface web pour gérer MySQL

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/) (version 8.0 ou supérieure)
- [phpMyAdmin](https://www.phpmyadmin.net/) (optionnel, pour l'interface web)

## 🚀 Installation et démarrage

### 1. Cloner le projet

```bash
cd /Users/phasna/Documents/Addproduct
```

### 2. Installer toutes les dépendances

```bash
npm run install-all
```

### 3. Configuration de la base de données

#### Créer la base de données

1. Ouvrez phpMyAdmin dans votre navigateur (généralement `http://localhost/phpmyadmin`)
2. Créez une nouvelle base de données nommée `recipe_app`
3. Ou utilisez MySQL en ligne de commande :

```sql
CREATE DATABASE recipe_app;
```

#### Configuration de la connexion

Le fichier `backend/config.js` contient la configuration de la base de données. Modifiez les paramètres selon votre configuration MySQL :

```javascript
module.exports = {
  database: {
    host: "localhost", // Adresse de votre serveur MySQL
    user: "root", // Nom d'utilisateur MySQL
    password: "", // Mot de passe MySQL
    database: "recipe_app", // Nom de la base de données
  },
  port: 5000,
};
```

### 4. Démarrer l'application

#### Option 1 : Démarrer tout en une fois

```bash
npm run dev
```

#### Option 2 : Démarrer séparément

**Backend (Terminal 1) :**

```bash
npm run server
```

**Frontend (Terminal 2) :**

```bash
npm run client
```

### 5. Accéder à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **phpMyAdmin** : http://localhost/phpmyadmin

## 📁 Structure du projet

```
Addproduct/
├── backend/                 # Serveur Express.js
│   ├── config.js           # Configuration de la base de données
│   ├── database.js         # Connexion et création des tables
│   ├── server.js           # Serveur principal avec les routes API
│   └── package.json        # Dépendances du backend
├── frontend/               # Application React
│   ├── src/
│   │   ├── App.js          # Composant principal
│   │   ├── App.css         # Styles de l'application
│   │   └── index.js        # Point d'entrée React
│   └── package.json        # Dépendances du frontend
├── package.json            # Scripts principaux
└── README.md              # Documentation
```

## 🔧 API Endpoints

### Recettes

- `GET /api/recipes` - Récupérer toutes les recettes
- `GET /api/recipes/:id` - Récupérer une recette par ID
- `POST /api/recipes` - Créer une nouvelle recette
- `PUT /api/recipes/:id` - Mettre à jour une recette
- `DELETE /api/recipes/:id` - Supprimer une recette

### Test

- `GET /api/test` - Tester la connexion API

## 📊 Structure de la base de données

### Table `recipes`

| Champ        | Type         | Description                                     |
| ------------ | ------------ | ----------------------------------------------- |
| id           | INT          | Identifiant unique (auto-incrémenté)            |
| title        | VARCHAR(255) | Titre de la recette                             |
| description  | TEXT         | Description optionnelle                         |
| ingredients  | TEXT         | Liste des ingrédients                           |
| instructions | TEXT         | Instructions de préparation                     |
| prep_time    | INT          | Temps de préparation en minutes                 |
| cook_time    | INT          | Temps de cuisson en minutes                     |
| servings     | INT          | Nombre de portions                              |
| difficulty   | ENUM         | Niveau de difficulté (Facile, Moyen, Difficile) |
| created_at   | TIMESTAMP    | Date de création                                |
| updated_at   | TIMESTAMP    | Date de dernière modification                   |

## 🎨 Fonctionnalités de l'interface

### Page principale

- **Vue en grille** des recettes avec cartes élégantes
- **Bouton d'ajout** pour créer de nouvelles recettes
- **Actions rapides** : modifier et supprimer directement depuis les cartes

### Formulaire de recette

- **Champs requis** : titre, ingrédients, instructions
- **Champs optionnels** : description, temps, portions, difficulté
- **Validation** côté client et serveur
- **Mode édition** pour modifier les recettes existantes

### Design responsive

- **Mobile-first** : optimisé pour tous les écrans avec Tailwind CSS
- **Animations fluides** : transitions et effets hover intégrés
- **Thème moderne** : système de couleurs personnalisé et typographie soignée
- **Classes utilitaires** : développement rapide avec Tailwind CSS

## 🐛 Dépannage

### Problèmes courants

#### Erreur de connexion à la base de données

- Vérifiez que MySQL est démarré
- Vérifiez les paramètres dans `backend/config.js`
- Assurez-vous que la base de données `recipe_app` existe

#### Erreur CORS

- Le backend est configuré pour accepter les requêtes depuis `localhost:3000`
- Vérifiez que le frontend tourne sur le port 3000

#### Port déjà utilisé

- Changez le port dans `backend/config.js` si le port 5000 est occupé
- Ou arrêtez le processus qui utilise le port

### Logs utiles

- **Backend** : Les logs s'affichent dans le terminal du serveur
- **Frontend** : Ouvrez les outils de développement du navigateur (F12)

## 🔮 Améliorations futures

- [ ] **Recherche et filtres** : Rechercher par nom, ingrédient, difficulté
- [ ] **Catégories** : Organiser les recettes par type (entrée, plat, dessert)
- [ ] **Images** : Ajouter des photos aux recettes
- [ ] **Favoris** : Marquer les recettes préférées
- [ ] **Export/Import** : Sauvegarder et partager les recettes
- [ ] **Authentification** : Système de comptes utilisateurs
- [ ] **Partage** : Partager des recettes entre utilisateurs

## 📝 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

---

**Bon appétit ! 🍽️**
