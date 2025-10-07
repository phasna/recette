import express from "express";
import favoriteController from "../controllers/favoriteController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authenticateToken);

// Ajouter une recette aux favoris
router.post("/", favoriteController.addToFavorites);
router.post("/add/:recipeId", favoriteController.addToFavorites);

// Supprimer une recette des favoris
router.delete("/:recipeId", favoriteController.removeFromFavorites);
router.post("/remove/:recipeId", favoriteController.removeFromFavorites);

// Vérifier si une recette est dans les favoris
router.get("/check/:recipeId", favoriteController.checkFavoriteStatus);

// Récupérer les favoris d'un utilisateur
router.get("/", favoriteController.getUserFavorites);

export default router;
