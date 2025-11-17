import Recipe from "../models/Recipe.js";

// Contrôleur pour les recettes
const recipeController = {
  // Récupérer toutes les recettes (avec filtre par utilisateur si connecté)
  getAllRecipes: async (req, res) => {
    try {
      const userId = req.user ? req.user.userId : null;
      const recipes = await Recipe.findAll(userId);

      res.json({
        success: true,
        data: recipes,
        count: recipes.length,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des recettes:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  // Récupérer une recette par ID
  getRecipeById: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({
          success: false,
          error: "Recette non trouvée",
        });
      }

      res.json({
        success: true,
        data: recipe.toJSON(),
      });
    } catch (err) {
      console.error("Erreur lors de la récupération de la recette:", err);
      res.status(500).json({
        success: false,
        error: "Erreur serveur",
      });
    }
  },

  // Créer une nouvelle recette
  createRecipe: async (req, res) => {
    try {
      const {
        title,
        description,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        servings,
        difficulty,
        image_url,
        video_url,
      } = req.body;

      // Récupérer l'ID de l'utilisateur connecté (ou null si pas connecté)
      const userId = req.user ? req.user.userId : null;

      // Créer une instance de Recipe
      const recipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        servings,
        difficulty,
        image_url,
        video_url,
        user_id: userId,
      });

      // Valider la recette
      const validation = recipe.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: validation.errors,
        });
      }

      // Créer la recette dans la base de données
      const recipeId = await recipe.create();

      res.status(201).json({
        success: true,
        message: "Recette créée avec succès",
        id: recipeId,
      });
    } catch (err) {
      console.error("Erreur lors de la création de la recette:", err);
      res.status(500).json({
        success: false,
        error: "Erreur serveur",
      });
    }
  },

  // Mettre à jour une recette
  updateRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        servings,
        difficulty,
        image_url,
        video_url,
      } = req.body;

      // Récupérer la recette existante
      const existingRecipe = await Recipe.findById(id);
      if (!existingRecipe) {
        return res.status(404).json({
          success: false,
          error: "Recette non trouvée",
        });
      }

      // Mettre à jour les propriétés
      existingRecipe.title = title;
      existingRecipe.description = description;
      existingRecipe.ingredients = ingredients;
      existingRecipe.instructions = instructions;
      existingRecipe.prep_time = prep_time;
      existingRecipe.cook_time = cook_time;
      existingRecipe.servings = servings;
      existingRecipe.difficulty = difficulty;
      existingRecipe.image_url = image_url;
      existingRecipe.video_url = video_url;

      // Valider la recette
      const validation = existingRecipe.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: validation.errors,
        });
      }

      // Mettre à jour dans la base de données
      const result = await existingRecipe.update();

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Recette non trouvée",
        });
      }

      res.json({
        success: true,
        message: "Recette mise à jour avec succès",
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la recette:", err);
      res.status(500).json({
        success: false,
        error: "Erreur serveur",
      });
    }
  },

  // Supprimer une recette
  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;

      // Récupérer la recette existante
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({
          success: false,
          error: "Recette non trouvée",
        });
      }

      // Supprimer la recette
      const result = await recipe.delete();

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Recette non trouvée",
        });
      }

      res.json({
        success: true,
        message: "Recette supprimée avec succès",
      });
    } catch (err) {
      console.error("Erreur lors de la suppression de la recette:", err);
      res.status(500).json({
        success: false,
        error: "Erreur serveur",
      });
    }
  },

  // Partager une recette
  shareRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const { showOnVisitorPage, allowComments, showAuthorInfo, shareMessage } =
        req.body;

      // Vérifier que l'utilisateur est connecté
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentification requise",
        });
      }

      // Récupérer la recette
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recette non trouvée",
        });
      }

      // Vérifier que la recette appartient à l'utilisateur
      if (recipe.user_id !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Vous ne pouvez partager que vos propres recettes",
        });
      }

      // Partager la recette
      await recipe.share({
        showOnVisitorPage,
        allowComments,
        showAuthorInfo,
        shareMessage,
      });

      res.json({
        success: true,
        message: showOnVisitorPage
          ? "Recette partagée avec succès sur la page visiteur !"
          : "Recette retirée du partage public",
        data: {
          isShared: showOnVisitorPage,
          shareMessage,
          allowComments,
          showAuthorInfo,
        },
      });
    } catch (err) {
      console.error("Erreur lors du partage de la recette:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  // Récupérer les recettes partagées (pour la page visiteur)
  getSharedRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.findShared(20);

      res.json({
        success: true,
        data: recipes,
        count: recipes.length,
        message: "Recettes partagées récupérées avec succès",
      });
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des recettes partagées:",
        err
      );
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },
};

export default recipeController;
