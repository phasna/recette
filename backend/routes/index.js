import express from "express";
import recipesRoutes from "./recipes.js";
import usersRoutes from "./users.js";
import favoritesRoutes from "./favorites.js";
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
