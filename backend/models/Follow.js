import db from "../database.js";

/**
 * Modèle de données pour les relations de suivi entre utilisateurs
 * Gère le système de "follow" pour la dimension communautaire
 */
class Follow {
  constructor(data = {}) {
    this.id = data.id || null;
    this.follower_id = data.follower_id || null;
    this.followed_id = data.followed_id || null;
    this.created_at = data.created_at || null;
  }

  /**
   * Suivre un utilisateur
   * @returns {Promise} Promise avec l'ID de la relation créée
   */
  async create() {
    return new Promise((resolve, reject) => {
      // Vérifier qu'un utilisateur ne se suit pas lui-même
      if (this.follower_id === this.followed_id) {
        reject(new Error("Un utilisateur ne peut pas se suivre lui-même"));
        return;
      }

      const query = `
        INSERT INTO user_follows (follower_id, followed_id)
        VALUES (?, ?)
      `;

      db.query(query, [this.follower_id, this.followed_id], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            reject(new Error("Vous suivez déjà cet utilisateur"));
          } else {
            reject(err);
          }
        } else {
          this.id = result.insertId;
          resolve(result.insertId);
        }
      });
    });
  }

  /**
   * Ne plus suivre un utilisateur
   * @param {number} followerId - ID de l'utilisateur qui suit
   * @param {number} followedId - ID de l'utilisateur suivi
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  static async unfollow(followerId, followedId) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM user_follows 
        WHERE follower_id = ? AND followed_id = ?
      `;

      db.query(query, [followerId, followedId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  /**
   * Vérifier si un utilisateur en suit un autre
   * @param {number} followerId - ID de l'utilisateur qui suit
   * @param {number} followedId - ID de l'utilisateur suivi
   * @returns {Promise<boolean>} True si la relation existe
   */
  static async isFollowing(followerId, followedId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id FROM user_follows 
        WHERE follower_id = ? AND followed_id = ?
      `;

      db.query(query, [followerId, followedId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Récupérer les abonnés d'un utilisateur (followers)
   * @param {number} userId - ID de l'utilisateur
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des abonnés
   */
  static async getFollowers(userId, limit = 50) {
    return new Promise((resolve, reject) => {
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
          u.total_badges,
          uf.created_at as followed_since
        FROM user_follows uf
        JOIN users u ON uf.follower_id = u.id
        WHERE uf.followed_id = ?
        ORDER BY uf.created_at DESC
        LIMIT ?
      `;

      db.query(query, [userId, limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Récupérer les abonnements d'un utilisateur (following)
   * @param {number} userId - ID de l'utilisateur
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des utilisateurs suivis
   */
  static async getFollowing(userId, limit = 50) {
    return new Promise((resolve, reject) => {
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
          u.total_badges,
          uf.created_at as followed_since
        FROM user_follows uf
        JOIN users u ON uf.followed_id = u.id
        WHERE uf.follower_id = ?
        ORDER BY uf.created_at DESC
        LIMIT ?
      `;

      db.query(query, [userId, limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Récupérer les utilisateurs suggérés (non suivis et actifs)
   * @param {number} userId - ID de l'utilisateur actuel
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des utilisateurs suggérés
   */
  static async getSuggestedUsers(userId, limit = 10) {
    return new Promise((resolve, reject) => {
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
          u.total_badges,
          u.community_score
        FROM users u
        WHERE u.id != ?
        AND u.id NOT IN (
          SELECT followed_id FROM user_follows WHERE follower_id = ?
        )
        AND u.total_recipes > 0
        ORDER BY u.community_score DESC, u.total_followers DESC
        LIMIT ?
      `;

      db.query(query, [userId, userId, limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Obtenir le nombre d'abonnés et d'abonnements
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Objet avec followers_count et following_count
   */
  static async getFollowStats(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM user_follows WHERE followed_id = ?) as followers_count,
          (SELECT COUNT(*) FROM user_follows WHERE follower_id = ?) as following_count
      `;

      db.query(query, [userId, userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}

export default Follow;

