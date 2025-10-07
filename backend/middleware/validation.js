// Middleware de validation pour les recettes
const validateRecipe = (req, res, next) => {
  const { title, ingredients, instructions } = req.body;

  // Validation des champs requis
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Le titre est requis",
      field: "title",
    });
  }

  if (!ingredients || ingredients.trim() === "") {
    return res.status(400).json({
      error: "Les ingrédients sont requis",
      field: "ingredients",
    });
  }

  if (!instructions || instructions.trim() === "") {
    return res.status(400).json({
      error: "Les instructions sont requises",
      field: "instructions",
    });
  }

  // Validation de la longueur des champs
  if (title.length > 255) {
    return res.status(400).json({
      error: "Le titre ne peut pas dépasser 255 caractères",
      field: "title",
    });
  }

  // Validation de la difficulté
  const validDifficulties = ["Facile", "Moyen", "Difficile"];
  if (req.body.difficulty && !validDifficulties.includes(req.body.difficulty)) {
    return res.status(400).json({
      error: "La difficulté doit être 'Facile', 'Moyen' ou 'Difficile'",
      field: "difficulty",
    });
  }

  // Validation des valeurs numériques
  if (
    req.body.prep_time &&
    (isNaN(req.body.prep_time) || req.body.prep_time < 0)
  ) {
    return res.status(400).json({
      error: "Le temps de préparation doit être un nombre positif",
      field: "prep_time",
    });
  }

  if (
    req.body.cook_time &&
    (isNaN(req.body.cook_time) || req.body.cook_time < 0)
  ) {
    return res.status(400).json({
      error: "Le temps de cuisson doit être un nombre positif",
      field: "cook_time",
    });
  }

  if (
    req.body.servings &&
    (isNaN(req.body.servings) || req.body.servings < 1)
  ) {
    return res.status(400).json({
      error: "Le nombre de portions doit être un nombre positif",
      field: "servings",
    });
  }

  next();
};

// Middleware de validation pour l'ID
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({
      error: "ID invalide",
      field: "id",
    });
  }

  req.params.id = parseInt(id);
  next();
};

export { validateRecipe, validateId };
