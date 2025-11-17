# 📖 Explication Détaillée du Code - test-recipe.js

## 🎯 Vue d'ensemble

Ce fichier teste le modèle `Recipe` pour vérifier qu'il fonctionne correctement.

**Structure du code :**

1. **Classe Recipe** (lignes 9-61) : Définit ce qu'est une recette
2. **Fonctions de test** (lignes 67-86) : Outils pour tester
3. **Les 8 tests** (lignes 91-205) : Tests concrets
4. **Résumé** (lignes 207-221) : Affiche les résultats

---

## 📚 Partie 1 : Classe Recipe (lignes 9-61)

### **Lignes 9-20 : Constructeur**

```javascript
class Recipe {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || "";
    this.description = data.description || "";
    this.ingredients = data.ingredients || "";
    this.instructions = data.instructions || "";
    this.prep_time = data.prep_time !== undefined ? data.prep_time : null;
    this.cook_time = data.cook_time !== undefined ? data.cook_time : null;
    this.servings = data.servings !== undefined ? data.servings : null;
    this.difficulty = data.difficulty || "Facile";
  }
}
```

**Explication :**

**Ligne 9 :** Déclare une classe `Recipe` qui représente une recette de cuisine

**Ligne 10 :** Le constructeur prend un paramètre `data` (objet avec les données)

- `data = {}` : Par défaut, si rien n'est passé, `data` est un objet vide

**Lignes 11-15 :** Initialise les propriétés avec l'opérateur `||` (OU logique)

```javascript
this.id = data.id || null;
```

- **Si `data.id` existe** → Utilise `data.id`
- **Si `data.id` est `undefined`, `null`, `0`, `false`, `""`** → Utilise `null`

**Exemple :**

```javascript
new Recipe({ id: 1 }); // id = 1
new Recipe({ id: 0 }); // id = null (car 0 est "falsy")
new Recipe(); // id = null
```

**Lignes 16-18 :** Cas spécial avec `!== undefined`

```javascript
this.prep_time = data.prep_time !== undefined ? data.prep_time : null;
```

**Pourquoi `!== undefined` au lieu de `||` ?**

Avec `||` :

```javascript
this.servings = data.servings || null;
new Recipe({ servings: 0 }); // servings = null ❌ (perdu le 0 !)
```

Avec `!== undefined` :

```javascript
this.servings = data.servings !== undefined ? data.servings : null;
new Recipe({ servings: 0 }); // servings = 0 ✅ (conservé !)
```

**Explication :**

- `!== undefined` : Vérifie si la propriété existe vraiment (même si elle vaut `0` ou `false`)
- `||` : Considère `0`, `false`, `""` comme "faux" et les remplace

**Ligne 19 :** Valeur par défaut pour `difficulty`

```javascript
this.difficulty = data.difficulty || "Facile";
```

- Si `difficulty` n'est pas fourni → `"Facile"` par défaut

---

### **Lignes 23-60 : Méthode `validate()`**

```javascript
validate() {
  const errors = [];  // Tableau vide pour stocker les erreurs

  // Validation du titre
  if (!this.title || this.title.trim() === "") {
    errors.push({ field: "title", message: "Le titre est requis" });
  } else if (this.title.length < 3) {
    errors.push({
      field: "title",
      message: "Le titre doit contenir au moins 3 caractères",
    });
  }

  // Validation des ingrédients
  if (!this.ingredients || this.ingredients.trim() === "") {
    errors.push({
      field: "ingredients",
      message: "Les ingrédients sont requis",
    });
  }

  // Validation des instructions
  if (!this.instructions || this.instructions.trim() === "") {
    errors.push({
      field: "instructions",
      message: "Les instructions sont requises",
    });
  }

  // Validation des portions
  if (this.servings !== null && this.servings < 1) {
    errors.push({
      field: "servings",
      message: "Le nombre de portions doit être au moins 1",
    });
  }

  return {
    isValid: errors.length === 0,  // true si pas d'erreurs
    errors: errors,                 // tableau des erreurs
  };
}
```

**Explication ligne par ligne :**

