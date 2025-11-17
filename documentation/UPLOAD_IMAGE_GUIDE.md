# 📸 Guide d'Upload d'Images

## ✨ Nouvelle Fonctionnalité

Vous pouvez maintenant **télécharger des images depuis votre ordinateur** au lieu de seulement coller des URLs !

## 🎯 Fonctionnalités

### 1. **Téléchargement de Fichiers**

- 📂 Cliquez sur la zone "Cliquez pour parcourir"
- 🖼️ Sélectionnez une image depuis votre ordinateur
- ⚡ L'image est chargée et convertie en Base64
- 👁️ Aperçu immédiat de l'image

### 2. **Formats Supportés**

- ✅ PNG
- ✅ JPG / JPEG
- ✅ GIF
- ✅ WebP
- ✅ Tous les formats image supportés par le navigateur

### 3. **Limitations**

- 📏 **Taille maximale** : 5MB par image
- 🚫 Seuls les fichiers image sont acceptés
- ⚠️ Les images sont converties en Base64 pour stockage

### 4. **Alternative URL**

Vous pouvez toujours **coller une URL** si vous préférez :

- 🔗 Cliquez sur "ou coller une URL"
- 📋 Collez le lien de votre image
- ✅ L'aperçu s'affiche automatiquement

## 🎨 Interface

### Zone de Upload

```
┌─────────────────────────────────────┐
│         📸                          │
│                                     │
│   Cliquez pour parcourir            │
│   PNG, JPG, GIF jusqu'à 5MB         │
│                                     │
└─────────────────────────────────────┘
         ou coller une URL
    ─────────────────────────
    [https://...]
```

### Aperçu avec Image

```
┌─────────────────────────────────────┐
│                                   ❌│
│                                     │
│        [IMAGE PREVIEW]              │
│                                     │
│                                     │
└─────────────────────────────────────┘
   ✅ Image chargée avec succès
```

## 🔧 Fonctionnalités Techniques

### Conversion Base64

Les images uploadées sont converties en Base64 pour :

- ✅ **Pas besoin de serveur de fichiers** séparé
- ✅ **Stockage direct** dans la base de données
- ✅ **Portabilité** totale des recettes
- ⚠️ **Taille** : les images Base64 sont ~33% plus grandes

### Gestion d'Erreurs

- ❌ **Type invalide** : "Veuillez sélectionner une image valide"
- ❌ **Trop grande** : "L'image ne doit pas dépasser 5MB"
- ❌ **Erreur de lecture** : "Erreur lors de la lecture de l'image"

### Suppression

- 🗑️ Bouton **X rouge** en haut à droite de l'aperçu
- 🔄 Remet à zéro l'image et permet de sélectionner une nouvelle

## 📱 Pages Concernées

### 1. AddRecipe.jsx

- ✅ Upload d'image lors de l'ajout d'une recette
- ✅ Prévisualisation en temps réel
- ✅ Validation avant soumission

### 2. EditRecipe.jsx

- ✅ Upload d'image lors de la modification
- ✅ Affiche l'image existante si présente
- ✅ Permet de changer l'image
- ✅ Option de supprimer l'image

## 🚀 Utilisation

### Ajouter une Image (Nouvelle Recette)

1. Allez sur **Ajouter une recette**
2. Scrollez jusqu'à la section **Photo de la recette**
3. **Option A** : Cliquez sur la zone et sélectionnez un fichier
4. **Option B** : Collez une URL dans le champ texte
5. Vérifiez l'aperçu
6. Continuez à remplir le formulaire
7. Soumettez la recette

### Modifier une Image (Recette Existante)

1. Éditez une recette existante
2. Si une image existe, elle s'affiche automatiquement
3. Cliquez sur le **X rouge** pour la supprimer
4. Uploadez une nouvelle image ou collez une nouvelle URL
5. Sauvegardez les modifications

## 🎯 Avantages

### Pour l'Utilisateur

- 🖱️ **Plus facile** : pas besoin d'héberger l'image ailleurs
- ⚡ **Plus rapide** : upload direct depuis l'ordinateur
- 👁️ **Visuel** : aperçu immédiat
- 🎨 **Flexible** : upload ou URL au choix

### Pour le Développeur

- 🗄️ **Simple** : pas de serveur de fichiers
- 📦 **Portable** : tout dans la base de données
- 🔒 **Sécurisé** : validation côté client et serveur
- 🎨 **UX moderne** : drag & drop style interface

## ⚙️ Code Technique

### State Management

```javascript
const [imagePreview, setImagePreview] = useState(null);
const [uploadingImage, setUploadingImage] = useState(false);
```

### Upload Handler

```javascript
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  // Validations
  if (!file.type.startsWith("image/")) return;
  if (file.size > 5 * 1024 * 1024) return;

  // Conversion Base64
  const reader = new FileReader();
  reader.onloadend = () => {
    setImagePreview(reader.result);
    setFormData((prev) => ({
      ...prev,
      image_url: reader.result,
    }));
  };
  reader.readAsDataURL(file);
};
```

### Remove Handler

```javascript
const handleRemoveImage = () => {
  setImagePreview(null);
  setFormData((prev) => ({
    ...prev,
    image_url: "",
  }));
};
```

## 🎨 Design UI/UX

### Zone de Upload

- **Border dashed** : indique une zone de drop
- **Icône 📸** : claire et reconnaissable
- **Hover effects** : border bleue et background au survol
- **Loading state** : "⏳ Chargement..." pendant l'upload

### Aperçu

- **Image 264px** : taille optimale pour l'aperçu
- **Border** : cadre gris pour délimiter
- **Bouton X** : position absolue top-right
- **Message succès** : feedback positif à l'utilisateur

### Responsive

- ✅ Fonctionne sur mobile et desktop
- ✅ Input file natif pour compatibilité
- ✅ Preview s'adapte à la largeur

## 🔮 Améliorations Futures Possibles

1. **Drag & Drop** : glisser-déposer des images
2. **Crop/Resize** : recadrer avant upload
3. **Compression** : réduire automatiquement la taille
4. **Multiple images** : galerie de photos
5. **Serveur de fichiers** : stocker sur S3/Cloudinary
6. **Formats additionnels** : SVG, AVIF

## ✅ Résultat

L'utilisateur peut maintenant **facilement ajouter des photos** à ses recettes sans avoir besoin d'héberger les images ailleurs ! 🎉
