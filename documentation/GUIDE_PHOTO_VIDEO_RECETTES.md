# 📸 Guide : Ajout de Photos et Vidéos aux Recettes

## 🎯 Résumé

Ce guide explique comment ajouter des photos et des liens vidéo à vos recettes dans l'application Food Community.

---

## 🆕 Nouvelles Fonctionnalités

### 1. **Photo de Recette** 📷

- Ajoutez une URL d'image pour illustrer votre recette
- L'image s'affiche en grand dans la page de détails
- Aperçu en temps réel dans le formulaire

### 2. **Lien Vidéo** 🎥

- Ajoutez un lien vers une vidéo (YouTube, Vimeo, etc.)
- Support des vidéos YouTube intégrées automatiquement
- Lecteur vidéo directement dans la page de détails

---

## 📋 Guide d'Installation

### Étape 1 : Mise à jour de la base de données

Exécutez le script SQL pour ajouter les nouvelles colonnes :

```bash
mysql -u root -p food_community < database/add_media_columns.sql
```

Ou manuellement dans MySQL :

```sql
USE food_community;

ALTER TABLE recipes
ADD COLUMN image_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de l\'image de la recette',
ADD COLUMN video_url VARCHAR(500) DEFAULT NULL COMMENT 'URL de la vidéo (YouTube, etc.)';
```

### Étape 2 : Redémarrer les serveurs

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 📝 Comment Utiliser

### Ajouter une Recette avec Photo et Vidéo

1. **Aller sur "Ajouter une Recette"**

   - Depuis votre dashboard, cliquez sur "➕ Ajouter une recette"

2. **Remplir les informations de base**

   - Titre \*
   - Description
   - Ingrédients \*
   - Instructions \*
   - Temps, portions, difficulté

3. **Ajouter la Photo** 📷

   - Trouvez une image de votre recette sur internet
   - Copiez l'URL de l'image
   - Collez l'URL dans le champ "📷 URL de la photo"
   - **Aperçu instantané** : L'image s'affiche automatiquement

   **Exemple d'URLs valides :**

   ```
   https://exemple.com/ma-recette.jpg
   https://i.imgur.com/abc123.png
   https://images.unsplash.com/photo-...
   ```

4. **Ajouter la Vidéo** 🎥

   - Trouvez une vidéo YouTube (ou autre) de la recette
   - Copiez le lien de la vidéo
   - Collez dans le champ "🎥 Lien vidéo"

   **Exemple d'URLs YouTube :**

   ```
   https://youtube.com/watch?v=abc123
   https://youtu.be/abc123
   https://vimeo.com/123456789
   ```

5. **Sauvegarder**
   - Cliquez sur "🍳 Créer la recette"
   - La recette est créée avec la photo et la vidéo !

---

## 🎨 Affichage des Médias

### Page de Détails de Recette

Quand quelqu'un consulte votre recette :

#### **Photo**

- **Avec photo** : L'image s'affiche en grand (264px de hauteur) en haut de la page
- **Sans photo** : Un emoji de cuisine (🍳) s'affiche par défaut

#### **Vidéo**

- **YouTube** : La vidéo est intégrée directement (lecteur YouTube)
- **Autres plateformes** : Un bouton "Voir la vidéo" s'affiche

---

## 💡 Conseils et Astuces

### Pour les Photos

1. **Où trouver des images ?**

   - 🔍 Google Images
   - 📸 Unsplash (images gratuites)
   - 🖼️ Imgur (hébergement gratuit)
   - 📷 Vos propres photos (hébergez-les sur Imgur ou similaire)

