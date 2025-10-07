import db from "../database.js";

// Contrôleur pour les recettes
const recipeController = {
  // Récupérer toutes les recettes (avec filtre par utilisateur si connecté)
  getAllRecipes: (req, res) => {
    let query =
      "SELECT r.*, u.username, u.first_name, u.last_name FROM recipes r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC";
    let params = [];

    // Si un utilisateur est connecté, filtrer par ses recettes
    if (req.user) {
      query =
        "SELECT r.*, u.username, u.first_name, u.last_name FROM recipes r LEFT JOIN users u ON r.user_id = u.id WHERE r.user_id = ? ORDER BY r.created_at DESC";
      params = [req.user.userId];
    }

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des recettes:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
          error: err.message,
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length,
      });
    });
  },

  // Récupérer une recette par ID
  getRecipeById: (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM recipes WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de la recette:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Recette non trouvée" });
      }

      res.json(results[0]);
    });
  },

  // Créer une nouvelle recette
  createRecipe: (req, res) => {
    const {
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      difficulty,
    } = req.body;

    // Récupérer l'ID de l'utilisateur connecté (ou null si pas connecté)
    const userId = req.user ? req.user.userId : null;

    const query = `
      INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description || "",
      ingredients,
      instructions,
      prep_time || null,
      cook_time || null,
      servings || null,
      difficulty || "Facile",
      userId,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Erreur lors de la création de la recette:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      res.status(201).json({
        message: "Recette créée avec succès",
        id: result.insertId,
      });
    });
  },

  // Mettre à jour une recette
  updateRecipe: (req, res) => {
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
    } = req.body;

    const query = `
      UPDATE recipes 
      SET title = ?, description = ?, ingredients = ?, instructions = ?, 
          prep_time = ?, cook_time = ?, servings = ?, difficulty = ?
      WHERE id = ?
    `;

    const values = [
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      difficulty,
      id,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la recette:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Recette non trouvée" });
      }

      res.json({ message: "Recette mise à jour avec succès" });
    });
  },

  // Supprimer une recette
  deleteRecipe: (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM recipes WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de la recette:", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Recette non trouvée" });
      }

      res.json({ message: "Recette supprimée avec succès" });
    });
  },

  // Partager une recette
  shareRecipe: (req, res) => {
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

    // Vérifier que la recette appartient à l'utilisateur
    const checkQuery = "SELECT user_id FROM recipes WHERE id = ?";
    db.query(checkQuery, [id], (err, results) => {
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

      if (results[0].user_id !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: "Vous ne pouvez partager que vos propres recettes",
        });
      }

      // Mettre à jour la recette pour la marquer comme partagée
      const updateQuery = `
        UPDATE recipes 
        SET is_shared = ?, 
            share_message = ?, 
            allow_comments = ?, 
            show_author_info = ?,
            shared_at = NOW()
        WHERE id = ?
      `;

      const values = [
        showOnVisitorPage ? 1 : 0,
        shareMessage || null,
        allowComments ? 1 : 0,
        showAuthorInfo ? 1 : 0,
        id,
      ];

      db.query(updateQuery, values, (err, result) => {
        if (err) {
          console.error("Erreur lors du partage de la recette:", err);
          return res.status(500).json({
            success: false,
            message: "Erreur serveur",
          });
        }

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
      });
    });
  },

  // Récupérer les recettes partagées (pour la page visiteur)
  getSharedRecipes: (req, res) => {
    const query = `
      SELECT r.*, 
             u.username, 
             u.first_name, 
             u.last_name,
             r.share_message,
             r.shared_at
      FROM recipes r 
      LEFT JOIN users u ON r.user_id = u.id 
      WHERE r.is_shared = 1 
      ORDER BY r.shared_at DESC, r.created_at DESC
      LIMIT 20
    `;

    db.query(query, [], (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des recettes partagées:",
          err
        );
        return res.status(500).json({
          success: false,
          message: "Erreur serveur",
          error: err.message,
        });
      }

      // Formater les résultats pour masquer certaines informations si nécessaire
      const formattedResults = results.map((recipe) => ({
        ...recipe,
        // Masquer les informations sensibles si l'auteur ne veut pas les afficher
        author_name: recipe.show_author_info
          ? `${recipe.first_name || ""} ${recipe.last_name || ""}`.trim() ||
            recipe.username
          : "Utilisateur anonyme",
        username: recipe.show_author_info ? recipe.username : null,
        first_name: recipe.show_author_info ? recipe.first_name : null,
        last_name: recipe.show_author_info ? recipe.last_name : null,
      }));

      res.json({
        success: true,
        data: formattedResults,
        count: formattedResults.length,
        message: "Recettes partagées récupérées avec succès",
      });
    });
  },
};

export default recipeController;
