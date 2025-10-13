import express from "express";
import {
  getTopRecipes,
  getTopUsers,
  getCommunityStats,
  getFeed,
  searchUsers,
  getMonthlyTrends,
} from "../controllers/communityController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * Routes pour les fonctionnalités générales de la communauté
 */

// Récupérer les statistiques globales de la communauté (public)
router.get("/stats", getCommunityStats);

// Récupérer les recettes les plus populaires (public)
router.get("/recipes/top", getTopRecipes);

// Récupérer les utilisateurs les plus actifs (public)
router.get("/users/top", getTopUsers);

// Rechercher des utilisateurs (public)
router.get("/users/search", searchUsers);

// Récupérer les tendances du mois (public)
router.get("/trends/monthly", getMonthlyTrends);

// Récupérer le fil d'actualité personnalisé (authentifié)
router.get("/feed", authenticateToken, getFeed);

export default router;

