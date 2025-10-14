import Follow from "../models/Follow.js";

/**
 * Contrôleur pour gérer les relations de suivi entre utilisateurs
 */

/**
 * Suivre un utilisateur
 */
export const followUser = async (req, res) => {
  try {
    const { userId } = req.body; // ID de l'utilisateur à suivre
    const followerId = req.user.userId; // ID de l'utilisateur connecté (depuis le middleware auth)

    // Vérifier qu'on ne se suit pas soi-même
    if (followerId === userId) {
      return res.status(400).json({
        error: "Vous ne pouvez pas vous suivre vous-même",
      });
    }

    const follow = new Follow({
      follower_id: followerId,
      followed_id: userId,
    });

    await follow.create();

    res.status(201).json({
      message: "Vous suivez maintenant cet utilisateur",
      success: true,
    });
  } catch (error) {
    console.error("Erreur lors du suivi:", error);
    res.status(500).json({
      error: error.message || "Erreur lors du suivi de l'utilisateur",
    });
  }
};

/**
 * Ne plus suivre un utilisateur
 */
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID de l'utilisateur à ne plus suivre
    const followerId = req.user.userId;

    const success = await Follow.unfollow(followerId, parseInt(userId));

    if (success) {
      res.json({
        message: "Vous ne suivez plus cet utilisateur",
        success: true,
      });
    } else {
      res.status(404).json({
        error: "Relation de suivi non trouvée",
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'arrêt du suivi:", error);
    res.status(500).json({
      error: "Erreur lors de l'arrêt du suivi",
    });
  }
};

/**
 * Récupérer les abonnés (followers) d'un utilisateur
 */
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const followers = await Follow.getFollowers(parseInt(userId), limit);

    res.json({
      followers,
      count: followers.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des followers:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des abonnés",
    });
  }
};

/**
 * Récupérer les abonnements (following) d'un utilisateur
 */
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const following = await Follow.getFollowing(parseInt(userId), limit);

    res.json({
      following,
      count: following.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des abonnements",
    });
  }
};

/**
 * Récupérer les utilisateurs suggérés
 */
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;

    const suggestions = await Follow.getSuggestedUsers(userId, limit);

    res.json({
      suggestions,
      count: suggestions.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des suggestions",
    });
  }
};

/**
 * Vérifier si l'utilisateur connecté suit un autre utilisateur
 */
export const checkFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.userId;

    const isFollowing = await Follow.isFollowing(followerId, parseInt(userId));

    res.json({
      isFollowing,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    res.status(500).json({
      error: "Erreur lors de la vérification du statut de suivi",
    });
  }
};

/**
 * Obtenir les statistiques de suivi d'un utilisateur
 */
export const getFollowStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await Follow.getFollowStats(parseInt(userId));

    res.json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};
