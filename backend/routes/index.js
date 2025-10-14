import express from "express";
import recipesRoutes from "./recipes.js";
import usersRoutes from "./users.js";
import favoritesRoutes from "./favorites.js";
import followRoutes from "./follow.js";
import commentsRoutes from "./comments.js";
import badgesRoutes from "./badges.js";
import communityRoutes from "./community.js";
import fridgeAssistantRoutes from "./fridgeAssistant.js";
import { optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Middleware d'authentification optionnel pour toutes les routes
router.use(optionalAuth);

// Routes des recettes
router.use("/recipes", recipesRoutes);

// Routes pour les utilisateurs
router.use("/users", usersRoutes);

// Routes pour les favoris
router.use("/favorites", favoritesRoutes);

// Routes pour la dimension communautaire
router.use("/follow", followRoutes);
router.use("/comments", commentsRoutes);
router.use("/badges", badgesRoutes);
router.use("/community", communityRoutes);

// Routes pour l'Assistant Vide-Frigo
router.use("/fridge-assistant", fridgeAssistantRoutes);

// Route de test générale
router.get("/test", (req, res) => {
  res.json({
    message: "API fonctionne correctement",
    user: req.user
      ? `Connecté en tant que ${req.user.username}`
      : "Non connecté",
  });
});

export default router;
