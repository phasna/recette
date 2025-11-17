# 🎥 Comment Tester la Vidéo - Guide Simple

## 🚀 Étapes à Suivre (5 minutes)

### 1️⃣ Redémarrer le Backend

**IMPORTANT** : Le backend DOIT être redémarré pour prendre en compte les modifications.

```bash
# Dans le terminal du backend :
# Appuyez sur Ctrl+C pour arrêter
# Puis :
cd backend
npm start
```

Attendez que vous voyiez : `✅ Connecté à la base de données MySQL`

---

### 2️⃣ Rafraîchir le Frontend

Dans votre navigateur, appuyez sur **Ctrl+Shift+R** (ou **Cmd+Shift+R** sur Mac) pour vider le cache et recharger.

---

### 3️⃣ Ouvrir la Console du Navigateur

1. Appuyez sur **F12** (ou clic droit → Inspecter)
2. Cliquez sur l'onglet **"Console"**
3. Laissez cette fenêtre ouverte

---

### 4️⃣ Créer une Nouvelle Recette

1. Allez sur **"Ajouter une recette"**
2. Remplissez :
   - **Titre** : `Test Vidéo`
   - **Ingrédients** : `Test`
   - **Instructions** : `Test`
3. Dans la section **"Photo et Vidéo"** (fond bleu-violet) :
   - **🎥 Lien vidéo** : `https://youtube.com/watch?v=dQw4w9WgXcQ`
4. Cliquez sur **"🍳 Créer la recette"**

**Dans la console, vous verrez :**

```
📤 Données envoyées au backend : { ... }
📷 image_url : ""
🎥 video_url : "https://youtube.com/watch?v=dQw4w9WgXcQ"
```

✅ **Si vous voyez ça** → Les données sont bien envoyées !

---

### 5️⃣ Voir la Page de Détails

1. Après création, vous êtes redirigé vers le Dashboard
2. Cliquez sur votre recette "Test Vidéo"
3. **Regardez la console**

**Vous devriez voir :**

```
📦 Données de la recette reçues : { ... }
📷 image_url : null ou ""
🎥 video_url : "https://youtube.com/watch?v=dQw4w9WgXcQ"
🔍 Type de video_url : string

🎬 Vérification affichage vidéo
   video_url existe ? true
   video_url valeur : https://youtube.com/watch?v=dQw4w9WgXcQ
   Type : string
   Est une string non vide ? true
   ✅ Vidéo s'affichera : true
```

---

## 🎯 Que Faire Ensuite ?

### ✅ Cas 1 : "✅ Vidéo s'affichera : true" MAIS la vidéo ne s'affiche pas

→ **Faites une capture d'écran** de la page et de la console
→ Le problème vient de l'affichage React

### ❌ Cas 2 : "video_url : null" ou "video_url : undefined"

→ Le backend n'a pas enregistré les données
→ **Vérifiez que le backend est bien redémarré**
→ **Recréez une recette APRÈS le redémarrage**

### ❌ Cas 3 : "✅ Vidéo s'affichera : false"

→ L'URL n'est pas valide ou vide
→ **Vérifiez l'URL** : doit commencer par `https://`

---

## 📸 Captures d'Écran Utiles

Prenez des captures de :

1. **Console lors de la création** (doit montrer `📤 Données envoyées`)
2. **Console sur la page de détails** (doit montrer `🎬 Vérification`)
3. **La page de détails** (pour voir si la vidéo s'affiche ou non)

---

## 🔍 Vérification Manuelle (si besoin)

### Vérifier dans la Base de Données

Si vous avez accès à MySQL :

```sql
USE recipe_app;

-- Voir les 3 dernières recettes avec leurs URLs
SELECT id, title, image_url, video_url, created_at
FROM recipes
ORDER BY created_at DESC
LIMIT 3;
```

### Vérifier via l'API

Ouvrez dans votre navigateur :

```
http://localhost:3000/api/recipes/VOTRE_ID_DE_RECETTE
```

Vous devriez voir :

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "Test Vidéo",
    "video_url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
    ...
  }
}
```

---

## 💡 URLs de Test

Utilisez ces URLs pour tester :

**YouTube (formats acceptés) :**

```
https://youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Autres plateformes :**

```
https://vimeo.com/123456789
https://dailymotion.com/video/xyz123
```

---

## ✅ Checklist Finale

Avant de me dire que ça ne marche pas, vérifiez :

- [ ] Backend redémarré (après les modifications du code)
- [ ] Frontend rafraîchi (Ctrl+Shift+R)
- [ ] Console du navigateur ouverte (F12)
- [ ] Nouvelle recette créée **APRÈS** le redémarrage
- [ ] URL vidéo bien remplie dans le formulaire
- [ ] Logs visibles dans la console

---

**Faites ces étapes et dites-moi ce que vous voyez dans la console ! 🔍**
