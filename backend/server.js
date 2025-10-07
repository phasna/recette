/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";

// Import des middlewares
import { logger, errorLogger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Import des routes
import apiRoutes from "./routes/index.js";

const app = express();

// Middleware de base
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Middleware de logging
app.use(logger);

// Routes API
app.use("/api", apiRoutes);

// Middleware pour les routes non trouvées
app.use(notFound);

// Middleware de gestion des erreurs (doit être en dernier)
app.use(errorLogger);
app.use(errorHandler);

// Démarrer le serveur
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
  console.log(`🧪 Test de l'API: http://localhost:${PORT}/api/test`);
});

// Gestion des erreurs non capturées
process.on("uncaughtException", (err) => {
  console.error("Erreur non capturée:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesse rejetée non gérée:", reason);
  process.exit(1);
});
