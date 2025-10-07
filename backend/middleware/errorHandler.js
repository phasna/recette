// Middleware de gestion globale des erreurs
const errorHandler = (err, req, res, next) => {
  console.error("Erreur:", err);

  // Erreur de validation
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Erreur de validation",
      details: err.message,
    });
  }

  // Erreur de base de données
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: "Conflit de données",
      message: "Cette ressource existe déjà",
    });
  }

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      error: "Référence invalide",
      message: "La ressource référencée n'existe pas",
    });
  }

  // Erreur de connexion à la base de données
  if (err.code === "ECONNREFUSED" || err.code === "ER_ACCESS_DENIED_ERROR") {
    return res.status(503).json({
      error: "Service indisponible",
      message: "Impossible de se connecter à la base de données",
    });
  }

  // Erreur par défaut
  res.status(500).json({
    error: "Erreur interne du serveur",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Une erreur est survenue",
  });
};

// Middleware pour les routes non trouvées
const notFound = (req, res) => {
  res.status(404).json({
    error: "Route non trouvée",
    message: `La route ${req.method} ${req.path} n'existe pas`,
  });
};

export { errorHandler, notFound };
