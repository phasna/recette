import express from "express";
import { searchByIngredients } from "../controllers/fridgeAssistantController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// POST - Rechercher des recettes par ingrédients
// Optionnel : authenticateToken si vous voulez que seuls les utilisateurs connectés puissent rechercher
router.post("/search", authenticateToken, searchByIngredients);

export default router;