**Ligne 24 :** Crée un tableau vide `errors` pour stocker toutes les erreurs trouvées

**Lignes 26-33 : Validation du titre**

```javascript
if (!this.title || this.title.trim() === "") {
  errors.push({ field: "title", message: "Le titre est requis" });
}
```

**Condition :**

- `!this.title` : Vérifie si `title` est vide, `null`, `undefined`, ou `""`
- `this.title.trim() === ""` : Vérifie si `title` ne contient que des espaces

**Si une des conditions est vraie :**

- Ajoute une erreur dans le tableau avec `errors.push(...)`

**Exemple :**

```javascript
new Recipe({ title: "" }).validate(); // ❌ Erreur : "Le titre est requis"
new Recipe({ title: "   " }).validate(); // ❌ Erreur : "Le titre est requis" (espaces)
new Recipe({ title: "Pâtes" }).validate(); // ✅ Pas d'erreur
```

```javascript
else if (this.title.length < 3) {
  errors.push({
    field: "title",
    message: "Le titre doit contenir au moins 3 caractères",
  });
}
```

**Condition :**

- Si le titre existe mais fait moins de 3 caractères → Erreur

**Exemple :**

```javascript
new Recipe({ title: "AB" }).validate(); // ❌ Erreur : "Le titre doit contenir au moins 3 caractères"
new Recipe({ title: "ABC" }).validate(); // ✅ OK (3 caractères)
```

**Lignes 35-40 : Validation des ingrédients**

Même logique que pour le titre : Vérifie que les ingrédients ne sont pas vides

**Lignes 42-47 : Validation des instructions**

Même logique : Vérifie que les instructions ne sont pas vides

**Lignes 49-54 : Validation des portions**

```javascript
if (this.servings !== null && this.servings < 1) {
  errors.push({
    field: "servings",
    message: "Le nombre de portions doit être au moins 1",
  });
}
```

**Condition :**

- `this.servings !== null` : Si `servings` a une valeur (pas `null`)
- `&& this.servings < 1` : ET que cette valeur est inférieure à 1

**Pourquoi `!== null` ?**

- Si `servings` est `null` → C'est OK (optionnel)
- Si `servings` est `0` ou négatif → Erreur

**Exemple :**

```javascript
new Recipe({ servings: null }).validate(); // ✅ OK (optionnel)
new Recipe({ servings: 0 }).validate(); // ❌ Erreur : "< 1"
new Recipe({ servings: 1 }).validate(); // ✅ OK
new Recipe({ servings: 4 }).validate(); // ✅ OK
```

**Lignes 56-59 : Retour du résultat**

```javascript
return {
  isValid: errors.length === 0, // true si pas d'erreurs
  errors: errors, // tableau des erreurs
};
```

**Explication :**

- `errors.length === 0` : Si le tableau `errors` est vide → `isValid = true`
- Sinon → `isValid = false`

**Exemple de résultat :**

```javascript
// Cas 1 : Recette valide
const recipe1 = new Recipe({
  title: "Pâtes",
  ingredients: "Pâtes, eau",
  instructions: "Cuire les pâtes",
});

recipe1.validate();
// {
//   isValid: true,
//   errors: []
// }

// Cas 2 : Recette invalide
const recipe2 = new Recipe({
  title: "", // Vide !
  ingredients: "Pâtes",
  instructions: "Cuire",
});

recipe2.validate();
// {
//   isValid: false,
//   errors: [
//     { field: "title", message: "Le titre est requis" }
//   ]
// }
```

---

## 🛠️ Partie 2 : Fonctions de Test (lignes 67-86)

### **Lignes 67-68 : Compteurs**

```javascript
let testsPasses = 0; // Nombre de tests qui ont réussi
let testsEchoues = 0; // Nombre de tests qui ont échoué
```

**Explication :**

- Deux variables globales pour compter les succès et les échecs
- Incrémentées à chaque test pour faire le résumé à la fin

---

### **Lignes 70-80 : Fonction `test()`**

```javascript
function test(name, callback) {
  try {
    callback();
    console.log("  ✅", name);
    testsPasses++;
  } catch (error) {
    console.log("  ❌", name);
    console.log("     Erreur:", error.message);
    testsEchoues++;
  }
}
```

