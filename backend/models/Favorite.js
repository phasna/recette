import db from "../database.js";

/**
 * Modèle de données pour les favoris
 * Classe orientée objet avec méthodes CRUD
 */
class Favorite {
  constructor(data = {}) {
    this.id = data.id || null;
    this.user_id = data.user_id || null;
    this.recipe_id = data.recipe_id || null;
    this.created_at = data.created_at || null;
  }

  /**
   * Ajouter une recette aux favoris
   * @returns {Promise} Promise avec l'ID du favori créé
   */
  async add() {
    return new Promise((resolve, reject) => {
      // Vérifier si déjà dans les favoris
      const checkQuery =
        "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?";

      db.query(checkQuery, [this.user_id, this.recipe_id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length > 0) {
          reject(new Error("ALREADY_EXISTS"));
        } else {
          // Ajouter aux favoris
          const insertQuery =
            "INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)";

          db.query(
            insertQuery,
            [this.user_id, this.recipe_id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                this.id = result.insertId;
                resolve(result.insertId);
              }
            }
          );
        }
      });
    });
  }

  /**
   * Supprimer une recette des favoris
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  async remove() {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?";

      db.query(query, [this.user_id, this.recipe_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Vérifier si une recette est dans les favoris d'un utilisateur (méthode statique)
   * @param {number} userId - ID de l'utilisateur
   * @param {number} recipeId - ID de la recette
   * @returns {Promise<boolean>} Promise avec true si la recette est dans les favoris
   */
  static async isFavorite(userId, recipeId) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?";

      db.query(query, [userId, recipeId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Récupérer tous les favoris d'un utilisateur (méthode statique)
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} Promise avec la liste des recettes favorites
   */
  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT r.*, u.username, u.first_name, u.last_name, f.created_at as favorited_at
        FROM favorites f
        JOIN recipes r ON f.recipe_id = r.id
        LEFT JOIN users u ON r.user_id = u.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
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
   * Vérifier si une recette existe avant de l'ajouter aux favoris (méthode statique)
   * @param {number} recipeId - ID de la recette
   * @returns {Promise<boolean>} Promise avec true si la recette existe
   */
  static async recipeExists(recipeId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM recipes WHERE id = ?";

      db.query(query, [recipeId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Récupérer un favori par ID (méthode statique)
   * @param {number} id - ID du favori
   * @returns {Promise<Favorite|null>} Promise avec le favori ou null
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM favorites WHERE id = ?";

      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          resolve(new Favorite(results[0]));
        }
      });
    });
  }

  /**
   * Supprimer tous les favoris d'une recette (méthode statique)
   * Utile lors de la suppression d'une recette
   * @param {number} recipeId - ID de la recette
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  static async deleteByRecipeId(recipeId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM favorites WHERE recipe_id = ?";

      db.query(query, [recipeId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Supprimer tous les favoris d'un utilisateur (méthode statique)
   * Utile lors de la suppression d'un compte utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  static async deleteByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM favorites WHERE user_id = ?";

      db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Convertir en objet JSON
   * @returns {Object} Représentation JSON du favori
   */
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      recipe_id: this.recipe_id,
      created_at: this.created_at,
    };
  }
}

export default Favorite;
