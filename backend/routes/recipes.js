import express from "express";
import { validateRecipe, validateId } from "../middleware/validation.js";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

// GET - Récupérer toutes les recettes
router.get("/", recipeController.getAllRecipes);

// GET - Récupérer une recette par ID
router.get("/:id", validateId, recipeController.getRecipeById);

// POST - Créer une nouvelle recette
router.post("/", validateRecipe, recipeController.createRecipe);

// PUT - Mettre à jour une recette
router.put("/:id", validateId, validateRecipe, recipeController.updateRecipe);

// DELETE - Supprimer une recette
router.delete("/:id", validateId, recipeController.deleteRecipe);

// POST - Partager une recette
router.post("/:id/share", validateId, recipeController.shareRecipe);

// GET - Récupérer les recettes partagées
router.get("/shared/public", recipeController.getSharedRecipes);

export default router;
