import express from "express";
import {
  getAllBadges,
  getUserBadges,
  checkBadges,
  getUserBadgeStats,
  getNextBadges,
  getTopUsersByBadges,
  getBadgesByCategory,
} from "../controllers/badgeController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * Routes pour gérer les badges et niveaux de cuisinier
 */

// Récupérer tous les badges disponibles (public)
router.get("/", getAllBadges);

// Récupérer les badges groupés par catégorie (public)
router.get("/categories", getBadgesByCategory);

// Récupérer le classement des utilisateurs par badges (public)
router.get("/leaderboard", getTopUsersByBadges);

// Récupérer les badges d'un utilisateur (public)
router.get("/user/:userId", getUserBadges);

// Vérifier et attribuer les badges à l'utilisateur connecté (authentifié)
router.post("/check", authenticateToken, checkBadges);

// Obtenir les statistiques des badges de l'utilisateur (authentifié)
router.get("/user/:userId/stats", getUserBadgeStats);

// Obtenir les prochains badges à débloquer (authentifié)
router.get("/next", authenticateToken, getNextBadges);

export default router;

