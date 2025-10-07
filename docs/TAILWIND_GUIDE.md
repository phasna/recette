# 🎨 Guide Tailwind CSS

## Configuration personnalisée

L'application utilise une configuration Tailwind CSS personnalisée avec des couleurs et des animations adaptées au thème de l'application de recettes.

### Couleurs personnalisées

```javascript
colors: {
  primary: {
    50: '#f0f4ff',   // Bleu très clair
    100: '#e0e7ff',  // Bleu clair
    500: '#667eea',  // Bleu principal
    600: '#5a6fd8',  // Bleu foncé
    700: '#4c51bf',  // Bleu très foncé
  },
  secondary: {
    50: '#f8f9fa',   // Gris très clair
    100: '#e9ecef',  // Gris clair
    500: '#6c757d',  // Gris principal
    600: '#5a6268',  // Gris foncé
  }
}
```

### Classes personnalisées

L'application utilise des classes personnalisées définies dans `src/index.css` :

#### Cartes de recettes

- `.recipe-card` - Style principal des cartes
- `.recipe-header` - En-tête avec titre et actions
- `.recipe-title` - Titre de la recette
- `.recipe-actions` - Boutons d'action (modifier/supprimer)
- `.recipe-description` - Description de la recette
- `.recipe-meta` - Métadonnées (temps, portions, difficulté)
- `.recipe-content` - Contenu principal (ingrédients/instructions)

#### Formulaire

- `.form-overlay` - Overlay du formulaire modal
- `.form-container` - Conteneur du formulaire
- `.form-title` - Titre du formulaire
- `.recipe-form` - Formulaire principal
- `.form-group` - Groupe de champs
- `.form-input` - Champs de saisie
- `.form-textarea` - Zones de texte
- `.form-select` - Listes déroulantes
- `.form-row` - Ligne de champs
- `.form-actions` - Actions du formulaire

#### Boutons

- `.btn` - Style de base des boutons
- `.btn-primary` - Bouton principal (bleu)
- `.btn-secondary` - Bouton secondaire (gris)
- `.add-recipe-btn` - Bouton d'ajout de recette
- `.edit-btn` - Bouton de modification
- `.delete-btn` - Bouton de suppression

#### Métadonnées

- `.meta-tag` - Tags des métadonnées
- `.difficulty` - Indicateur de difficulté
- `.difficulty.facile` - Difficulté facile (vert)
- `.difficulty.moyen` - Difficulté moyenne (jaune)
- `.difficulty.difficile` - Difficulté difficile (rouge)

### Animations

```css
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Responsive Design

L'application utilise les breakpoints Tailwind par défaut :

- `sm:` - 640px et plus
- `md:` - 768px et plus
- `lg:` - 1024px et plus
- `xl:` - 1280px et plus

### Exemples d'utilisation

#### Grille responsive

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cartes de recettes */}
</div>
```

#### Formulaire en ligne

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Champs du formulaire */}
</div>
```

#### Boutons avec états

```jsx
<button className="btn-primary hover:bg-primary-600 transition-colors duration-200">
  Sauvegarder
</button>
```

### Avantages de Tailwind CSS

1. **Développement rapide** - Pas besoin d'écrire du CSS personnalisé
2. **Cohérence** - Système de design uniforme
3. **Responsive** - Classes responsive intégrées
4. **Performance** - Purge automatique des classes non utilisées
5. **Maintenabilité** - Styles directement dans les composants
6. **Flexibilité** - Facile de personnaliser avec la configuration

### Personnalisation

Pour modifier les couleurs ou ajouter de nouvelles classes, éditez :

1. `tailwind.config.js` - Configuration principale
2. `src/index.css` - Classes personnalisées avec `@layer components`
