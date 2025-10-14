import db from "../database.js";

/**
 * Contrôleur pour l'Assistant Vide-Frigo
 * Trouve des recettes basées sur les ingrédients disponibles
 */

/**
 * Rechercher des recettes par ingrédients
 */
export const searchByIngredients = async (req, res) => {
  try {
    const { ingredients, minMatchPercentage = 0 } = req.body;

    console.log("🔍 Recherche API avec ingrédients:", ingredients);
    console.log("📊 Pourcentage minimum:", minMatchPercentage);

    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Veuillez fournir au moins un ingrédient",
      });
    }

    // Récupérer l'utilisateur connecté (optionnel)
    const userId = req.user ? req.user.userId : null;

    // Récupérer toutes les recettes (utilisateur + partagées)
    const query = `
      SELECT DISTINCT
        r.id,
        r.title,
        r.description,
        r.ingredients,
        r.instructions,
        r.prep_time,
        r.cook_time,
        r.servings,
        r.difficulty,
        r.user_id,
        r.is_shared,
        r.created_at,
        u.username,
        u.first_name,
        u.last_name
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.user_id = ? OR r.is_shared = 1
      ORDER BY r.created_at DESC
    `;

    db.query(query, [userId || 0], (err, recipes) => {
      if (err) {
        console.error("❌ Erreur SQL:", err);
        return res.status(500).json({
          success: false,
          error: "Erreur lors de la récupération des recettes",
        });
      }

      console.log("📋 Recettes trouvées en DB:", recipes.length);

      // Normaliser une chaîne (retirer accents et minuscules)
      const normalize = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      // Analyser chaque recette
      const results = recipes
        .map((recipe) => {
          const recipeIngredients = (recipe.ingredients || "")
            .split("\n")
            .map((ing) => normalize(ing.trim()))
            .filter((ing) => ing);

          let matchCount = 0;
          const foundIngredients = [];
          const missingIngredients = [];

          // Compter les correspondances
          ingredients.forEach((userIngredient) => {
            const normalizedUserIng = normalize(userIngredient);

            const found = recipeIngredients.some((recipeIng) =>
              recipeIng.includes(normalizedUserIng)
            );

            if (found) {
              matchCount++;
              foundIngredients.push(userIngredient);
            }
          });

          // Identifier les ingrédients manquants
          recipeIngredients.forEach((recipeIng) => {
            const hasIngredient = ingredients.some((userIng) => {
              const normalizedUserIng = normalize(userIng);
              return recipeIng.includes(normalizedUserIng);
            });

            if (!hasIngredient) {
              missingIngredients.push(recipeIng);
            }
          });

          const matchPercentage =
            recipeIngredients.length > 0
              ? Math.round((matchCount / recipeIngredients.length) * 100)
              : 0;

          return {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            prep_time: recipe.prep_time,
            cook_time: recipe.cook_time,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            user_id: recipe.user_id,
            is_shared: recipe.is_shared,
            created_at: recipe.created_at,
            username: recipe.username,
            first_name: recipe.first_name,
            last_name: recipe.last_name,
            // Données de correspondance
            matchPercentage,
            matchCount,
            totalIngredients: recipeIngredients.length,
            foundIngredients,
            missingIngredients: missingIngredients.slice(0, 5), // Limiter pour la réponse
          };
        })
        .filter((recipe) => recipe.matchPercentage >= minMatchPercentage)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

      console.log("✅ Recettes correspondantes:", results.length);

      res.json({
        success: true,
        data: results,
        count: results.length,
        searchCriteria: {
          ingredients,
          minMatchPercentage,
        },
      });
    });
  } catch (error) {
    console.error("❌ Erreur lors de la recherche:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la recherche de recettes",
      details: error.message,
    });
  }
};

export default {
  searchByIngredients,
};
