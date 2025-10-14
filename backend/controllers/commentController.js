import Comment from "../models/Comment.js";

/**
 * Contrôleur pour gérer les commentaires sur les recettes
 */

/**
 * Créer un nouveau commentaire
 */
export const createComment = async (req, res) => {
  try {
    console.log("📝 Création de commentaire - req.body:", req.body);
    console.log("👤 Utilisateur:", req.user);

    const { recipeId, commentText, rating } = req.body;

    if (!req.user || !req.user.userId) {
      console.log("❌ Pas d'utilisateur authentifié");
      return res.status(401).json({
        error: "Authentification requise",
      });
    }

    const userId = req.user.userId;

    const comment = new Comment({
      recipe_id: recipeId,
      user_id: userId,
      comment_text: commentText,
      rating: rating || null,
    });

    console.log("📋 Commentaire à créer:", comment);

    // Valider le commentaire
    const validation = comment.validate();
    if (!validation.isValid) {
      console.log("❌ Validation échouée:", validation.errors);
      return res.status(400).json({
        error: "Données invalides",
        details: validation.errors,
      });
    }

    const commentId = await comment.create();
    console.log("✅ Commentaire créé avec ID:", commentId);

    // Récupérer le commentaire créé avec les détails de l'utilisateur
    const createdComment = await Comment.findById(commentId);
    console.log("📤 Commentaire à retourner:", createdComment);

    res.status(201).json({
      message: "Commentaire ajouté avec succès",
      comment: createdComment,
      success: true,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la création du commentaire:", error);
    console.error("   Message:", error.message);
    console.error("   Stack:", error.stack);
    res.status(500).json({
      error: "Erreur lors de l'ajout du commentaire",
      details: error.message,
    });
  }
};

/**
 * Mettre à jour un commentaire
 */
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText, rating } = req.body;
    const userId = req.user.userId;

    // Récupérer le commentaire
    const comment = await Comment.findById(parseInt(commentId));

    if (!comment) {
      return res.status(404).json({
        error: "Commentaire non trouvé",
      });
    }

    // Vérifier que l'utilisateur est l'auteur du commentaire
    if (comment.user_id !== userId) {
      return res.status(403).json({
        error: "Vous n'êtes pas autorisé à modifier ce commentaire",
      });
    }

    // Mettre à jour les champs
    comment.comment_text = commentText;
    comment.rating = rating || comment.rating;

    // Valider
    const validation = comment.validate();
    if (!validation.isValid) {
      return res.status(400).json({
        error: "Données invalides",
        details: validation.errors,
      });
    }

    await comment.update();

    res.json({
      message: "Commentaire modifié avec succès",
      comment: comment,
      success: true,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du commentaire:", error);
    res.status(500).json({
      error: "Erreur lors de la modification du commentaire",
    });
  }
};

/**
 * Supprimer un commentaire
 */
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    console.log("🗑️  Suppression commentaire:", { commentId, userId });

    // Récupérer le commentaire
    const comment = await Comment.findById(parseInt(commentId));

    console.log("📝 Commentaire trouvé:", comment);

    if (!comment) {
      console.log("❌ Commentaire non trouvé");
      return res.status(404).json({
        error: "Commentaire non trouvé",
      });
    }

    // Vérifier que l'utilisateur est l'auteur du commentaire
    console.log("🔍 Vérification:", {
      comment_user_id: comment.user_id,
      request_user_id: userId,
      equal: parseInt(comment.user_id) === parseInt(userId),
    });

    if (parseInt(comment.user_id) !== parseInt(userId)) {
      console.log("❌ Utilisateur non autorisé");
      return res.status(403).json({
        error: "Vous n'êtes pas autorisé à supprimer ce commentaire",
      });
    }

    // Créer une instance de Comment pour utiliser la méthode delete
    const commentInstance = new Comment(comment);
    await commentInstance.delete();

    console.log("✅ Commentaire supprimé");

    res.json({
      message: "Commentaire supprimé avec succès",
      success: true,
    });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du commentaire:", error);
    res.status(500).json({
      error: "Erreur lors de la suppression du commentaire",
      details: error.message,
    });
  }
};

/**
 * Récupérer les commentaires d'une recette
 */
export const getRecipeComments = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const comments = await Comment.findByRecipe(parseInt(recipeId), limit);

    res.json({
      comments,
      count: comments.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des commentaires",
    });
  }
};

/**
 * Récupérer les commentaires d'un utilisateur
 */
export const getUserComments = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const comments = await Comment.findByUser(parseInt(userId), limit);

    res.json({
      comments,
      count: comments.length,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires de l'utilisateur:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des commentaires",
    });
  }
};

/**
 * Liker un commentaire
 */
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    await Comment.like(parseInt(commentId), userId);

    res.json({
      message: "Commentaire liké",
      success: true,
    });
  } catch (error) {
    console.error("Erreur lors du like:", error);
    if (error.message.includes("déjà liké")) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: "Erreur lors du like du commentaire",
      });
    }
  }
};

/**
 * Retirer le like d'un commentaire
 */
export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const success = await Comment.unlike(parseInt(commentId), userId);

    if (success) {
      res.json({
        message: "Like retiré",
        success: true,
      });
    } else {
      res.status(404).json({
        error: "Like non trouvé",
      });
    }
  } catch (error) {
    console.error("Erreur lors du retrait du like:", error);
    res.status(500).json({
      error: "Erreur lors du retrait du like",
    });
  }
};

/**
 * Obtenir les statistiques d'une recette (commentaires et notes)
 */
export const getRecipeStats = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const stats = await Comment.getRecipeStats(parseInt(recipeId));

    res.json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};

/**
 * Récupérer les commentaires récents de la communauté
 */
export const getRecentCommunityComments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    const comments = await Comment.getRecentCommunityComments(limit);

    res.json({
      comments,
      count: comments.length,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires récents:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des commentaires récents",
    });
  }
};
