# 💬 Comment intégrer les commentaires dans vos pages de recettes

## 📍 Où placer le composant RecipeComments

Le composant `RecipeComments` peut être ajouté à n'importe quelle page qui affiche les détails d'une recette.

### Option 1 : Page de détails de recette existante

Si vous avez déjà une page `RecipeDetailsPage.jsx`, ajoutez simplement :

```jsx
import RecipeComments from "../components/recipe/RecipeComments";

function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user } = useAuth(); // ou votre méthode pour obtenir l'utilisateur

  // ... votre code existant ...

  return (
    <div>
      {/* Vos détails de recette existants */}
      <div className="recipe-header">...</div>
      <div className="recipe-content">...</div>
      
      {/* AJOUTER ICI : Section des commentaires */}
      <div className="mt-8">
        <RecipeComments 
          recipeId={recipe.id} 
          user={user} 
          allowComments={recipe.allow_comments !== 0}
        />
      </div>
    </div>
  );
}
```

### Option 2 : Dans le popup de recette

Si vous utilisez un popup/modal pour afficher les recettes :

```jsx
import RecipeComments from "../components/recipe/RecipeComments";

function RecipePopup({ recipe, user, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        {/* Détails de la recette */}
        
        {/* Commentaires */}
        <div className="mt-6">
          <RecipeComments 
            recipeId={recipe.id} 
            user={user} 
            allowComments={recipe.allow_comments !== 0}
          />
        </div>
      </div>
    </div>
  );
}
```

### Option 3 : Dans la page VisitorHome ou WorldMenus

Pour les recettes partagées publiquement :

```jsx
import RecipeComments from "../components/recipe/RecipeComments";

function VisitorHome() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user } = useAuth(); // null si non connecté

  return (
    <div>
      {/* Liste des recettes */}
      
      {selectedRecipe && (
        <div className="recipe-details">
          {/* Affichage de la recette */}
          
          {/* Commentaires */}
          <RecipeComments 
            recipeId={selectedRecipe.id} 
            user={user} // Peut être null
            allowComments={selectedRecipe.allow_comments !== 0}
          />
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Props du composant RecipeComments

### recipeId (requis)
- **Type** : `number`
- **Description** : L'ID de la recette pour laquelle afficher les commentaires

### user (requis)
- **Type** : `object | null`
- **Description** : L'utilisateur connecté (ou `null` si visiteur)
- **Structure** :
  ```javascript
  {
    id: 1,
    username: "johndoe",
    first_name: "John",
    last_name: "Doe",
    avatar_url: "...",
  }
  ```

### allowComments (optionnel)
- **Type** : `boolean`
- **Default** : `true`
- **Description** : Si `false`, affiche un message "Commentaires désactivés"

---

## 🚀 Exemple complet

Voici un exemple complet d'intégration dans une page de détails :

```jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import recipeService from "../services/recipeService";
import RecipeComments from "../components/recipe/RecipeComments";
import { useAuth } from "../hooks/useAuth";

function RecipeDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await recipeService.getRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!recipe) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* En-tête de la recette */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>
        
        {recipe.description && (
          <p className="text-lg text-gray-600 mb-6">
            {recipe.description}
          </p>
        )}

        {/* Infos de base */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {recipe.prep_time} min
            </div>
            <div className="text-sm text-gray-500">Préparation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {recipe.cook_time} min
            </div>
            <div className="text-sm text-gray-500">Cuisson</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">
              {recipe.servings}
            </div>
            <div className="text-sm text-gray-500">Portions</div>
          </div>
        </div>

        {/* Ingrédients */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🥘 Ingrédients
          </h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <pre className="whitespace-pre-wrap font-sans">
              {recipe.ingredients}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            👨‍🍳 Instructions
          </h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <pre className="whitespace-pre-wrap font-sans">
              {recipe.instructions}
            </pre>
          </div>
        </div>
      </div>

      {/* SECTION COMMENTAIRES */}
      <RecipeComments 
        recipeId={recipe.id} 
        user={user}
        allowComments={recipe.allow_comments !== 0}
      />
    </div>
  );
}

export default RecipeDetailsPage;
```

---

## 🎯 Fonctionnalités du composant

### Pour les visiteurs (non connectés)
- ✅ Voir tous les commentaires
- ✅ Voir les notes moyennes
- ✅ Message invitant à se connecter pour commenter

### Pour les utilisateurs connectés
- ✅ Voir tous les commentaires
- ✅ Ajouter un commentaire
- ✅ Donner une note (1-5 étoiles)
- ✅ Modifier leurs propres commentaires
- ✅ Supprimer leurs propres commentaires
- ✅ Liker les commentaires des autres

---

## 🎨 Personnalisation du style

Le composant utilise Tailwind CSS. Vous pouvez personnaliser :

### Couleurs
Les couleurs principales sont dans les classes :
- `from-indigo-600 to-purple-600` : Gradients principaux
- `text-yellow-400` : Étoiles de notation
- `bg-gray-50` : Arrière-plans

### Espacements
- `space-y-6` : Espacement vertical entre sections
- `p-6` : Padding des cartes
- `rounded-2xl` : Arrondis des bordures

---

## 🔔 Événements et callbacks

Si vous voulez être notifié quand un commentaire est ajouté/modifié :

```jsx
// Version modifiée du composant (à faire vous-même)
<RecipeComments 
  recipeId={recipe.id} 
  user={user}
  allowComments={true}
  onCommentAdded={(comment) => {
    console.log("Nouveau commentaire:", comment);
    // Rafraîchir les stats, envoyer une notification, etc.
  }}
  onCommentDeleted={(commentId) => {
    console.log("Commentaire supprimé:", commentId);
  }}
/>
```

---

## ⚠️ Points importants

### Vérifier que la recette autorise les commentaires

Assurez-vous que votre table `recipes` a la colonne `allow_comments` :

```sql
ALTER TABLE recipes 
ADD COLUMN IF NOT EXISTS allow_comments TINYINT(1) DEFAULT 1;
```

### Gérer les permissions

Le composant vérifie automatiquement :
- ✅ Seul l'auteur peut modifier/supprimer son commentaire
- ✅ Les visiteurs sont redirigés vers `/auth` pour se connecter

### Performance

Pour de meilleures performances avec beaucoup de commentaires :

```jsx
// Limiter le nombre de commentaires affichés
<RecipeComments 
  recipeId={recipe.id} 
  user={user}
  allowComments={true}
  maxComments={20} // Ajouter cette prop si vous modifiez le composant
/>
```

---

## 🧪 Test du composant

### Scénario de test complet

1. **En tant que visiteur** :
   - Ouvrir une recette partagée
   - Vérifier que les commentaires s'affichent
   - Vérifier le message "Connectez-vous pour commenter"

2. **En tant qu'utilisateur connecté** :
   - Ajouter un commentaire
   - Donner une note (étoiles)
   - Modifier votre commentaire
   - Supprimer votre commentaire
   - Liker un commentaire d'un autre utilisateur

3. **Vérifier les statistiques** :
   - Le compteur de commentaires est mis à jour
   - La note moyenne se calcule correctement
   - Les badges sont attribués automatiquement

---

## 📊 Statistiques disponibles

Le composant récupère automatiquement :
- Nombre total de commentaires
- Note moyenne de la recette
- Nombre de likes par commentaire
- Informations de l'auteur (nom, avatar, niveau)

---

## 🎉 Voilà !

Le composant `RecipeComments` est maintenant prêt à être utilisé partout où vous affichez des recettes !

**Bon développement ! 💻✨**

