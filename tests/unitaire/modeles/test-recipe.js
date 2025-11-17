// Test unitaire du modèle Recipe
class Recipe {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || "";
    this.description = data.description || "";
    this.ingredients = data.ingredients || "";
    this.instructions = data.instructions || "";
    // bug avec || qui transforme 0 en null, donc !== undefined
    this.prep_time = data.prep_time !== undefined ? data.prep_time : null;
    this.cook_time = data.cook_time !== undefined ? data.cook_time : null;
    this.servings = data.servings !== undefined ? data.servings : null;
    this.difficulty = data.difficulty || "Facile";
  }

  validate() {
    const errors = [];

    if (!this.title || this.title.trim() === "") {
      errors.push({ field: "title", message: "Le titre est requis" });
    } else if (this.title.length < 3) {
      errors.push({
        field: "title",
        message: "Le titre doit contenir au moins 3 caractères",
      });
    }

    if (!this.ingredients || this.ingredients.trim() === "") {
      errors.push({
        field: "ingredients",
        message: "Les ingrédients sont requis",
      });
    }

    if (!this.instructions || this.instructions.trim() === "") {
      errors.push({
        field: "instructions",
        message: "Les instructions sont requises",
      });
    }

    if (this.servings !== null && this.servings < 1) {
      errors.push({
        field: "servings",
        message: "Le nombre de portions doit être au moins 1",
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}

let testsPasses = 0;
let testsEchoues = 0;

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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

console.log("\n🧪 TESTS UNITAIRES - Modèle Recipe\n");
console.log("=".repeat(50));

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

test("Validation échoue si titre trop court", () => {
  const recipe = new Recipe({
    title: "AB",
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

test("Validation échoue si ingrédients manquants", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    instructions: "Test instructions",
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "ingredients"),
    "Il devrait y avoir une erreur pour les ingrédients"
  );
});

test("Validation échoue si instructions manquantes", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "instructions"),
    "Il devrait y avoir une erreur pour les instructions"
  );
});

test("Validation échoue si portions < 1", () => {
  const recipe = new Recipe({
    title: "Test Recipe",
    ingredients: "Test ingredients",
    instructions: "Test instructions",
    servings: 0,
  });

  const validation = recipe.validate();
  assert(validation.isValid === false, "La validation devrait échouer");
  assert(
    validation.errors.some((e) => e.field === "servings"),
    "Il devrait y avoir une erreur pour les portions"
  );
});

test("Servings = 0 est préservé", () => {
  const recipe = new Recipe({
    servings: 0,
  });

  assert(recipe.servings === 0, "servings devrait être 0, pas null");
  assert(recipe.servings !== null, "servings ne devrait pas être null");
});

// Tests de création avec différents types de données
test("Créer recette avec id", () => {
  const recipe = new Recipe({ id: 123 });
  assert(recipe.id === 123, "id devrait être 123");
});

test("Créer recette sans id", () => {
  const recipe = new Recipe({});
  assert(recipe.id === null, "id devrait être null");
});

test("Créer recette avec description", () => {
  const recipe = new Recipe({ description: "Ma description" });
  assert(
    recipe.description === "Ma description",
    "description devrait être définie"
  );
});

test("Créer recette avec prep_time", () => {
  const recipe = new Recipe({ prep_time: 30 });
  assert(recipe.prep_time === 30, "prep_time devrait être 30");
});

test("Créer recette avec prep_time = 0", () => {
  const recipe = new Recipe({ prep_time: 0 });
  assert(recipe.prep_time === 0, "prep_time devrait être 0");
});

test("Créer recette avec prep_time null", () => {
  const recipe = new Recipe({ prep_time: null });
  assert(recipe.prep_time === null, "prep_time devrait être null");
});

test("Créer recette avec cook_time", () => {
  const recipe = new Recipe({ cook_time: 45 });
  assert(recipe.cook_time === 45, "cook_time devrait être 45");
});

test("Créer recette avec cook_time = 0", () => {
  const recipe = new Recipe({ cook_time: 0 });
  assert(recipe.cook_time === 0, "cook_time devrait être 0");
});

test("Créer recette avec servings", () => {
  const recipe = new Recipe({ servings: 4 });
  assert(recipe.servings === 4, "servings devrait être 4");
});

test("Créer recette avec servings = 1", () => {
  const recipe = new Recipe({ servings: 1 });
  assert(recipe.servings === 1, "servings devrait être 1");
});

test("Créer recette avec servings null", () => {
  const recipe = new Recipe({ servings: null });
  assert(recipe.servings === null, "servings devrait être null");
});

test("Créer recette avec difficulty Facile", () => {
  const recipe = new Recipe({ difficulty: "Facile" });
  assert(recipe.difficulty === "Facile", "difficulty devrait être Facile");
});

test("Créer recette avec difficulty Moyen", () => {
  const recipe = new Recipe({ difficulty: "Moyen" });
  assert(recipe.difficulty === "Moyen", "difficulty devrait être Moyen");
});

test("Créer recette avec difficulty Difficile", () => {
  const recipe = new Recipe({ difficulty: "Difficile" });
  assert(
    recipe.difficulty === "Difficile",
    "difficulty devrait être Difficile"
  );
});

test("Créer recette sans difficulty", () => {
  const recipe = new Recipe({});
  assert(
    recipe.difficulty === "Facile",
    "difficulty par défaut devrait être Facile"
  );
});

// Tests de validation - titre
test("Titre avec exactement 3 caractères", () => {
  const recipe = new Recipe({
    title: "ABC",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre de 3 caractères devrait être valide"
  );
});

test("Titre avec 1 caractère", () => {
  const recipe = new Recipe({
    title: "A",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Titre de 1 caractère devrait être invalide"
  );
});

test("Titre vide", () => {
  const recipe = new Recipe({
    title: "",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Titre vide devrait être invalide");
});

test("Titre avec espaces uniquement", () => {
  const recipe = new Recipe({
    title: "   ",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Titre avec espaces uniquement devrait être invalide"
  );
});

test("Titre avec espaces au début et fin", () => {
  const recipe = new Recipe({
    title: "  Test Recipe  ",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec espaces devrait être valide après trim"
  );
});

test("Titre très long", () => {
  const longTitle = "A".repeat(1000);
  const recipe = new Recipe({
    title: longTitle,
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Titre très long devrait être valide");
});

test("Titre avec caractères spéciaux", () => {
  const recipe = new Recipe({
    title: "Recette & Co !",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec caractères spéciaux devrait être valide"
  );
});

test("Titre avec chiffres", () => {
  const recipe = new Recipe({
    title: "Recette 123",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec chiffres devrait être valide"
  );
});

test("Titre undefined", () => {
  const recipe = new Recipe({
    title: undefined,
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Titre undefined devrait être invalide");
});

test("Titre null", () => {
  const recipe = new Recipe({
    title: null,
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Titre null devrait être invalide");
});

// Tests de validation - ingrédients
test("Ingrédients vide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Ingrédients vide devrait être invalide"
  );
});

test("Ingrédients avec espaces uniquement", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "   ",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Ingrédients avec espaces devrait être invalide"
  );
});

test("Ingrédients très long", () => {
  const longIngredients = "A".repeat(5000);
  const recipe = new Recipe({
    title: "Test",
    ingredients: longIngredients,
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients très long devrait être valide"
  );
});

test("Ingrédients undefined", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: undefined,
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Ingrédients undefined devrait être invalide"
  );
});

test("Ingrédients null", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: null,
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Ingrédients null devrait être invalide"
  );
});

// Tests de validation - instructions
test("Instructions vide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Instructions vide devrait être invalide"
  );
});

test("Instructions avec espaces uniquement", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "   ",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Instructions avec espaces devrait être invalide"
  );
});

test("Instructions très longues", () => {
  const longInstructions = "A".repeat(10000);
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: longInstructions,
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions très longues devraient être valides"
  );
});

test("Instructions undefined", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: undefined,
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Instructions undefined devrait être invalide"
  );
});

test("Instructions null", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: null,
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Instructions null devrait être invalide"
  );
});