**Explication ligne par ligne :**

**Paramètres :**

- `name` : Nom du test (ex: `"Créer une recette valide"`)
- `callback` : Fonction qui contient le code du test

**Ligne 71 : `try {`**

- Bloc `try` : Essaie d'exécuter le code qui peut échouer

**Ligne 72 : `callback();`**

- Exécute le code du test (la fonction passée en paramètre)

**Ligne 73 : `console.log("  ✅", name);`**

- Si aucune erreur → Affiche `✅` suivi du nom du test

**Ligne 74 : `testsPasses++;`**

- Incrémente le compteur de tests passés

**Ligne 75 : `} catch (error) {`**

- Bloc `catch` : S'exécute seulement si une erreur se produit dans `try`

**Lignes 76-78 :**

- Affiche `❌` et le message d'erreur
- Incrémente le compteur de tests échoués

**Exemple d'utilisation :**

```javascript
test("Mon test", () => {
  // Code du test ici
  const recipe = new Recipe({ title: "Test" });
  assert(recipe.title === "Test"); // Si ça passe → ✅
  assert(recipe.title === "Autre"); // Si ça échoue → ❌
});
```

**Déroulement :**

1. `test()` est appelé avec le nom et la fonction
2. `try { callback() }` exécute le code
3. Si succès → Affiche `✅` et incrémente `testsPasses`
4. Si erreur → Affiche `❌` et incrémente `testsEchoues`

---

### **Lignes 82-86 : Fonction `assert()`**

```javascript
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
```

**Explication :**

**Paramètres :**

- `condition` : Expression booléenne qui doit être vraie (ex: `recipe.title === "Test"`)
- `message` : Message d'erreur optionnel si ça échoue

**Ligne 83 : `if (!condition) {`**

- Si la condition est fausse → Entre dans le `if`

**Ligne 84 : `throw new Error(...);`**

- Lance une nouvelle erreur avec le message fourni (ou "Assertion failed" par défaut)

**Ligne 85 : `}`**

- Si la condition est vraie, ne fait rien

**Exemple :**

```javascript
// Cas 1 : Condition vraie
assert(1 + 1 === 2); // ✅ Ne fait rien, continue

// Cas 2 : Condition fausse
assert(1 + 1 === 3); // ❌ Lance une erreur : "Assertion failed"

// Cas 3 : Avec message personnalisé
assert(recipe.title === "Autre", "Le titre devrait être 'Autre'");
// ❌ Lance une erreur : "Le titre devrait être 'Autre'"
```

**Comment ça fonctionne :**

1. Vérifie si la condition est vraie ou fausse
2. Si vraie → Ne fait rien, le code continue
3. Si fausse → Lance une erreur (`throw new Error(...)`)
4. Cette erreur est attrapée par `catch` dans la fonction `test()`

---

## 🧪 Partie 3 : Les Tests (lignes 91-205)

### **Test 1 : "Créer une recette valide" (lignes 92-104)**

```javascript
test("Créer une recette valide", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
    instructions: "Test instructions",
  });

  assert(recipe.title === "Test Recipe", "Le titre devrait être 'Test Recipe'");
  assert(
    recipe.difficulty === "Facile",
    "La difficulté par défaut devrait être 'Facile'"
  );
});
```

**Ce que fait ce test :**

1. **Crée une recette** avec un titre, des ingrédients, des instructions
2. **Vérifie** que le titre est bien "Test Recipe"
3. **Vérifie** que la difficulté est "Facile" par défaut

**Pourquoi ce test existe :**

- Vérifie que le constructeur fonctionne correctement
- Vérifie que les valeurs sont bien assignées
- Vérifie que les valeurs par défaut sont correctes

---

### **Test 2 : "Valider une recette valide" (lignes 107-117)**

```javascript
test("Valider une recette valide", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
    instructions: "Test instructions",
  });

  const validation = recipe.validate();
  assert(validation.isValid === true, "La validation devrait réussir");
  assert(validation.errors.length === 0, "Il ne devrait pas y avoir d'erreurs");
});
```

