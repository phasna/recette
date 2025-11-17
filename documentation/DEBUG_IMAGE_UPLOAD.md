# 🔍 Guide de Débogage - Upload d'Images

## 🎯 Problème Identifié

Vous dites que :

- ✅ **L'image s'ajoute bien** dans la base de données
- ❌ **Quand vous sauvegardez**, ça marque "non valide"

## 🔧 Étapes de Débogage

### 1. **Ouvrez la Console du Navigateur**

1. **Appuyez sur F12** ou **Clic droit → Inspecter**
2. **Allez dans l'onglet "Console"**
3. **Rafraîchissez la page**

### 2. **Testez l'Ajout d'une Recette**

1. **Allez sur "Ajouter une recette"**
2. **Uploadez une petite image** (< 500KB)
3. **Remplissez les champs obligatoires**
4. **Cliquez sur "Créer la recette"**
5. **Regardez la console** pour voir les logs

### 3. **Logs à Surveiller**

Vous devriez voir dans la console :

```
📤 Données envoyées au backend : {title: "...", image_url: "data:image/jpeg;base64,..."}
📷 image_url : data:image/jpeg;base64,/9j/4AAQ...
📷 Taille image_url : 123456 caractères
📷 Type image_url : string
📊 Statut de la réponse : 200
✅ Recette créée avec succès: {success: true, ...}
```

### 4. **Si Vous Voyez une Erreur 400**

```
❌ Erreur lors de la création: {message: "L'image est trop grande (max 1MB)"}
```

**Solution** : Réduisez la taille de votre image

### 5. **Si Vous Voyez une Erreur 500**

```
❌ Erreur lors de la création: {message: "Erreur interne du serveur"}
```

**Solution** : Le serveur backend a un problème

## 🎯 Tests Spécifiques

### Test 1 : Petite Image

- **Taille** : < 100KB
- **Format** : JPG ou PNG
- **Résultat attendu** : ✅ Succès

### Test 2 : Image Moyenne

- **Taille** : 200-500KB
- **Format** : JPG ou PNG
- **Résultat attendu** : ✅ Succès

### Test 3 : Grande Image

- **Taille** : > 1MB
- **Format** : JPG ou PNG
- **Résultat attendu** : ❌ Erreur "L'image est trop grande"

## 🔍 Diagnostic des Erreurs

### Erreur "L'image est trop grande (max 1MB)"

- **Cause** : Image > 1MB
- **Solution** : Compressez l'image avec [TinyPNG](https://tinypng.com/)

### Erreur "Veuillez sélectionner une image valide"

- **Cause** : Fichier non-image (PDF, DOC, etc.)
- **Solution** : Sélectionnez un fichier image (PNG, JPG, GIF)

### Erreur "Erreur lors de la lecture de l'image"

- **Cause** : Fichier corrompu
- **Solution** : Essayez avec une autre image

### Erreur 400 (Bad Request)

- **Cause** : Données mal formatées
- **Solution** : Vérifiez les logs dans la console

## 📱 Test Immédiat

### 1. **Testez avec une Très Petite Image**

1. **Prenez une image** de 50KB maximum
2. **Uploadez-la** dans le formulaire
3. **Regardez la console**
4. **Dites-moi ce que vous voyez**

### 2. **Vérifiez la Taille**

Dans la console, vous devriez voir :

```
📷 Taille image_url : 50000 caractères
```

Si c'est > 1,300,000 caractères, l'image est trop grande !

## 🆘 Si Rien Ne Fonctionne

### 1. **Redémarrez Tout**

```bash
# Arrêter le backend
Ctrl+C dans le terminal backend

# Redémarrer le backend
cd backend
npm start

# Rafraîchir le frontend
F5 dans le navigateur
```

### 2. **Vérifiez la Base de Données**

La colonne `image_url` doit être de type `LONGTEXT` :

```sql
DESCRIBE recipes;
-- image_url doit être LONGTEXT
```

### 3. **Testez avec une URL**

Au lieu d'uploader, collez une URL d'image :

```
https://via.placeholder.com/400x300.jpg
```

## 📊 Rapport de Débogage

Quand vous testez, dites-moi :

1. **Quelle est la taille** de l'image que vous uploadez ?
2. **Que voyez-vous dans la console** ?
3. **Quel est le statut de la réponse** (200, 400, 500) ?
4. **Quel message d'erreur** apparaît ?

Avec ces informations, je pourrai vous aider à résoudre le problème ! 🎯