2. **Comment héberger vos propres photos ?**

   - Allez sur [imgur.com](https://imgur.com)
   - Uploadez votre photo
   - Clic droit → "Copier l'adresse de l'image"
   - Collez dans le formulaire

3. **Formats recommandés**
   - ✅ JPG, PNG, WebP
   - 📏 Ratio 16:9 ou 4:3
   - 💾 Taille : < 2 MB pour un chargement rapide

### Pour les Vidéos

1. **YouTube (recommandé)**

   - Le lien YouTube sera automatiquement converti en lecteur intégré
   - Formats acceptés :
     - `https://youtube.com/watch?v=VIDEO_ID`
     - `https://youtu.be/VIDEO_ID`

2. **Autres plateformes**

   - Vimeo, Dailymotion, etc.
   - Un lien cliquable sera affiché

3. **Conseils**
   - ✅ Assurez-vous que la vidéo est publique
   - ✅ Vérifiez que le lien fonctionne avant de l'ajouter
   - 📹 Vidéos courtes (2-5 min) = meilleure engagement

---

## 🔄 Modifier une Recette Existante

Vous pouvez ajouter une photo et une vidéo à une recette déjà créée :

1. **Depuis votre Dashboard**

   - Trouvez la recette
   - Cliquez sur le bouton "✏️ Modifier"

2. **Ajouter les Médias**

   - Faites défiler jusqu'à la section "Photo et Vidéo"
   - Ajoutez les URLs
   - **Aperçu instantané** disponible

3. **Sauvegarder**
   - Cliquez sur "✅ Sauvegarder"
   - Les médias sont maintenant visibles !

---

## 🎯 Exemples Pratiques

### Exemple 1 : Recette de Pâtes Carbonara

**Photo :**

```
https://images.unsplash.com/photo-1612874742237-6526221588e3
```

**Vidéo :**

```
https://youtube.com/watch?v=3AAdKl1UYZs
```

### Exemple 2 : Recette de Gâteau au Chocolat

**Photo :**

```
https://i.imgur.com/abc123.jpg
```

**Vidéo :**

```
https://youtu.be/xyz789
```

---

## 🐛 Résolution des Problèmes

### ❌ La photo ne s'affiche pas

**Causes possibles :**

1. URL incorrecte ou cassée
2. Image supprimée du serveur d'origine
3. URL ne se termine pas par .jpg, .png, etc.

**Solutions :**

- Vérifiez que l'URL se termine par une extension d'image
- Testez l'URL dans votre navigateur
- Ré-hébergez l'image sur Imgur

### ❌ La vidéo ne s'affiche pas

**Causes possibles :**

1. Vidéo privée ou restreinte
2. Lien incorrect

**Solutions :**

- Assurez-vous que la vidéo est publique
- Utilisez le bouton "Partager" de YouTube pour obtenir le bon lien
- Testez le lien dans un navigateur

### ❌ Erreur "URL trop longue"

**Solution :**

- Maximum 500 caractères
- Utilisez un raccourcisseur d'URL (bit.ly)

---

## 📊 Spécifications Techniques

### Base de Données

```sql
image_url VARCHAR(500) DEFAULT NULL
video_url VARCHAR(500) DEFAULT NULL
```

### Validation Backend

- **image_url** : Maximum 500 caractères
- **video_url** : Maximum 500 caractères
- Les deux champs sont **optionnels**

### Frontend

**Composants modifiés :**

- `AddRecipe.jsx` - Ajout des champs
- `EditRecipe.jsx` - Ajout des champs
- `RecipeDetailsPage.jsx` - Affichage des médias

**Fonctionnalités :**

- ✅ Aperçu en temps réel de la photo
- ✅ Validation d'URL
- ✅ Gestion d'erreur si l'image ne charge pas
- ✅ Intégration automatique YouTube
- ✅ Responsive design

---

## 🎨 Design

### Section Photo/Vidéo dans le Formulaire

- **Fond** : Dégradé bleu-violet
- **Bordure** : Pointillée pour indiquer l'optionnel
- **Icônes** : 📷 pour photo, 🎥 pour vidéo
- **Aperçu** : Image affichée immédiatement

### Affichage dans la Page de Détails

- **Photo** :
  - Hauteur fixe de 264px
  - Pleine largeur
  - Overlay gradient pour meilleure lisibilité
- **Vidéo** :
  - Ratio 16:9 (responsive)
  - Lecteur YouTube intégré
  - Bouton alternatif pour autres plateformes

---

## 📱 Compatibilité

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablette (iPad, Android)

---

## 🔐 Sécurité

- Les URLs sont stockées en texte brut (pas d'upload de fichiers)
- Aucun risque de virus ou malware
- Les vidéos sont chargées depuis les serveurs YouTube/Vimeo
- Validation de longueur côté backend

---

## 🚀 Fonctionnalités Futures

Idées d'améliorations possibles :

1. **Upload direct de photos**
   - Intégration avec un service de stockage (AWS S3, Cloudinary)
2. **Galerie de photos**

   - Plusieurs photos par recette
   - Slider/carrousel

3. **Playlist de vidéos**

   - Plusieurs vidéos (préparation, astuces, variantes)

4. **Génération automatique de miniatures**

   - Extraction de l'image de la vidéo YouTube

5. **Compression d'images automatique**
   - Optimisation pour un chargement plus rapide

---

## 📞 Support

En cas de problème :

1. Vérifiez que la migration SQL a été exécutée
2. Redémarrez les serveurs backend et frontend
3. Videz le cache de votre navigateur
4. Consultez la console pour les erreurs

---

## ✅ Checklist de Déploiement

Avant de déployer en production :

- [ ] Migration SQL exécutée
- [ ] Backend redémarré
- [ ] Frontend compilé et redémarré
- [ ] Test d'ajout de recette avec photo
- [ ] Test d'ajout de recette avec vidéo YouTube
- [ ] Test de modification de recette existante
- [ ] Test d'affichage sur mobile
- [ ] Vérification que les recettes sans média fonctionnent toujours

---

**Date de création** : 21 octobre 2025  
**Version** : 1.0  
**Auteur** : Food Community Team

---

## 🎉 Conclusion

Vos recettes sont maintenant plus attrayantes avec des photos et des vidéos !

**Profitez bien de cette nouvelle fonctionnalité ! 🍳📸🎥**
