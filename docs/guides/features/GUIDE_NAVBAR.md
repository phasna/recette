# 🧭 Guide de Dépannage - Navbar

## 🔍 Problèmes courants et solutions

### 1. La navbar n'apparaît pas du tout

**Causes possibles :**

- La navbar est masquée sur mobile (`hidden lg:block`)
- Problème de CSS ou de z-index
- Le composant Layout n'est pas rendu

**Solutions :**

```bash
# Vérifier dans la console
debugNavbar()
```

### 2. La navbar est trop étroite ou trop large

**Causes possibles :**

- Classes CSS de largeur incorrectes
- Problème de responsive design

**Solutions :**

- Vérifier les classes `w-16` et `w-64`
- Ajouter `min-w-16` pour éviter qu'elle soit trop étroite

### 3. Les boutons de connexion ne fonctionnent pas

**Causes possibles :**

- Événements personnalisés non écoutés
- AuthManager non monté
- Problème de z-index

**Solutions :**

```javascript
// Tester les événements
const event = new CustomEvent("openLoginForm");
window.dispatchEvent(event);
```

### 4. La navbar disparaît après une action

**Causes possibles :**

- Rechargement de page
- Changement d'état
- Problème de CSS

**Solutions :**

- Vérifier les logs de la console
- Utiliser `debugNavbar()` pour diagnostiquer

## 🛠️ Commandes de diagnostic

### Diagnostic complet

```javascript
// Copiez et collez dans la console
debugNavbar();
```

### Test des événements

```javascript
// Tester l'ouverture du formulaire de connexion
const loginEvent = new CustomEvent("openLoginForm");
window.dispatchEvent(loginEvent);
```

### Vérifier l'état de l'utilisateur

```javascript
// Vérifier si l'utilisateur est connecté
console.log("User:", localStorage.getItem("user"));
console.log("Token:", localStorage.getItem("token"));
```

## 🎯 Solutions rapides

### 1. Forcer l'affichage de la navbar

```css
/* Ajouter dans le CSS si nécessaire */
.navbar {
  display: block !important;
  width: 256px !important;
}
```

### 2. Réinitialiser l'état

```javascript
// Vider le localStorage et recharger
localStorage.clear();
location.reload();
```

### 3. Test de connexion automatique

```javascript
// Utiliser le bouton "🧪 Test Auto" dans la navbar
// Ou exécuter manuellement :
testAutoConnection();
```

## 📱 Problèmes spécifiques

### Mobile

- La navbar peut être masquée sur mobile
- Utiliser le bouton de collapse pour l'ouvrir
- Vérifier la largeur de l'écran

### Desktop

- La navbar devrait être visible par défaut
- Vérifier les classes CSS de largeur
- Tester le bouton de collapse

## 🚨 En cas de problème persistant

1. **Ouvrir la console** (F12)
2. **Exécuter** `debugNavbar()`
3. **Vérifier** les messages d'erreur
4. **Recharger** la page si nécessaire
5. **Utiliser** le bouton "🧪 Test Auto" pour se connecter
