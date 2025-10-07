# 📁 Guide de la Structure Organisée

## 🎯 **Nouvelle architecture**

L'application est maintenant organisée en **deux espaces distincts** :

### 🌐 **Espace Visiteur (Public)**

- **URL** : `/`
- **Accès** : Public, pas de connexion requise
- **Contenu** : Aperçu des recettes, présentation de l'app
- **Navigation** : Boutons de connexion/inscription

### 🔐 **Espace Utilisateur (Privé)**

- **URL** : `/dashboard`, `/profile`
- **Accès** : Connexion requise
- **Contenu** : Recettes personnelles, favoris, profil
- **Navigation** : Navbar latérale avec toutes les fonctionnalités

## 📁 **Structure des dossiers**

```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── VisitorLayout.jsx      # Layout pour visiteurs
│   │   └── UserLayout.jsx         # Layout pour utilisateurs
│   ├── forms/                     # Formulaires
│   ├── cards/                     # Cartes de recettes
│   └── utils/                     # Utilitaires
├── pages/
│   ├── visitor/
│   │   └── VisitorHome.jsx        # Page d'accueil publique
│   ├── user/
│   │   ├── UserDashboard.jsx      # Dashboard utilisateur
│   │   └── UserProfile.jsx        # Profil utilisateur
│   └── AuthPage.jsx               # Page de connexion
├── services/                      # Services API
└── utils/                         # Utilitaires
```

## 🚀 **Flux de navigation**

### **1. Visiteur (non connecté)**

```
/ → VisitorHome (avec VisitorLayout)
├── Bouton "Se connecter" → /auth
└── Bouton "S'inscrire" → /auth
```

### **2. Utilisateur connecté**

```
/auth → Connexion → /dashboard
├── /dashboard → UserDashboard (avec UserLayout)
├── /profile → UserProfile (avec UserLayout)
└── Navigation latérale dans UserLayout
```

## 🎨 **Layouts spécialisés**

### **VisitorLayout**

- **Usage** : Pages publiques
- **Contenu** : Navigation simple, pied de page
- **Boutons** : Connexion/Inscription

### **UserLayout**

- **Usage** : Pages privées
- **Contenu** : Navbar latérale, informations utilisateur
- **Fonctionnalités** : Navigation complète, déconnexion

## 📱 **Pages spécialisées**

### **VisitorHome**

- **Rôle** : Page d'accueil publique
- **Contenu** : Présentation, recettes en vedette, statistiques
- **Actions** : Redirection vers connexion/inscription

### **UserDashboard**

- **Rôle** : Tableau de bord utilisateur
- **Contenu** : Statistiques, actions rapides, recettes récentes
- **Navigation** : Vers profil, favoris, ajout de recettes

### **UserProfile**

- **Rôle** : Espace personnel
- **Contenu** : Informations utilisateur, recettes personnelles
- **Actions** : Gestion du profil, déconnexion

## 🔄 **Flux d'authentification**

### **Connexion**

1. **Visiteur** : Clique sur "Se connecter" → `/auth`
2. **Authentification** : Formulaire de connexion
3. **Redirection** : Connexion réussie → `/dashboard`
4. **Interface** : Passage à UserLayout

### **Déconnexion**

1. **Utilisateur** : Clique sur "Se déconnecter"
2. **Nettoyage** : Suppression des données localStorage
3. **Redirection** : Retour à `/` (VisitorHome)

## 🎯 **Avantages de cette structure**

### **✅ Séparation claire**

- **Public** : Accès libre, présentation de l'app
- **Privé** : Fonctionnalités complètes, données personnelles

### **✅ Navigation intuitive**

- **Visiteurs** : Découverte et inscription
- **Utilisateurs** : Gestion complète de leur espace

### **✅ Code organisé**

- **Layouts** : Réutilisables et spécialisés
- **Pages** : Logique métier séparée
- **Composants** : Modulaires et maintenables

## 🧪 **Test de la structure**

### **1. Test visiteur**

1. Aller sur `/`
2. Vérifier l'affichage de VisitorHome
3. Tester les boutons de connexion/inscription

### **2. Test utilisateur**

1. Se connecter via `/auth`
2. Vérifier la redirection vers `/dashboard`
3. Tester la navigation dans UserLayout
4. Accéder au profil via `/profile`

### **3. Test de déconnexion**

1. Se déconnecter depuis UserLayout
2. Vérifier le retour à `/`
3. Confirmer l'accès public

## 🎉 **Résultat final**

- ✅ **Espace visiteur** : Interface publique claire
- ✅ **Espace utilisateur** : Interface privée complète
- ✅ **Structure organisée** : Dossiers logiques
- ✅ **Navigation fluide** : Entre les espaces
- ✅ **Code maintenable** : Composants réutilisables
