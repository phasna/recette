import Favorite from "../models/Favorite.js";

const favoriteController = {
  /**
   * Ajouter une recette aux favoris
   */
  addToFavorites: async (req, res) => {
    try {
      // Récupérer l'ID de la recette depuis les paramètres de route ou le body
      const recipe_id = req.params.recipeId || req.body.recipe_id;
      const userId = req.user.userId;

      if (!recipe_id) {
        return res.status(400).json({
          success: false,
          message: "ID de recette requis",
        });
      }

      // Vérifier si la recette existe
      const recipeExists = await Favorite.recipeExists(recipe_id);
      if (!recipeExists) {
        return res.status(404).json({
          success: false,
          message: "Recette non trouvée",
        });
      }

      // Créer une nouvelle instance de favori
      const favorite = new Favorite({
        user_id: userId,
        recipe_id: recipe_id,
      });

      // Ajouter aux favoris
      try {
        const favoriteId = await favorite.add();

        res.status(201).json({
          success: true,
          message: "Recette ajoutée aux favoris",
          data: { id: favoriteId },
        });
      } catch (err) {
        if (err.message === "ALREADY_EXISTS") {
          return res.status(409).json({
            success: false,
            message: "Recette déjà dans les favoris",
          });
        }
        throw err;
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout aux favoris:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  /**
   * Supprimer une recette des favoris
   */
  removeFromFavorites: async (req, res) => {
    try {
      const { recipeId } = req.params;
      const userId = req.user.userId;

      // Créer une instance de favori
      const favorite = new Favorite({
        user_id: userId,
        recipe_id: recipeId,
      });

      // Supprimer le favori
      const result = await favorite.remove();

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Favori non trouvé",
        });
      }

      res.status(200).json({
        success: true,
        message: "Recette supprimée des favoris",
      });
    } catch (err) {
      console.error("Erreur lors de la suppression des favoris:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  /**
   * Vérifier si une recette est dans les favoris
   */
  checkFavoriteStatus: async (req, res) => {
    try {
      const { recipeId } = req.params;
      const userId = req.user.userId;

      // Vérifier si la recette est dans les favoris
      const isFavorite = await Favorite.isFavorite(userId, recipeId);

      res.status(200).json({
        success: true,
        isFavorite: isFavorite,
      });
    } catch (err) {
      console.error("Erreur lors de la vérification des favoris:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },

  /**
   * Récupérer les favoris d'un utilisateur
   */
  getUserFavorites: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Récupérer tous les favoris de l'utilisateur
      const favorites = await Favorite.findByUserId(userId);

      res.status(200).json({
        success: true,
        data: favorites,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris:", err);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
        error: err.message,
      });
    }
  },
};

export default favoriteController;