**Ce que fait ce test :**

1. **Crée une recette complète** (titre, ingrédients, instructions)
2. **Appelle `validate()`** sur cette recette
3. **Vérifie** que `isValid = true` (validation réussie)
4. **Vérifie** que le tableau `errors` est vide (pas d'erreurs)

**Pourquoi ce test existe :**

- Vérifie que la validation accepte une recette complète et valide
- S'assure que `validate()` retourne le bon format

---

### **Test 3 : "Validation échoue si titre manquant" (lignes 120-132)**

```javascript
test("Validation échoue si titre manquant", () => {
  const recipe = new Recipe({
    ingredients: "Test ingredients",
    instructions: "Test instructions",
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "title"),
    "Il devrait y avoir une erreur pour le titre"
  );
});
```

**Ce que fait ce test :**

1. **Crée une recette SANS titre** (intentionnellement)
2. **Appelle `validate()`** → Devrait détecter l'erreur
3. **Vérifie** que `isValid = false` (validation échouée)
4. **Vérifie** qu'il y a bien une erreur avec `field = "title"`

**Détail sur `.some()` :**

```javascript
validation.errors.some((e) => e.field === "title");
```

- `some()` : Méthode de tableau qui vérifie si au moins un élément répond à la condition
- `(e) => e.field === "title"` : Pour chaque erreur `e`, vérifie si `e.field === "title"`
- Retourne `true` si trouvé, `false` sinon

**Exemple :**

```javascript
const errors = [{ field: "title", message: "Le titre est requis" }];

errors.some((e) => e.field === "title"); // ✅ true
errors.some((e) => e.field === "price"); // ❌ false
```

**Pourquoi ce test existe :**

- Teste la validation négative (vérifie que les erreurs sont bien détectées)
- S'assure que le message d'erreur est correct

---

### **Test 4 : "Validation échoue si titre trop court" (lignes 135-148)**

```javascript
test("Validation échoue si titre trop court", () => {
  const recipe = new Recipe({
    title: "AB", // Trop court (< 3 caractères)
    ingredients: "Test ingredients",
    instructions: "Test instructions",
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "title"),
    "Il devrait y avoir une erreur pour le titre"
  );
});
```

**Ce que fait ce test :**

1. **Crée une recette avec un titre trop court** ("AB" = 2 caractères, minimum 3)
2. **Vérifie** que la validation échoue
3. **Vérifie** qu'il y a bien une erreur pour le titre

**Pourquoi ce test existe :**

- Teste la règle de validation : "Le titre doit contenir au moins 3 caractères"
- Vérifie que les validations complexes fonctionnent

---

### **Test 5 : "Validation échoue si ingrédients manquants" (lignes 151-163)**

**Même logique que le test 3**, mais pour les ingrédients

---

### **Test 6 : "Validation échoue si instructions manquantes" (lignes 166-178)**

**Même logique**, mais pour les instructions

---

### **Test 7 : "Validation échoue si portions < 1" (lignes 181-195)**

```javascript
test("Validation échoue si portions < 1", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
    instructions: "Test instructions",
    servings: 0, // Invalide (< 1)
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "servings"),
    "Il devrait y avoir une erreur pour les portions"
  );
});
```

**Ce que fait ce test :**

1. **Crée une recette avec `servings = 0`** (invalide, minimum 1)
2. **Vérifie** que la validation échoue
3. **Vérifie** qu'il y a bien une erreur pour `servings`

**Pourquoi ce test existe :**

- Teste la validation des nombres (portions doit être >= 1)
- Vérifie que la valeur 0 est bien rejetée

---

### **Test 8 : "Servings = 0 est préservé" (lignes 198-205)**

```javascript
test("Servings = 0 est préservé", () => {
  const recipe = new Recipe({
    servings: 0,
  });

  assert(recipe.servings === 0, "servings devrait être 0, pas null");
  assert(recipe.servings !== null, "servings ne devrait pas être null");
});
```

**Ce que fait ce test :**

1. **Crée une recette avec `servings = 0`**
2. **Vérifie** que `servings` est bien `0` (pas converti en `null`)

**Pourquoi ce test existe :**

**Problème résolu :**

**Sans le fix (avec `||`):**

```javascript
this.servings = data.servings || null;

new Recipe({ servings: 0 });
// recipe.servings = null ❌ (perdu la valeur 0 !)
```

**Avec le fix (avec `!== undefined`):**

```javascript
this.servings = data.servings !== undefined ? data.servings : null;

new Recipe({ servings: 0 });
// recipe.servings = 0 ✅ (conservé !)
```

**Ce test vérifie** que la valeur `0` est bien préservée et ne devient pas `null`.

---

## 📊 Partie 4 : Résumé Final (lignes 207-221)

```javascript
console.log("\n" + "=".repeat(50));
console.log("📊 RÉSUMÉ DES TESTS");
console.log("=".repeat(50));
console.log(`✅ Tests passés : ${testsPasses}`);
console.log(`❌ Tests échoués : ${testsEchoues}`);
console.log(`📈 Total : ${testsPasses + testsEchoues}`);

if (testsEchoues === 0) {
  console.log("\n🎉 TOUS LES TESTS SONT PASSÉS !\n");
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsEchoues} TEST(S) ONT ÉCHOUÉ\n`);
  process.exit(1);
}
```

**Explication :**

**Lignes 208-213 :** Affiche le résumé

```javascript
console.log("=".repeat(50)); // Affiche 50 signes "="
console.log(`✅ Tests passés : ${testsPasses}`); // Ex: "✅ Tests passés : 8"
```

**Lignes 215-221 :** Condition finale

- **Si `testsEchoues === 0`** (tous les tests ont réussi) :

  - Affiche "🎉 TOUS LES TESTS SONT PASSÉS !"
  - `process.exit(0)` : Quitte avec le code 0 (succès)

- **Sinon** (certains tests ont échoué) :
  - Affiche combien de tests ont échoué
  - `process.exit(1)` : Quitte avec le code 1 (échec)

**Codes de sortie :**

- `0` : Succès (utilisé par les scripts automatisés)
- `1` : Échec (utilisé par les scripts automatisés)

---

## 🎯 Résumé Complet

### **Structure du code :**

```
1. Classe Recipe
   ├─ Constructeur (crée une recette)
   └─ validate() (vérifie si la recette est valide)

