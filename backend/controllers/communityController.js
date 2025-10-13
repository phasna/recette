import db from "../database.js";

/**
 * Contrôleur pour gérer les fonctionnalités générales de la communauté
 * Classements, statistiques, découverte, etc.
 */

/**
 * Récupérer les recettes les plus populaires
 */
export const getTopRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const period = req.query.period || "all"; // all, month, week

    let dateFilter = "";
    if (period === "month") {
      dateFilter = "AND r.shared_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
    } else if (period === "week") {
      dateFilter = "AND r.shared_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)";
    }

    const query = `
      SELECT 
        r.id,
        r.title,
        r.description,
        r.difficulty,
        r.created_at,
        r.shared_at,
        r.user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.avatar_url,
        rs.views_count,
        rs.favorites_count,
        rs.comments_count,
        rs.average_rating,
        (rs.favorites_count * 3 + rs.comments_count * 2 + rs.views_count * 0.1) as popularity_score
      FROM recipes r
      JOIN users u ON r.user_id = u.id
      JOIN recipe_stats rs ON r.id = rs.recipe_id
      WHERE r.is_shared = 1
      ${dateFilter}
      ORDER BY popularity_score DESC
      LIMIT ?
    `;

    db.query(query, [limit], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des recettes:", err);
        return res.status(500).json({
          error: "Erreur lors de la récupération des recettes populaires",
        });
      }

      res.json({
        recipes: results,
        count: results.length,
        period,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des recettes populaires",
    });
  }
};

/**
 * Récupérer les utilisateurs les plus actifs
 */
export const getTopUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const sortBy = req.query.sortBy || "score"; // score, recipes, followers, badges

    let orderBy = "u.community_score DESC";
    if (sortBy === "recipes") {
      orderBy = "u.total_recipes DESC";
    } else if (sortBy === "followers") {
      orderBy = "u.total_followers DESC";
    } else if (sortBy === "badges") {
      orderBy = "u.total_badges DESC";
    }

    const query = `
      SELECT 
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.avatar_url,
        u.cooking_level,
        u.total_recipes,
        u.total_followers,
        u.total_following,
        u.total_badges,
        u.community_score,
        COUNT(DISTINCT ub.badge_id) as badges_earned,
        (SELECT COUNT(*) FROM recipe_comments WHERE user_id = u.id) as comments_count
      FROM users u
      LEFT JOIN user_badges ub ON u.id = ub.user_id
      WHERE u.total_recipes > 0 OR u.total_followers > 0
      GROUP BY u.id
      ORDER BY ${orderBy}
      LIMIT ?
    `;

    db.query(query, [limit], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs:", err);
        return res.status(500).json({
          error: "Erreur lors de la récupération des utilisateurs",
        });
      }

      res.json({
        users: results,
        count: results.length,
        sortBy,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des utilisateurs",
    });
  }
};

/**
 * Récupérer les statistiques globales de la communauté
 */
export const getCommunityStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM users WHERE total_recipes > 0) as active_users,
        (SELECT COUNT(*) FROM recipes WHERE is_shared = 1) as shared_recipes,
        (SELECT COUNT(*) FROM recipe_comments) as total_comments,
        (SELECT COUNT(*) FROM user_follows) as total_follows,
        (SELECT COUNT(*) FROM user_badges) as total_badges_earned,
        (SELECT AVG(average_rating) FROM recipe_stats WHERE average_rating > 0) as average_global_rating
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des statistiques:", err);
        return res.status(500).json({
          error: "Erreur lors de la récupération des statistiques",
        });
      }

      res.json(results[0]);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};

/**
 * Récupérer le fil d'actualité de l'utilisateur
 */
