# 👥 Système d'Utilisateurs - Guide Complet

## 🎯 Fonctionnalités Ajoutées

### **✅ Système d'Authentification Complet**

- **Inscription** de nouveaux utilisateurs
- **Connexion** avec nom d'utilisateur/email
- **Gestion des sessions** avec JWT
- **Profil utilisateur** personnalisé
- **Recettes privées** par utilisateur

## 🗄️ Base de Données

### **Table `users`**

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Table `recipes` (modifiée)**

```sql
ALTER TABLE recipes ADD COLUMN user_id INT;
ALTER TABLE recipes ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

## 🔧 Backend - API Endpoints

### **Authentification**

- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mise à jour du profil
- `DELETE /api/users/profile` - Suppression du compte

### **Recettes avec Utilisateurs**

- `GET /api/recipes` - Toutes les recettes (avec info utilisateur)
- `GET /api/recipes?my_recipes=true` - Mes recettes seulement
- `POST /api/recipes` - Créer une recette (associée à l'utilisateur)

## 🎨 Frontend - Composants

### **1. AuthManager.jsx**

- **Gestion globale** de l'authentification
- **Boutons** de connexion/inscription
- **Affichage** du profil utilisateur
- **Déconnexion** automatique

### **2. LoginForm.jsx**

- **Formulaire de connexion** moderne
- **Validation** côté client
- **Gestion d'erreurs** avec messages clairs
- **Lien** vers l'inscription

### **3. RegisterForm.jsx**

- **Formulaire d'inscription** complet
- **Validation** des mots de passe
- **Champs optionnels** (prénom, nom)
- **Lien** vers la connexion

### **4. AuthService.js**

- **Service centralisé** pour l'authentification
- **Gestion des tokens** JWT
- **Intercepteurs axios** automatiques
- **Méthodes utilitaires** pour les recettes

## 🚀 Installation et Configuration

### **1. Installer les Dépendances**

```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### **2. Configurer la Base de Données**

```bash
# Exécuter le script SQL
mysql -u root -p < database_setup_users.sql
```

### **3. Configurer l'Environnement**

```bash
# Créer le fichier .env dans backend/
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
```

### **4. Redémarrer le Backend**

```bash
cd backend
npm run dev
```

## 📱 Interface Utilisateur

### **État Non Connecté**

```
┌─────────────────────────────────────┐
│ 🍳 Gestionnaire de Recettes         │
│ [Connexion] [Inscription]           │
├─────────────────────────────────────┤
│ Toutes les recettes publiques...    │
└─────────────────────────────────────┘
```

### **État Connecté**

```
┌─────────────────────────────────────┐
│ 🍳 Gestionnaire de Recettes         │
│ 👤 John Doe [Déconnexion]           │
├─────────────────────────────────────┤
│ Mes recettes privées...             │
│ [Ajouter une Recette]              │
└─────────────────────────────────────┘
```

## 🔐 Sécurité

### **Authentification JWT**

- **Tokens sécurisés** avec expiration (7 jours)
- **Hachage des mots de passe** avec bcrypt
- **Validation** côté serveur et client
- **Protection** des routes sensibles

### **Validation des Données**

- **Nom d'utilisateur** : 3-50 caractères, unique
- **Email** : Format valide, unique
- **Mot de passe** : Minimum 6 caractères
- **Champs optionnels** : Prénom, nom de famille

## 🎯 Fonctionnalités Utilisateur

### **✅ Inscription**

1. **Remplir le formulaire** avec les informations
2. **Validation automatique** des données
3. **Création du compte** avec mot de passe haché
4. **Connexion automatique** après inscription

### **✅ Connexion**

1. **Saisir** nom d'utilisateur/email et mot de passe
2. **Vérification** des identifiants
3. **Génération** du token JWT
4. **Stockage** des données en local

### **✅ Gestion des Recettes**

1. **Recettes privées** - Seul l'utilisateur peut les voir
2. **Association automatique** à l'utilisateur connecté
3. **Filtrage** par utilisateur
4. **Protection** des données personnelles

## 🧪 Test du Système

### **1. Test d'Inscription**

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### **2. Test de Connexion**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "password123"
  }'
```

### **3. Test des Recettes Privées**

```bash
curl -X GET "http://localhost:3000/api/recipes?my_recipes=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🎉 Avantages du Système

### **✅ Sécurité**

- **Authentification robuste** avec JWT
- **Hachage sécurisé** des mots de passe
- **Validation** des données
- **Protection** des routes sensibles

### **✅ Expérience Utilisateur**

- **Interface intuitive** pour l'authentification
- **Gestion automatique** des sessions
- **Recettes personnalisées** par utilisateur
- **Navigation fluide** entre les états

### **✅ Fonctionnalités**

- **Comptes utilisateurs** individuels
- **Recettes privées** par utilisateur
- **Profil personnalisé** avec avatar
- **Gestion des sessions** persistantes

## 🚀 Prochaines Étapes

### **Fonctionnalités Avancées Possibles**

- **Avatars** personnalisés
- **Partage** de recettes entre utilisateurs
- **Favoris** et collections
- **Commentaires** et notes
- **Recherche** avancée par utilisateur
- **Export/Import** des recettes

**🎯 Votre système d'utilisateurs est maintenant opérationnel ! Chaque utilisateur peut créer et gérer ses propres recettes de manière sécurisée.**
