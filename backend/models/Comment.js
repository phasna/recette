import db from "../database.js";

/**
 * Modèle de données pour les commentaires sur les recettes
 * Permet aux utilisateurs de commenter et noter les recettes partagées
 */
class Comment {
  constructor(data = {}) {
    this.id = data.id || null;
    this.recipe_id = data.recipe_id || null;
    this.user_id = data.user_id || null;
    this.comment_text = data.comment_text || "";
    this.rating = data.rating || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  /**
   * Valider les données du commentaire
   * @returns {Object} Résultat de la validation
   */
  validate() {
    const errors = [];

    if (!this.comment_text || this.comment_text.trim() === "") {
      errors.push({
        field: "comment_text",
        message: "Le commentaire ne peut pas être vide",
      });
    }

    if (this.comment_text.length > 1000) {
      errors.push({
        field: "comment_text",
        message: "Le commentaire ne peut pas dépasser 1000 caractères",
      });
    }

    if (this.rating !== null && (this.rating < 1 || this.rating > 5)) {
      errors.push({
        field: "rating",
        message: "La note doit être entre 1 et 5",
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Créer un nouveau commentaire
   * @returns {Promise} Promise avec l'ID du commentaire créé
   */
  async create() {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO recipe_comments (recipe_id, user_id, comment_text, rating)
        VALUES (?, ?, ?, ?)
      `;

      const values = [
        this.recipe_id,
        this.user_id,
        this.comment_text,
        this.rating,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          this.id = result.insertId;
          resolve(result.insertId);
        }
      });
    });
  }

  /**
   * Mettre à jour un commentaire
   * @returns {Promise} Promise avec le résultat de la mise à jour
   */
  async update() {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE recipe_comments 
        SET comment_text = ?, rating = ?
        WHERE id = ?
      `;

      const values = [this.comment_text, this.rating, this.id];

      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Supprimer un commentaire
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  async delete() {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM recipe_comments WHERE id = ?";

      db.query(query, [this.id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Récupérer les commentaires d'une recette
   * @param {number} recipeId - ID de la recette
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des commentaires
   */
  static async findByRecipe(recipeId, limit = 50) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          rc.*,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          u.cooking_level,
          u.total_badges,
          (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = rc.id) as likes_count
        FROM recipe_comments rc
        JOIN users u ON rc.user_id = u.id
        WHERE rc.recipe_id = ?
        ORDER BY rc.created_at DESC
        LIMIT ?
      `;

      db.query(query, [recipeId, limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Récupérer les commentaires d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des commentaires
   */
  static async findByUser(userId, limit = 50) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          rc.*,
          r.title as recipe_title,
          r.user_id as recipe_author_id,
          (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = rc.id) as likes_count
        FROM recipe_comments rc
        JOIN recipes r ON rc.recipe_id = r.id
        WHERE rc.user_id = ?
        ORDER BY rc.created_at DESC
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
   * Récupérer un commentaire par ID
   * @param {number} id - ID du commentaire
   * @returns {Promise<Comment|null>} Commentaire ou null
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          rc.*,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          u.cooking_level,
          u.total_badges,
          (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = rc.id) as likes_count
        FROM recipe_comments rc
        JOIN users u ON rc.user_id = u.id
        WHERE rc.id = ?
      `;

      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]); // Retourne l'objet complet au lieu de new Comment()
        }
      });
    });
  }

  /**
   * Liker un commentaire
   * @param {number} commentId - ID du commentaire
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Promise avec le résultat
   */
  static async like(commentId, userId) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO comment_likes (comment_id, user_id)
        VALUES (?, ?)
      `;

      db.query(query, [commentId, userId], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            reject(new Error("Vous avez déjà liké ce commentaire"));
          } else {
            reject(err);
          }
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  /**
   * Retirer le like d'un commentaire
   * @param {number} commentId - ID du commentaire
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Promise avec le résultat
   */
  static async unlike(commentId, userId) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM comment_likes 
        WHERE comment_id = ? AND user_id = ?
      `;

      db.query(query, [commentId, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  /**
   * Vérifier si un utilisateur a liké un commentaire
   * @param {number} commentId - ID du commentaire
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} True si liké
   */
  static async hasLiked(commentId, userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id FROM comment_likes 
        WHERE comment_id = ? AND user_id = ?
      `;

      db.query(query, [commentId, userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Obtenir les statistiques d'une recette (commentaires et notes)
   * @param {number} recipeId - ID de la recette
   * @returns {Promise<Object>} Statistiques
   */
  static async getRecipeStats(recipeId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) as comments_count,
          AVG(rating) as average_rating,
          COUNT(DISTINCT user_id) as unique_commenters
        FROM recipe_comments
        WHERE recipe_id = ?
      `;

      db.query(query, [recipeId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  /**
   * Récupérer les commentaires récents de la communauté
   * @param {number} limit - Limite de résultats
   * @returns {Promise<Array>} Liste des commentaires récents
   */
  static async getRecentCommunityComments(limit = 20) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          rc.*,
          u.username,
          u.first_name,
          u.last_name,
          u.avatar_url,
          u.cooking_level,
          r.title as recipe_title,
          r.id as recipe_id,
          (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = rc.id) as likes_count
        FROM recipe_comments rc
        JOIN users u ON rc.user_id = u.id
        JOIN recipes r ON rc.recipe_id = r.id
        WHERE r.is_shared = 1
        ORDER BY rc.created_at DESC
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
}

export default Comment;