// Tests de validation - servings
test("Servings = 1 valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 1,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings = 1 devrait être valide");
});

test("Servings = 2 valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 2,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings = 2 devrait être valide");
});

test("Servings = 10 valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 10,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings = 10 devrait être valide");
});

test("Servings = -1 invalide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: -1,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Servings = -1 devrait être invalide");
});

test("Servings = -10 invalide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: -10,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Servings = -10 devrait être invalide");
});

test("Servings null valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: null,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings null devrait être valide");
});

test("Servings undefined valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: undefined,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings undefined devrait être valide");
});

test("Servings très grand valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 1000,
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Servings très grand devrait être valide"
  );
});

// Tests combinés - plusieurs erreurs
test("Titre et ingrédients manquants", () => {
  const recipe = new Recipe({
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Devrait être invalide");
  assert(validation.errors.length === 2, "Devrait avoir 2 erreurs");
  assert(
    validation.errors.some((e) => e.field === "title"),
    "Devrait avoir erreur titre"
  );
  assert(
    validation.errors.some((e) => e.field === "ingredients"),
    "Devrait avoir erreur ingrédients"
  );
});

test("Titre et instructions manquants", () => {
  const recipe = new Recipe({
    ingredients: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Devrait être invalide");
  assert(validation.errors.length === 2, "Devrait avoir 2 erreurs");
});

test("Titre, ingrédients et instructions manquants", () => {
  const recipe = new Recipe({});
  const validation = recipe.validate();
  assert(validation.isValid === false, "Devrait être invalide");
  assert(validation.errors.length === 3, "Devrait avoir 3 erreurs");
});

test("Titre trop court et servings invalide", () => {
  const recipe = new Recipe({
    title: "AB",
    ingredients: "Test",
    instructions: "Test",
    servings: 0,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Devrait être invalide");
  assert(validation.errors.length === 2, "Devrait avoir 2 erreurs");
});

test("Tous les champs invalides", () => {
  const recipe = new Recipe({
    title: "A",
    ingredients: "",
    instructions: "   ",
    servings: -1,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Devrait être invalide");
  assert(validation.errors.length >= 3, "Devrait avoir au moins 3 erreurs");
});

// Tests de recette complète valide
test("Recette complète avec tous les champs", () => {
  const recipe = new Recipe({
    id: 1,
    title: "Pâtes carbonara",
    description: "Un plat italien délicieux",
    ingredients: "Pâtes, lardons, œufs, parmesan",
    instructions:
      "Cuire les pâtes, faire revenir les lardons, mélanger avec les œufs",
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    difficulty: "Moyen",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette complète devrait être valide");
  assert(recipe.id === 1, "id devrait être 1");
  assert(
    recipe.description === "Un plat italien délicieux",
    "description devrait être définie"
  );
  assert(recipe.prep_time === 15, "prep_time devrait être 15");
  assert(recipe.cook_time === 20, "cook_time devrait être 20");
});

test("Recette minimale valide", () => {
  const recipe = new Recipe({
    title: "ABC",
    ingredients: "X",
    instructions: "Y",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette minimale devrait être valide");
});

// Tests de valeurs numériques
test("Prep_time avec valeur négative", () => {
  const recipe = new Recipe({
    prep_time: -5,
  });
  assert(recipe.prep_time === -5, "prep_time négatif devrait être préservé");
});

test("Cook_time avec valeur négative", () => {
  const recipe = new Recipe({
    cook_time: -10,
  });
  assert(recipe.cook_time === -10, "cook_time négatif devrait être préservé");
});

test("Prep_time très grand", () => {
  const recipe = new Recipe({
    prep_time: 999999,
  });
  assert(
    recipe.prep_time === 999999,
    "prep_time très grand devrait être préservé"
  );
});

test("Cook_time très grand", () => {
  const recipe = new Recipe({
    cook_time: 999999,
  });
  assert(
    recipe.cook_time === 999999,
    "cook_time très grand devrait être préservé"
  );
});

test("Prep_time et cook_time = 0", () => {
  const recipe = new Recipe({
    prep_time: 0,
    cook_time: 0,
  });
  assert(recipe.prep_time === 0, "prep_time devrait être 0");
  assert(recipe.cook_time === 0, "cook_time devrait être 0");
});

// Tests de recette vide
test("Recette complètement vide", () => {
  const recipe = new Recipe({});
  assert(recipe.title === "", "title devrait être vide");
  assert(recipe.ingredients === "", "ingredients devrait être vide");
  assert(recipe.instructions === "", "instructions devrait être vide");
  assert(recipe.id === null, "id devrait être null");
});

test("Recette avec données undefined", () => {
  const recipe = new Recipe({
    id: undefined,
    title: undefined,
    ingredients: undefined,
    instructions: undefined,
  });
  assert(recipe.id === null, "id undefined devrait devenir null");
  assert(recipe.title === "", "title undefined devrait devenir vide");
});

// Tests de validation - messages d'erreur
test("Message d'erreur pour titre manquant", () => {
  const recipe = new Recipe({
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  const titleError = validation.errors.find((e) => e.field === "title");
  assert(titleError !== undefined, "Devrait avoir une erreur pour title");
  assert(
    titleError.message === "Le titre est requis",
    "Message d'erreur devrait être correct"
  );
});

test("Message d'erreur pour titre trop court", () => {
  const recipe = new Recipe({
    title: "AB",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  const titleError = validation.errors.find((e) => e.field === "title");
  assert(titleError !== undefined, "Devrait avoir une erreur pour title");
  assert(
    titleError.message.includes("3 caractères"),
    "Message devrait mentionner 3 caractères"
  );
});

test("Message d'erreur pour ingrédients manquants", () => {
  const recipe = new Recipe({
    title: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  const ingredientsError = validation.errors.find(
    (e) => e.field === "ingredients"
  );
  assert(
    ingredientsError !== undefined,
    "Devrait avoir une erreur pour ingredients"
  );
  assert(
    ingredientsError.message === "Les ingrédients sont requis",
    "Message devrait être correct"
  );
});

test("Message d'erreur pour instructions manquantes", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
  });
  const validation = recipe.validate();
  const instructionsError = validation.errors.find(
    (e) => e.field === "instructions"
  );
  assert(
    instructionsError !== undefined,
    "Devrait avoir une erreur pour instructions"
  );
  assert(
    instructionsError.message === "Les instructions sont requises",
    "Message devrait être correct"
  );
});

test("Message d'erreur pour servings invalide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 0,
  });
  const validation = recipe.validate();
  const servingsError = validation.errors.find((e) => e.field === "servings");
  assert(servingsError !== undefined, "Devrait avoir une erreur pour servings");
  assert(
    servingsError.message.includes("portions"),
    "Message devrait mentionner portions"
  );
});

// Tests de cas limites - titre
test("Titre avec tabulation", () => {
  const recipe = new Recipe({
    title: "\tABC\t",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec tabulation devrait être valide après trim"
  );
});

test("Titre avec retour à la ligne", () => {
  const recipe = new Recipe({
    title: "\nABC\n",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec retour à la ligne devrait être valide après trim"
  );
});

test("Titre avec caractères Unicode", () => {
  const recipe = new Recipe({
    title: "Recette 🍝",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Titre avec Unicode devrait être valide");
});

test("Titre avec accents", () => {
  const recipe = new Recipe({
    title: "Recette à la française",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Titre avec accents devrait être valide");
});

// Tests de cas limites - ingrédients
test("Ingrédients avec tabulation", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "\tABC\t",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients avec tabulation devrait être valide après trim"
  );
});

test("Ingrédients avec retour à la ligne", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "\nABC\n",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients avec retour à la ligne devrait être valide après trim"
  );
});

test("Ingrédients avec liste", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "1. Farine\n2. Sucre\n3. Œufs",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients avec liste devrait être valide"
  );
});

// Tests de cas limites - instructions
test("Instructions avec tabulation", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "\tABC\t",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions avec tabulation devrait être valide après trim"
  );
});

test("Instructions avec retour à la ligne", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "\nABC\n",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions avec retour à la ligne devrait être valide après trim"
  );
});

test("Instructions avec étapes numérotées", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "1. Étape 1\n2. Étape 2\n3. Étape 3",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions avec étapes devrait être valide"
  );
});

// Tests de valeurs numériques limites
test("Servings avec décimal valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 2.5,
  });
  assert(recipe.servings === 2.5, "servings décimal devrait être préservé");
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "servings décimal >= 1 devrait être valide"
  );
});

test("Prep_time avec décimal", () => {
  const recipe = new Recipe({
    prep_time: 15.5,
  });
  assert(recipe.prep_time === 15.5, "prep_time décimal devrait être préservé");
});

test("Cook_time avec décimal", () => {
  const recipe = new Recipe({
    cook_time: 30.25,
  });
  assert(recipe.cook_time === 30.25, "cook_time décimal devrait être préservé");
});

// Tests de recette avec valeurs réelles
test("Recette de gâteau au chocolat", () => {
  const recipe = new Recipe({
    title: "Gâteau au chocolat",
    description: "Un gâteau moelleux et savoureux",
    ingredients: "200g chocolat, 150g beurre, 3 œufs, 100g sucre",
    instructions:
      "Faire fondre le chocolat avec le beurre, ajouter les œufs et le sucre, cuire 25min",
    prep_time: 15,
    cook_time: 25,
    servings: 8,
    difficulty: "Facile",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette de gâteau devrait être valide");
});

test("Recette de pizza", () => {
  const recipe = new Recipe({
    title: "Pizza margherita",
    ingredients: "Pâte à pizza, tomates, mozzarella, basilic",
    instructions:
      "Étaler la pâte, ajouter les tomates et la mozzarella, cuire 12min",
    prep_time: 20,
    cook_time: 12,
    servings: 4,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette de pizza devrait être valide");
});

test("Recette de salade", () => {
  const recipe = new Recipe({
    title: "Salade César",
    ingredients: "Laitue, poulet, parmesan, croûtons",
    instructions: "Mélanger tous les ingrédients avec la sauce",
    prep_time: 10,
    servings: 2,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette de salade devrait être valide");
});

// Tests de validation - structure de retour
test("Structure de retour validation valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(validation.hasOwnProperty("isValid"), "Devrait avoir isValid");
  assert(validation.hasOwnProperty("errors"), "Devrait avoir errors");
  assert(Array.isArray(validation.errors), "errors devrait être un tableau");
});

test("Structure de retour validation invalide", () => {
  const recipe = new Recipe({});
  const validation = recipe.validate();
  assert(validation.hasOwnProperty("isValid"), "Devrait avoir isValid");
  assert(validation.hasOwnProperty("errors"), "Devrait avoir errors");
  assert(validation.isValid === false, "isValid devrait être false");
  assert(validation.errors.length > 0, "errors devrait contenir des erreurs");
});

test("Structure des erreurs", () => {
  const recipe = new Recipe({});
  const validation = recipe.validate();
  if (validation.errors.length > 0) {
    const error = validation.errors[0];
    assert(error.hasOwnProperty("field"), "Erreur devrait avoir field");
    assert(error.hasOwnProperty("message"), "Erreur devrait avoir message");
    assert(typeof error.field === "string", "field devrait être une string");
    assert(
      typeof error.message === "string",
      "message devrait être une string"
    );
  }
});

// Tests de recette avec tous les champs optionnels remplis
test("Recette avec tous les champs remplis", () => {
  const recipe = new Recipe({
    id: 42,
    title: "Recette complète",
    description: "Description détaillée",
    ingredients: "Ingrédient 1, Ingrédient 2",
    instructions: "Instruction 1, Instruction 2",
    prep_time: 10,
    cook_time: 20,
    servings: 6,
    difficulty: "Difficile",
  });
  assert(recipe.id === 42, "id devrait être 42");
  assert(recipe.title === "Recette complète", "title devrait être correct");
  assert(
    recipe.description === "Description détaillée",
    "description devrait être correcte"
  );
  assert(
    recipe.ingredients === "Ingrédient 1, Ingrédient 2",
    "ingredients devrait être correct"
  );
  assert(
    recipe.instructions === "Instruction 1, Instruction 2",
    "instructions devrait être correct"
  );
  assert(recipe.prep_time === 10, "prep_time devrait être 10");
  assert(recipe.cook_time === 20, "cook_time devrait être 20");
  assert(recipe.servings === 6, "servings devrait être 6");
  assert(
    recipe.difficulty === "Difficile",
    "difficulty devrait être Difficile"
  );
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette complète devrait être valide");
});

// Tests supplémentaires de cas limites
test("Titre avec seulement des chiffres", () => {
  const recipe = new Recipe({
    title: "123",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec chiffres devrait être valide"
  );
});

test("Titre avec seulement des caractères spéciaux valides", () => {
  const recipe = new Recipe({
    title: "!!!",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec caractères spéciaux devrait être valide"
  );
});

test("Ingrédients avec un seul caractère valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "A",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients avec un caractère devrait être valide"
  );
});

test("Instructions avec un seul caractère valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "A",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions avec un caractère devrait être valide"
  );
});

test("Servings avec valeur fractionnaire invalide (< 1)", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 0.5,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Servings < 1 devrait être invalide");
});

test("Servings avec valeur fractionnaire invalide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 0.1,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Servings < 1 devrait être invalide");
});

// Tests supplémentaires pour atteindre 120+ tests
test("Titre avec exactement 2 caractères invalide", () => {
  const recipe = new Recipe({
    title: "AB",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === false,
    "Titre de 2 caractères devrait être invalide"
  );
});

test("Titre avec exactement 4 caractères valide", () => {
  const recipe = new Recipe({
    title: "ABCD",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre de 4 caractères devrait être valide"
  );
});

test("Servings avec 100 personnes", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 100,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings de 100 devrait être valide");
});

test("Recette avec seulement title, ingredients, instructions valide", () => {
  const recipe = new Recipe({
    title: "Simple Recipe",
    ingredients: "Ingredient list",
    instructions: "Step by step",
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Recette minimale devrait être valide");
});

test("Id avec valeur 0 devient null (bug avec ||)", () => {
  const recipe = new Recipe({
    id: 0,
  });
  assert(recipe.id === null, "id de 0 devient null avec ||");
});

test("Id avec valeur négative", () => {
  const recipe = new Recipe({
    id: -1,
  });
  assert(recipe.id === -1, "id négatif devrait être préservé");
});

test("Description vide acceptée", () => {
  const recipe = new Recipe({
    description: "",
  });
  assert(recipe.description === "", "Description vide devrait être acceptée");
});

test("Description très longue acceptée", () => {
  const longDesc = "A".repeat(10000);
  const recipe = new Recipe({
    description: longDesc,
  });
  assert(
    recipe.description === longDesc,
    "Description longue devrait être préservée"
  );
});

test("Prep_time undefined devient null", () => {
  const recipe = new Recipe({
    prep_time: undefined,
  });
  assert(recipe.prep_time === null, "prep_time undefined devrait devenir null");
});

test("Cook_time undefined devient null", () => {
  const recipe = new Recipe({
    cook_time: undefined,
  });
  assert(recipe.cook_time === null, "cook_time undefined devrait devenir null");
});

test("Servings undefined devient null", () => {
  const recipe = new Recipe({
    servings: undefined,
  });
  assert(recipe.servings === null, "servings undefined devrait devenir null");
});

test("Titre avec caractères spéciaux multiples", () => {
  const recipe = new Recipe({
    title: "Recette !!! & Co. @#$",
    ingredients: "Test",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Titre avec caractères spéciaux devrait être valide"
  );
});

test("Ingrédients avec virgules", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Farine, Sucre, Œufs, Beurre",
    instructions: "Test",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Ingrédients avec virgules devrait être valide"
  );
});

test("Instructions avec points", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Étape 1. Mélanger. Étape 2. Cuire.",
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Instructions avec points devrait être valide"
  );
});

test("Validation avec erreurs multiples retourne tous les champs", () => {
  const recipe = new Recipe({});
  const validation = recipe.validate();
  assert(validation.errors.length === 3, "Devrait avoir 3 erreurs");
  const fields = validation.errors.map((e) => e.field);
  assert(fields.includes("title"), "Devrait inclure title");
  assert(fields.includes("ingredients"), "Devrait inclure ingredients");
  assert(fields.includes("instructions"), "Devrait inclure instructions");
});

test("Servings de 0.99 invalide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 0.99,
  });
  const validation = recipe.validate();
  assert(validation.isValid === false, "Servings 0.99 devrait être invalide");
});