2. Fonctions de test
   ├─ test() (exécute un test et gère les erreurs)
   ├─ assert() (vérifie une condition)
   └─ Compteurs (testsPasses, testsEchoues)

3. Les 8 tests
   ├─ Test 1 : Création valide
   ├─ Test 2 : Validation réussie
   ├─ Test 3 : Erreur si titre manquant
   ├─ Test 4 : Erreur si titre trop court
   ├─ Test 5 : Erreur si ingrédients manquants
   ├─ Test 6 : Erreur si instructions manquantes
   ├─ Test 7 : Erreur si portions < 1
   └─ Test 8 : Servings = 0 préservé

4. Résumé final
   └─ Affiche les résultats et quitte
```

### **Flux d'exécution :**

```
1. Initialise les compteurs
2. Pour chaque test :
   ├─ Appelle test("Nom", callback)
   │  ├─ try {
   │  │    callback()          ← Exécute le code du test
   │  │    │  ├─ Crée une recette
   │  │    │  ├─ Appelle validate()
   │  │    │  └─ assert(...)    ← Vérifie les conditions
   │  │    console.log("✅")
   │  │    testsPasses++
   │  │  }
   │  └─ catch {
   │     console.log("❌")
   │     testsEchoues++
   │  }
3. Affiche le résumé
4. process.exit(0 ou 1)
```

---

## 💡 Points Clés à Retenir

1. **`class Recipe`** : Définit ce qu'est une recette et comment la valider
2. **`test()`** : Exécute un test et gère les erreurs avec `try/catch`
3. **`assert()`** : Vérifie qu'une condition est vraie, lance une erreur sinon
4. **Les 8 tests** : Vérifient différents scénarios (succès et échecs)
5. **Résumé final** : Compte les succès/échecs et quitte avec un code de sortie

---

**Explication complète du code !** 🎯
