import Badge from "../models/Badge.js";

/**
 * Contrôleur pour gérer les badges et niveaux de cuisinier
 */

/**
 * Récupérer tous les badges disponibles
 */
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll();

    res.json({
      badges,
      count: badges.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des badges",
    });
  }
};

/**
 * Récupérer les badges d'un utilisateur
 */
export const getUserBadges = async (req, res) => {
  try {
    const { userId } = req.params;

    const badges = await Badge.findByUser(parseInt(userId));

    res.json({
      badges,
      count: badges.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des badges de l'utilisateur",
    });
  }
};

/**
 * Vérifier et attribuer automatiquement les badges à un utilisateur
 */
export const checkBadges = async (req, res) => {
  try {
    const userId = req.user.userId;

    const newBadges = await Badge.checkAndAwardBadges(userId);

    res.json({
      message:
        newBadges.length > 0
          ? "Félicitations ! Vous avez gagné de nouveaux badges"
          : "Aucun nouveau badge",
      newBadges,
      count: newBadges.length,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification des badges:", error);
    res.status(500).json({
      error: "Erreur lors de la vérification des badges",
    });
  }
};

/**
 * Obtenir les statistiques des badges d'un utilisateur
 */
export const getUserBadgeStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await Badge.getUserBadgeStats(parseInt(userId));

    res.json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des statistiques des badges",
    });
  }
};

/**
 * Obtenir les prochains badges à débloquer
 */
export const getNextBadges = async (req, res) => {
  try {
    const userId = req.user.userId;

    const nextBadges = await Badge.getNextBadgesToUnlock(userId);

    res.json({
      nextBadges,
      count: nextBadges.length,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prochains badges:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des prochains badges",
    });
  }
};

/**
 * Obtenir le classement des utilisateurs par badges
 */
export const getTopUsersByBadges = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topUsers = await Badge.getTopUsersByBadges(limit);

    res.json({
      topUsers,
      count: topUsers.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération du classement",
    });
  }
};

/**
 * Obtenir les badges groupés par catégorie
 */
export const getBadgesByCategory = async (req, res) => {
  try {
    const badgesByCategory = await Badge.getBadgesByCategory();

    res.json(badgesByCategory);
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des badges par catégorie",
    });
  }
};
