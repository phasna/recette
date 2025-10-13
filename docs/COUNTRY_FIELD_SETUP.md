# Guide d'Installation du Champ Pays 🌍

## Modifications Effectuées

J'ai apporté les améliorations suivantes à votre application :

### 1. ✅ Base de Données

- **Ajout de la colonne `country`** dans la table `users`
- Script SQL créé : `database/add_country_column.sql`

### 2. ✅ Backend

- **Modèle User.js** : Ajout du champ `country` dans toutes les méthodes
- **Controller userController.js** : Gestion du champ pays lors de l'inscription et de la mise à jour du profil

### 3. ✅ Frontend

- **RegisterForm.jsx** : Ajout d'une liste déroulante complète de tous les pays du monde avec emojis 🌍
- **UserProfile.jsx** :
  - Affichage du pays de l'utilisateur
  - Possibilité de modifier le profil (prénom, nom, pays)
  - Nouvelle section "Informations personnelles" avec design moderne
  - Interface améliorée avec des effets visuels spectaculaires

## Installation

### Étape 1 : Démarrer MySQL

Si vous utilisez MAMP :

```bash
# Démarrer MAMP et vérifier que MySQL est actif
```

Si vous utilisez MySQL directement :

```bash
# macOS/Linux
sudo mysql.server start

# Ou via Homebrew
brew services start mysql
```

### Étape 2 : Exécuter le Script SQL

**Option A - Via la ligne de commande :**

```bash
mysql -u root -p recipe_app < database/add_country_column.sql
```

**Option B - Via phpMyAdmin (MAMP) :**

1. Ouvrez phpMyAdmin (http://localhost:8888/phpMyAdmin)
2. Sélectionnez la base de données `recipe_app`
3. Cliquez sur l'onglet "SQL"
4. Copiez-collez le contenu du fichier `database/add_country_column.sql`
5. Cliquez sur "Exécuter"

**Option C - Via MySQL Workbench :**

1. Ouvrez MySQL Workbench
2. Connectez-vous à votre base de données
3. Ouvrez le fichier `database/add_country_column.sql`
4. Exécutez le script

**Option D - Commande SQL directe :**

```sql
USE recipe_app;
ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER last_name;
```

### Étape 3 : Redémarrer le Backend

```bash
cd backend
npm start
```

### Étape 4 : Redémarrer le Frontend

```bash
cd frontend
npm start
```

## Fonctionnalités Ajoutées

### 1. Inscription avec Pays 🌍

- Lors de l'inscription, les utilisateurs peuvent maintenant sélectionner leur pays
- Liste complète de tous les pays avec emojis drapeaux
- Champ optionnel (pas obligatoire)

### 2. Page de Profil Améliorée 👤

#### Nouvelles Sections :

- **En-tête dynamique** : Affiche le nom, le pays et la date d'inscription
- **Informations personnelles** :
  - Nom d'utilisateur
  - Email
  - Prénom
  - Nom de famille
  - Pays 🌍

#### Mode Édition :

- Bouton "Modifier" pour éditer le profil
- Formulaire d'édition avec :
  - Champ prénom
  - Champ nom de famille
  - Liste déroulante de pays
- Bouton "Enregistrer" pour sauvegarder les modifications

#### Design Amélioré :

- Cartes colorées avec dégradés pour chaque information
- Statistiques visuelles (recettes, favoris, total)
- Actions rapides avec boutons animés
- Effets de survol et animations fluides

### 3. API Backend

#### Endpoint de mise à jour du profil :

```
PUT /api/users/profile
Authorization: Bearer {token}

Body:
{
  "first_name": "John",
  "last_name": "Doe",
  "country": "France"
}
```

## Structure des Fichiers Modifiés

```
backend/
├── models/User.js                    ✅ Modifié - Ajout du champ country
├── controllers/userController.js     ✅ Modifié - Gestion du pays

frontend/
├── src/
│   ├── components/
│   │   └── auth/
│   │       └── RegisterForm.jsx      ✅ Modifié - Liste des pays
│   └── pages/
│       └── user/
│           └── UserProfile.jsx       ✅ Complètement refait

database/
└── add_country_column.sql            ✅ Nouveau fichier
```

## Vérification

### 1. Vérifier la colonne dans la base de données :

```sql
DESCRIBE users;
```

Vous devriez voir une colonne `country` de type VARCHAR(100).

### 2. Tester l'inscription :

1. Allez sur la page d'inscription
2. Remplissez le formulaire
3. Sélectionnez un pays dans la liste
4. Créez votre compte

### 3. Tester la modification du profil :

1. Connectez-vous
2. Allez sur votre profil
3. Cliquez sur "Modifier"
4. Changez votre pays
5. Cliquez sur "Enregistrer"

## Captures d'Écran des Améliorations

### Page d'Inscription

- ✅ Nouveau champ "Pays 🌍" avec liste déroulante
- ✅ Plus de 190 pays disponibles avec emojis drapeaux

### Page de Profil

- ✅ Section "Informations personnelles" avec design moderne
- ✅ Affichage du pays avec emoji 📍
- ✅ Bouton "Modifier" pour éditer le profil
- ✅ Statistiques visuelles améliorées
- ✅ Actions rapides avec animations

## Pays Disponibles (Exemples)

- 🇫🇷 France
- 🇩🇿 Algérie
- 🇲🇦 Maroc
- 🇹🇳 Tunisie
- 🇺🇸 États-Unis
- 🇬🇧 Royaume-Uni
- 🇩🇪 Allemagne
- 🇪🇸 Espagne
- 🇮🇹 Italie
- 🇯🇵 Japon
- 🇨🇳 Chine
- 🇧🇷 Brésil
- ... et 180+ autres pays !

## Dépannage

### Problème : La colonne country n'existe pas

**Solution :** Exécutez le script SQL `add_country_column.sql`

### Problème : Erreur 500 lors de l'inscription

**Solution :** Vérifiez que la colonne country a bien été ajoutée à la base de données

### Problème : Le pays ne s'affiche pas

**Solution :** Vérifiez que l'utilisateur a bien sélectionné un pays lors de l'inscription ou de la modification du profil

## Support

Si vous rencontrez des problèmes, vérifiez :

1. ✅ MySQL est démarré
2. ✅ La colonne `country` existe dans la table `users`
3. ✅ Le backend est redémarré
4. ✅ Le frontend est redémarré

---

🎉 **Profitez de votre application améliorée avec la fonctionnalité pays !**
