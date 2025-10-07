import db from "../database.js";

const favoriteController = {
  /**
   * Ajouter une recette aux favoris
   */
  addToFavorites: (req, res) => {
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
    const checkRecipeQuery = "SELECT id FROM recipes WHERE id = ?";
    db.query(checkRecipeQuery, [recipe_id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de la recette:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Recette non trouvée",
        });
      }

      // Vérifier si déjà dans les favoris
      const checkFavoriteQuery =
        "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?";
      db.query(checkFavoriteQuery, [userId, recipe_id], (err, results) => {
        if (err) {
          console.error("Erreur lors de la vérification des favoris:", err);
          return res.status(500).json({
            success: false,
            message: "Erreur serveur",
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Recette déjà dans les favoris",
          });
        }

        // Ajouter aux favoris
        const insertQuery =
          "INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)";
        db.query(insertQuery, [userId, recipe_id], (err, result) => {
          if (err) {
            console.error("Erreur lors de l'ajout aux favoris:", err);
            return res.status(500).json({
              success: false,
              message: "Erreur serveur",
            });
          }

          res.status(201).json({
            success: true,
            message: "Recette ajoutée aux favoris",
            data: { id: result.insertId },
          });
        });
      });
    });
  },

  /**
   * Supprimer une recette des favoris
   */
  removeFromFavorites: (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.userId;

    const deleteQuery =
      "DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?";
    db.query(deleteQuery, [userId, recipeId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression des favoris:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
        });
      }

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
    });
  },

  /**
   * Vérifier si une recette est dans les favoris
   */
  checkFavoriteStatus: (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.userId;

    const checkQuery =
      "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?";
    db.query(checkQuery, [userId, recipeId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification des favoris:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
        });
      }

      res.status(200).json({
        success: true,
        isFavorite: results.length > 0,
      });
    });
  },

  /**
   * Récupérer les favoris d'un utilisateur
   */
  getUserFavorites: (req, res) => {
    const userId = req.user.userId;

    const query = `
      SELECT r.*, u.username, u.first_name, u.last_name, f.created_at as favorited_at
      FROM favorites f
      JOIN recipes r ON f.recipe_id = r.id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des favoris:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
};

export default favoriteController;