export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    // Récupérer les recettes des utilisateurs suivis + les recettes populaires
    const query = `
      (
        SELECT 
          r.id,
          r.title,
          r.description,
          r.difficulty,
          r.created_at,
          r.shared_at,
          r.user_id,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          rs.favorites_count,
          rs.comments_count,
          rs.average_rating,
          'following' as source
        FROM recipes r
        JOIN users u ON r.user_id = u.id
        JOIN recipe_stats rs ON r.id = rs.recipe_id
        WHERE r.is_shared = 1
        AND r.user_id IN (
          SELECT followed_id FROM user_follows WHERE follower_id = ?
        )
      )
      UNION
      (
        SELECT 
          r.id,
          r.title,
          r.description,
          r.difficulty,
          r.created_at,
          r.shared_at,
          r.user_id,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          rs.favorites_count,
          rs.comments_count,
          rs.average_rating,
          'popular' as source
        FROM recipes r
        JOIN users u ON r.user_id = u.id
        JOIN recipe_stats rs ON r.id = rs.recipe_id
        WHERE r.is_shared = 1
        AND r.user_id != ?
        AND r.user_id NOT IN (
          SELECT followed_id FROM user_follows WHERE follower_id = ?
        )
        ORDER BY (rs.favorites_count * 3 + rs.comments_count * 2) DESC
        LIMIT 10
      )
      ORDER BY shared_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(
      query,
      [userId, userId, userId, limit, offset],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération du feed:", err);
          return res.status(500).json({
            error: "Erreur lors de la récupération du fil d'actualité",
          });
        }

        res.json({
          feed: results,
          count: results.length,
          offset,
          limit,
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération du feed:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération du fil d'actualité",
    });
  }
};

/**
 * Rechercher des utilisateurs
 */
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const limit = parseInt(req.query.limit) || 20;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        error: "Veuillez fournir un terme de recherche",
      });
    }

    const searchQuery = `
      SELECT 
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.avatar_url,
        u.cooking_level,
        u.total_recipes,
        u.total_followers,
        u.total_badges,
        u.community_score
      FROM users u
      WHERE 
        u.username LIKE ? OR
        u.first_name LIKE ? OR
        u.last_name LIKE ?
      ORDER BY u.community_score DESC
      LIMIT ?
    `;

    const searchTerm = `%${query}%`;

    db.query(
      searchQuery,
      [searchTerm, searchTerm, searchTerm, limit],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la recherche:", err);
          return res.status(500).json({
            error: "Erreur lors de la recherche d'utilisateurs",
          });
        }

        res.json({
          users: results,
          count: results.length,
          query,
        });
      }
    );
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    res.status(500).json({
      error: "Erreur lors de la recherche d'utilisateurs",
    });
  }
};

/**
 * Obtenir les tendances du mois
 */
export const getMonthlyTrends = async (req, res) => {
  try {
    // Récupérer les recettes les plus populaires du mois
    const recipesQuery = `
      SELECT 
        r.id,
        r.title,
        rs.favorites_count,
        rs.comments_count,
        rs.average_rating
      FROM recipes r
      JOIN recipe_stats rs ON r.id = rs.recipe_id
      WHERE r.is_shared = 1
      AND r.shared_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
      ORDER BY (rs.favorites_count * 3 + rs.comments_count * 2) DESC
      LIMIT 5
    `;

    // Récupérer les utilisateurs les plus actifs du mois
    const usersQuery = `
      SELECT 
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.avatar_url,
        COUNT(r.id) as recipes_this_month
      FROM users u
      JOIN recipes r ON u.id = r.user_id
      WHERE r.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
      GROUP BY u.id
      ORDER BY recipes_this_month DESC
      LIMIT 5
    `;

    db.query(recipesQuery, (err1, topRecipes) => {
      if (err1) {
        console.error("Erreur lors de la récupération des tendances:", err1);
        return res.status(500).json({
          error: "Erreur lors de la récupération des tendances",
        });
      }

      db.query(usersQuery, (err2, topUsers) => {
        if (err2) {
          console.error(
            "Erreur lors de la récupération des tendances:",
            err2
          );
          return res.status(500).json({
            error: "Erreur lors de la récupération des tendances",
          });
        }

        res.json({
          topRecipes,
          topUsers,
          period: "month",
        });
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des tendances:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des tendances",
    });
  }
};

