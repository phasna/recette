import db from "../database.js";

/**
 * Modèle de données pour les badges et niveaux de cuisinier
 * Système de gamification pour récompenser l'activité des utilisateurs
 */
class Badge {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.description = data.description || "";
    this.icon = data.icon || "";
    this.color = data.color || "gray";
    this.level = data.level || 1;
    this.requirement_type = data.requirement_type || "";
    this.requirement_value = data.requirement_value || 0;
    this.created_at = data.created_at || null;
  }

  /**
   * Récupérer tous les badges disponibles
   * @returns {Promise<Array>} Liste des badges
   */
  static async findAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM badges 
        ORDER BY requirement_type, level
      `;

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.map((badge) => new Badge(badge)));
        }
      });
    });
  }

  /**
   * Récupérer les badges d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} Liste des badges gagnés
   */
  static async findByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          b.*,
          ub.earned_at
        FROM user_badges ub
        JOIN badges b ON ub.badge_id = b.id
        WHERE ub.user_id = ?
        ORDER BY ub.earned_at DESC
      `;

      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Attribuer un badge à un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @param {number} badgeId - ID du badge
   * @returns {Promise} Promise avec le résultat
   */
  static async awardToUser(userId, badgeId) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (?, ?)
      `;

      db.query(query, [userId, badgeId], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            reject(new Error("L'utilisateur possède déjà ce badge"));
          } else {
            reject(err);
          }
        } else {
          // Mettre à jour le compteur de badges
          db.query(
            `UPDATE users 
             SET total_badges = (SELECT COUNT(*) FROM user_badges WHERE user_id = ?)
             WHERE id = ?`,
            [userId, userId]
          );
          resolve(result.insertId);
        }
      });
    });
  }

  /**
   * Vérifier et attribuer automatiquement les badges à un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} Liste des nouveaux badges gagnés
   */
  static async checkAndAwardBadges(userId) {
    return new Promise((resolve, reject) => {
      // Appeler la procédure stockée
      db.query("CALL check_and_award_badges(?)", [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Récupérer les badges qui viennent d'être gagnés (dernière minute)
          const query = `
            SELECT 
              b.*,
              ub.earned_at
            FROM user_badges ub
            JOIN badges b ON ub.badge_id = b.id
            WHERE ub.user_id = ?
            AND ub.earned_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
            ORDER BY ub.earned_at DESC
          `;

          db.query(query, [userId], (err2, newBadges) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(newBadges);
            }
          });
        }
      });
    });
  }

  /**
   * Obtenir les statistiques des badges d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Statistiques
   */
  static async getUserBadgeStats(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) as total_badges,
          COUNT(CASE WHEN b.color = 'bronze' THEN 1 END) as bronze_count,
          COUNT(CASE WHEN b.color = 'silver' THEN 1 END) as silver_count,
          COUNT(CASE WHEN b.color = 'gold' THEN 1 END) as gold_count,
          COUNT(CASE WHEN b.color = 'platinum' THEN 1 END) as platinum_count,
          COUNT(CASE WHEN b.color = 'diamond' THEN 1 END) as diamond_count,
          MAX(b.level) as highest_level
        FROM user_badges ub
        JOIN badges b ON ub.badge_id = b.id
        WHERE ub.user_id = ?
      `;

      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  /**
   * Obtenir le prochain badge à débloquer pour un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} Liste des prochains badges à débloquer
   */
  static async getNextBadgesToUnlock(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          b.*,
          CASE b.requirement_type
            WHEN 'recipes_count' THEN u.total_recipes
            WHEN 'followers_count' THEN u.total_followers
            WHEN 'following_count' THEN u.total_following
            WHEN 'comments_count' THEN (
              SELECT COUNT(*) FROM recipe_comments WHERE user_id = u.id
            )
            WHEN 'favorites_count' THEN (
              SELECT COUNT(*) FROM favorites WHERE user_id = u.id
            )
            ELSE 0
          END as current_progress,
          b.requirement_value as target,
          ROUND(
            (CASE b.requirement_type
              WHEN 'recipes_count' THEN u.total_recipes
              WHEN 'followers_count' THEN u.total_followers
              WHEN 'following_count' THEN u.total_following
              WHEN 'comments_count' THEN (
                SELECT COUNT(*) FROM recipe_comments WHERE user_id = u.id
              )
              WHEN 'favorites_count' THEN (
                SELECT COUNT(*) FROM favorites WHERE user_id = u.id
              )
              ELSE 0
            END / b.requirement_value * 100)
          ) as progress_percentage
        FROM badges b
        CROSS JOIN users u
        WHERE u.id = ?
        AND b.id NOT IN (
          SELECT badge_id FROM user_badges WHERE user_id = ?
        )
        HAVING current_progress < target
        ORDER BY b.requirement_type, b.level
        LIMIT 5
      `;

      db.query(query, [userId, userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Obtenir le classement des utilisateurs par nombre de badges
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Classement des utilisateurs
   */
  static async getTopUsersByBadges(limit = 10) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          u.id,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          u.cooking_level,
          u.total_badges,
          u.total_recipes,
          u.total_followers,
          u.community_score,
          COUNT(ub.badge_id) as badges_count,
          MAX(b.level) as highest_badge_level
        FROM users u
        LEFT JOIN user_badges ub ON u.id = ub.user_id
        LEFT JOIN badges b ON ub.badge_id = b.id
        WHERE u.total_badges > 0
        GROUP BY u.id
        ORDER BY u.total_badges DESC, u.community_score DESC
        LIMIT ?
      `;

      db.query(query, [limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Vérifier si un utilisateur possède un badge
   * @param {number} userId - ID de l'utilisateur
   * @param {number} badgeId - ID du badge
   * @returns {Promise<boolean>} True si l'utilisateur possède le badge
   */
  static async userHasBadge(userId, badgeId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id FROM user_badges 
        WHERE user_id = ? AND badge_id = ?
      `;

      db.query(query, [userId, badgeId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Obtenir les badges groupés par catégorie
   * @returns {Promise<Object>} Badges groupés
   */
  static async getBadgesByCategory() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          requirement_type,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', id,
              'name', name,
              'description', description,
              'icon', icon,
              'color', color,
              'level', level,
              'requirement_value', requirement_value
            )
          ) as badges
        FROM badges
        GROUP BY requirement_type
      `;

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const grouped = {};
          results.forEach((row) => {
            grouped[row.requirement_type] = JSON.parse(row.badges);
          });
          resolve(grouped);
        }
      });
    });
  }
}

export default Badge;