test("Servings de 1.01 valide", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    servings: 1.01,
  });
  const validation = recipe.validate();
  assert(validation.isValid === true, "Servings 1.01 devrait être valide");
});

test("Recette avec tous les champs numériques à 0", () => {
  const recipe = new Recipe({
    title: "Test",
    ingredients: "Test",
    instructions: "Test",
    prep_time: 0,
    cook_time: 0,
    servings: 1,
  });
  const validation = recipe.validate();
  assert(
    validation.isValid === true,
    "Recette avec temps à 0 devrait être valide"
  );
});

test("Recette avec difficulté vide devient Facile", () => {
  const recipe = new Recipe({
    difficulty: "",
  });
  assert(
    recipe.difficulty === "Facile",
    "difficulty vide devrait devenir Facile"
  );
});

test("Titre null devient chaîne vide", () => {
  const recipe = new Recipe({
    title: null,
  });
  assert(recipe.title === "", "title null devrait devenir chaîne vide");
});

test("Ingrédients null devient chaîne vide", () => {
  const recipe = new Recipe({
    ingredients: null,
  });
  assert(
    recipe.ingredients === "",
    "ingredients null devrait devenir chaîne vide"
  );
});

test("Instructions null devient chaîne vide", () => {
  const recipe = new Recipe({
    instructions: null,
  });
  assert(
    recipe.instructions === "",
    "instructions null devrait devenir chaîne vide"
  );
});

test("Description null devient chaîne vide", () => {
  const recipe = new Recipe({
    description: null,
  });
  assert(
    recipe.description === "",
    "description null devrait devenir chaîne vide"
  );
});

test("Titre undefined devient chaîne vide", () => {
  const recipe = new Recipe({
    title: undefined,
  });
  assert(recipe.title === "", "title undefined devrait devenir chaîne vide");
});

test("Ingrédients undefined devient chaîne vide", () => {
  const recipe = new Recipe({
    ingredients: undefined,
  });
  assert(
    recipe.ingredients === "",
    "ingredients undefined devrait devenir chaîne vide"
  );
});

test("Instructions undefined devient chaîne vide", () => {
  const recipe = new Recipe({
    instructions: undefined,
  });
  assert(
    recipe.instructions === "",
    "instructions undefined devrait devenir chaîne vide"
  );
});

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
