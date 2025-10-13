import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getRecipeComments,
  getUserComments,
  likeComment,
  unlikeComment,
  getRecipeStats,
  getRecentCommunityComments,
} from "../controllers/commentController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * Routes pour gérer les commentaires sur les recettes
 */

// Récupérer les commentaires récents de la communauté (public)
router.get("/recent", getRecentCommunityComments);

// Créer un nouveau commentaire (authentifié)
router.post("/", authenticateToken, createComment);

// Mettre à jour un commentaire (authentifié)
router.put("/:commentId", authenticateToken, updateComment);

// Supprimer un commentaire (authentifié)
router.delete("/:commentId", authenticateToken, deleteComment);

// Récupérer les commentaires d'une recette (public)
router.get("/recipe/:recipeId", getRecipeComments);

// Récupérer les commentaires d'un utilisateur (public)
router.get("/user/:userId", getUserComments);

// Liker un commentaire (authentifié)
router.post("/:commentId/like", authenticateToken, likeComment);

// Retirer le like d'un commentaire (authentifié)
router.delete("/:commentId/like", authenticateToken, unlikeComment);

// Obtenir les statistiques d'une recette (public)
router.get("/recipe/:recipeId/stats", getRecipeStats);

export default router;

