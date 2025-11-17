# 🐛 Débogage : Vidéo ne s'affiche pas

## 📋 Étapes à Suivre

### 1️⃣ Assurez-vous que le backend est redémarré

```bash
# Arrêtez le backend (Ctrl+C)
# Puis redémarrez :
cd backend
npm start
```

### 2️⃣ Testez avec une nouvelle recette

1. **Créez une NOUVELLE recette** (ou modifiez une existante)
2. Dans la section "Photo et Vidéo", ajoutez :
   - **Vidéo** : `https://youtube.com/watch?v=dQw4w9WgXcQ`
3. **Sauvegardez**
4. **Notez l'ID de la recette** (dans l'URL après création)

### 3️⃣ Ouvrez la Console du Navigateur

1. Appuyez sur **F12** (ou clic droit → Inspecter)
2. Allez dans l'onglet **Console**
3. Allez sur la page de détails de votre recette

### 4️⃣ Regardez les Logs

Vous devriez voir dans la console :

```
📦 Données de la recette reçues : { ... }
📷 image_url : https://...
🎥 video_url : https://youtube.com/watch?v=...
🔍 Type de video_url : string

🎬 Vérification affichage vidéo
   video_url existe ? true
   video_url valeur : https://youtube.com/watch?v=...
   Condition : true
```

### 5️⃣ Partagez les Résultats

**Si `video_url` est `null` ou `undefined` :**
→ Le problème vient du backend (données non enregistrées)

**Si `video_url` a une valeur mais la vidéo ne s'affiche pas :**
→ Le problème vient de l'affichage frontend

**Si la condition est `false` :**
→ Il y a un problème avec la validation

---

## 🔍 Vérification Rapide

### Option A : Via la Console du Navigateur

```javascript
// Dans la console, tapez :
fetch("http://localhost:3000/api/recipes/VOTRE_ID")
  .then((r) => r.json())
  .then((data) => console.log("Données reçues:", data));
```

Remplacez `VOTRE_ID` par l'ID de votre recette.

### Option B : Via l'API directement

Ouvrez dans votre navigateur :

```
http://localhost:3000/api/recipes/VOTRE_ID
```

Vous devriez voir :

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Ma recette",
    ...
    "image_url": "https://...",
    "video_url": "https://youtube.com/..."
  }
}
```

---

## ✅ Checklist de Vérification

- [ ] Backend redémarré après les modifications
- [ ] Nouvelle recette créée APRÈS le redémarrage
- [ ] URL vidéo ajoutée dans le formulaire
- [ ] Recette sauvegardée avec succès
- [ ] Console ouverte (F12)
- [ ] Logs affichés dans la console

---

## 💡 Solutions Possibles

### Si `video_url` est `null` dans l'API

**Problème** : Le backend ne sauvegarde pas les données

**Solution** :

```bash
# Vérifiez que vous avez bien redémarré le backend
# Recréez une recette APRÈS le redémarrage
```

### Si `video_url` existe mais ne s'affiche pas

**Problème** : Condition d'affichage

**Solution** : Je vais simplifier la condition d'affichage

### Si l'URL est incorrecte

**Exemples d'URLs valides** :

```
✅ https://youtube.com/watch?v=dQw4w9WgXcQ
✅ https://youtu.be/dQw4w9WgXcQ
❌ youtube.com/watch?v=... (manque https://)
❌ www.youtube.com (pas de vidéo spécifique)
```

---

Faites ces vérifications et dites-moi ce que vous voyez dans la console !
