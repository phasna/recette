import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getSuggestedUsers,
  checkFollowStatus,
  getFollowStats,
} from "../controllers/followController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * Routes pour gérer les relations de suivi entre utilisateurs
 * Toutes les routes nécessitent une authentification
 */

// Suivre un utilisateur
router.post("/", authenticateToken, followUser);

// Ne plus suivre un utilisateur
router.delete("/:userId", authenticateToken, unfollowUser);

// Récupérer les abonnés d'un utilisateur
router.get("/:userId/followers", authenticateToken, getFollowers);

// Récupérer les abonnements d'un utilisateur
router.get("/:userId/following", authenticateToken, getFollowing);

// Récupérer les utilisateurs suggérés
router.get("/suggestions/users", authenticateToken, getSuggestedUsers);

// Vérifier si on suit un utilisateur
router.get("/:userId/status", authenticateToken, checkFollowStatus);

// Obtenir les statistiques de suivi
router.get("/:userId/stats", authenticateToken, getFollowStats);

export default router;

