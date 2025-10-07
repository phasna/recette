import express from "express";
import userController from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Routes publiques
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// Routes protégées (nécessitent une authentification)
router.get("/profile", authenticateToken, userController.getProfile);
router.put("/profile", authenticateToken, userController.updateUser);
router.delete("/profile", authenticateToken, userController.deleteUser);

// Routes admin (pour l'instant, pas de protection admin)
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

export default router;
