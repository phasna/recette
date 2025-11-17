# 📝 Guide : Comment Bien Formater une Recette

## ✅ Améliorations Apportées

Le système nettoie maintenant automatiquement :

- ✅ Les lignes vides
- ✅ Les numéros au début des instructions (évite la double numérotation)
- ✅ Les puces (-, •) au début des ingrédients
- ✅ Les lignes qui ne contiennent que des chiffres
- ✅ Détection automatique des titres de sections dans les ingrédients

---

## 🥘 Formater les Ingrédients

### ✅ Format Recommandé

```
400 g de crevettes
300 g de moules
2 épis de maïs
1 oignon
```

### ✅ Avec Sections (Détecté Automatiquement)

```
🦐 Fruits de mer :
400 g de crevettes
300 g de moules

🌽 Légumes :
2 épis de maïs
1 oignon

🌶️ Épices :
2 c. à café de paprika
1 c. à café de piment de Cayenne
```

**Le système détectera automatiquement** les lignes avec emoji ou `:` comme des titres et les affichera en gras.

### ❌ À Éviter

```
- 400 g de crevettes    ❌ (La puce sera retirée, utilisez pas de puce)
• 300 g de moules       ❌ (Idem)


400 g de crevettes      ❌ (Pas de lignes vides multiples)
```

---

## 👨‍🍳 Formater les Instructions

### ✅ Format Recommandé (Sans Numéros)

Le système numérote automatiquement, ne mettez PAS de numéros :

```
Faire bouillir l'eau dans une grande marmite
Ajouter les épices cajun dans l'eau
Mettre les pommes de terre et cuire 10 min
Ajouter les crevettes et cuire 3-5 min
```

Affichage :

```
1 | Faire bouillir l'eau dans une grande marmite
2 | Ajouter les épices cajun dans l'eau
3 | Mettre les pommes de terre et cuire 10 min
4 | Ajouter les crevettes et cuire 3-5 min
```

### ✅ Format Avec Numéros (Nettoyés Automatiquement)

Si vous mettez des numéros, le système les retire automatiquement :

```
1. Faire bouillir l'eau
2. Ajouter les épices
3. Mettre les pommes de terre
```

Affichage (numéros originaux retirés) :

```
1 | Faire bouillir l'eau
2 | Ajouter les épices
3 | Mettre les pommes de terre
```

### ❌ À Éviter

```
1
Faire bouillir l'eau     ❌ (Ne mettez pas le numéro sur une ligne séparée)

2
3                         ❌ (Pas de lignes avec juste des chiffres)
Ajouter les épices

                          ❌ (Pas de lignes vides entre les étapes)
```

---

## 🎯 Exemple de Recette Bien Formatée

### Ingrédients

```
🦐 Fruits de mer :
400 g de crevettes entières
300 g de moules
300 g de crabes

🌽 Légumes :
4 pommes de terre
2 épis de maïs
1 oignon

🌶️ Épices Cajun :
2 c. à café de paprika
1 c. à café de piment de Cayenne
1 c. à café d'ail en poudre
1 c. à café de sel

🧈 Sauce :
100 g de beurre
4 gousses d'ail
1 c. à café d'assaisonnement cajun
```

### Instructions

```
Remplir une grande marmite d'eau et porter à ébullition
Ajouter les épices cajun et le citron coupé en quartiers
Mettre les pommes de terre et cuire 10 minutes
Ajouter les épis de maïs et cuire 5 minutes
Ajouter les crevettes et moules et cuire 3-5 minutes jusqu'à ce que les crevettes soient roses
Faire fondre le beurre avec l'ail et les épices
Égoutter les fruits de mer et légumes
Arroser avec la sauce au beurre
Servir immédiatement avec du citron
```

---

## 🔧 Correction pour Recettes Existantes

Si une recette existante s'affiche mal :

1. **Modifiez la recette**
2. **Dans Instructions** : Retirez les lignes vides et les numéros isolés
3. **Gardez une instruction par ligne**
4. **Sauvegardez**

---

## 📋 Checklist de Formatage

### Ingrédients

- [ ] Une ligne par ingrédient
- [ ] Pas de puces (-, •)
- [ ] Titres de sections avec emoji ou `:` si besoin
- [ ] Pas de lignes vides multiples

### Instructions

- [ ] Une étape par ligne
- [ ] PAS de numéros (le système les ajoute)
- [ ] Pas de lignes vides entre les étapes
- [ ] Pas de chiffres seuls sur une ligne

---

## ✨ Ce Que Le Système Fait Automatiquement

**Pour les Ingrédients :**

- ✅ Retire les puces `- ` et `• `
- ✅ Détecte les titres (avec emoji ou `:`)
- ✅ Affiche les titres en gras et vert
- ✅ Filtre les lignes vides

**Pour les Instructions :**

- ✅ Retire les numéros `1. `, `2) `, etc.
- ✅ Retire les puces `- ` et `• `
- ✅ Filtre les lignes vides
- ✅ Filtre les lignes avec seulement des chiffres
- ✅ Ajoute une numérotation automatique propre

---

## 🎉 Résultat

Vos recettes seront maintenant **propres et bien formatées** automatiquement, même si vous avez mis des numéros ou des puces ! ✨

---

**Date** : 21 octobre 2025  
**Mise à jour automatique** : ✅ Activée pour toutes les recettes
