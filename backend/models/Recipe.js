import db from "../database.js";

/**
 * Modèle de données pour une recette
 * Classe orientée objet avec validation et méthodes CRUD
 */
class Recipe {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || "";
    this.description = data.description || "";
    this.ingredients = data.ingredients || "";
    this.instructions = data.instructions || "";
    this.prep_time = data.prep_time || null;
    this.cook_time = data.cook_time || null;
    this.servings = data.servings || null;
    this.difficulty = data.difficulty || "Facile";
    this.user_id = data.user_id || null;
    this.is_shared = data.is_shared || 0;
    this.share_message = data.share_message || null;
    this.allow_comments = data.allow_comments || 0;
    this.show_author_info = data.show_author_info || 0;
    this.shared_at = data.shared_at || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  /**
   * Valider les données de la recette
   * @returns {Object} Résultat de la validation
   */
  validate() {
    const errors = [];

    // Validation du titre
    if (!this.title || this.title.trim() === "") {
      errors.push({
        field: "title",
        message: "Le titre est requis",
      });
    } else if (this.title.length > 255) {
      errors.push({
        field: "title",
        message: "Le titre ne peut pas dépasser 255 caractères",
      });
    }

    // Validation des ingrédients
    if (!this.ingredients || this.ingredients.trim() === "") {
      errors.push({
        field: "ingredients",
        message: "Les ingrédients sont requis",
      });
    }

    // Validation des instructions
    if (!this.instructions || this.instructions.trim() === "") {
      errors.push({
        field: "instructions",
        message: "Les instructions sont requises",
      });
    }

    // Validation de la difficulté
    const validDifficulties = ["Facile", "Moyen", "Difficile"];
    if (this.difficulty && !validDifficulties.includes(this.difficulty)) {
      errors.push({
        field: "difficulty",
        message: "La difficulté doit être Facile, Moyen ou Difficile",
      });
    }

    // Validation des temps (doivent être positifs si fournis)
    if (this.prep_time !== null && this.prep_time < 0) {
      errors.push({
        field: "prep_time",
        message: "Le temps de préparation doit être positif",
      });
    }

    if (this.cook_time !== null && this.cook_time < 0) {
      errors.push({
        field: "cook_time",
        message: "Le temps de cuisson doit être positif",
      });
    }

    if (this.servings !== null && this.servings < 1) {
      errors.push({
        field: "servings",
        message: "Le nombre de portions doit être au moins 1",
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Créer une nouvelle recette dans la base de données
   * @returns {Promise} Promise avec l'ID de la recette créée
   */
  async create() {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        this.title,
        this.description || "",
        this.ingredients,
        this.instructions,
        this.prep_time || null,
        this.cook_time || null,
        this.servings || null,
        this.difficulty || "Facile",
        this.user_id,
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
   * Mettre à jour une recette dans la base de données
   * @returns {Promise} Promise avec le résultat de la mise à jour
   */
  async update() {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE recipes 
        SET title = ?, description = ?, ingredients = ?, instructions = ?, 
            prep_time = ?, cook_time = ?, servings = ?, difficulty = ?
        WHERE id = ?
      `;

      const values = [
        this.title,
        this.description,
        this.ingredients,
        this.instructions,
        this.prep_time,
        this.cook_time,
        this.servings,
        this.difficulty,
        this.id,
      ];

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
   * Supprimer une recette de la base de données
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  async delete() {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM recipes WHERE id = ?";

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
   * Partager ou retirer une recette du partage public
   * @param {Object} shareOptions - Options de partage
   * @returns {Promise} Promise avec le résultat de la mise à jour
   */
  async share(shareOptions = {}) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE recipes 
        SET is_shared = ?, 
            share_message = ?, 
            allow_comments = ?, 
            show_author_info = ?,
            shared_at = NOW()
        WHERE id = ?
      `;

      const values = [
        shareOptions.showOnVisitorPage ? 1 : 0,
        shareOptions.shareMessage || null,
        shareOptions.allowComments ? 1 : 0,
        shareOptions.showAuthorInfo ? 1 : 0,
        this.id,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Mettre à jour les propriétés de l'instance
          this.is_shared = shareOptions.showOnVisitorPage ? 1 : 0;
          this.share_message = shareOptions.shareMessage || null;
          this.allow_comments = shareOptions.allowComments ? 1 : 0;
          this.show_author_info = shareOptions.showAuthorInfo ? 1 : 0;
          resolve(result);
        }
      });
    });
  }

  /**
   * Récupérer une recette par ID (méthode statique)
   * @param {number} id - ID de la recette
   * @returns {Promise<Recipe|null>} Promise avec la recette ou null
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT r.*, u.username, u.first_name, u.last_name 
        FROM recipes r 
        LEFT JOIN users u ON r.user_id = u.id 
        WHERE r.id = ?
      `;

      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          const recipe = new Recipe(results[0]);
          // Ajouter les informations de l'utilisateur
          recipe.username = results[0].username;
          recipe.first_name = results[0].first_name;
          recipe.last_name = results[0].last_name;
          resolve(recipe);
        }
      });
    });
  }

  /**
   * Récupérer toutes les recettes (méthode statique)
   * @param {number|null} userId - ID de l'utilisateur (optionnel)
   * @returns {Promise<Array>} Promise avec la liste des recettes
   */
  static async findAll(userId = null) {
    return new Promise((resolve, reject) => {
      let query =
        "SELECT r.*, u.username, u.first_name, u.last_name FROM recipes r LEFT JOIN users u ON r.user_id = u.id";
      let params = [];

      if (userId) {
        query += " WHERE r.user_id = ?";
        params = [userId];
      }

      query += " ORDER BY r.created_at DESC";

      db.query(query, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Récupérer toutes les recettes partagées (méthode statique)
   * @param {number} limit - Nombre maximum de recettes à récupérer
   * @returns {Promise<Array>} Promise avec la liste des recettes partagées
   */
  static async findShared(limit = 20) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT r.*, 
               u.username, 
               u.first_name, 
               u.last_name,
               r.share_message,
               r.shared_at
        FROM recipes r 
        LEFT JOIN users u ON r.user_id = u.id 
        WHERE r.is_shared = 1 
        ORDER BY r.shared_at DESC, r.created_at DESC
        LIMIT ?
      `;

      db.query(query, [limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Formater les résultats pour masquer certaines informations si nécessaire
          const formattedResults = results.map((recipe) => ({
            ...recipe,
            author_name: recipe.show_author_info
              ? `${recipe.first_name || ""} ${recipe.last_name || ""}`.trim() ||
                recipe.username
              : "Utilisateur anonyme",
            username: recipe.show_author_info ? recipe.username : null,
            first_name: recipe.show_author_info ? recipe.first_name : null,
            last_name: recipe.show_author_info ? recipe.last_name : null,
          }));
          resolve(formattedResults);
        }
      });
    });
  }

  /**
   * Vérifier si une recette appartient à un utilisateur
   * @param {number} recipeId - ID de la recette
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} Promise avec true si la recette appartient à l'utilisateur
   */
  static async belongsToUser(recipeId, userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT user_id FROM recipes WHERE id = ?";

      db.query(query, [recipeId], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(false);
        } else {
          resolve(results[0].user_id === userId);
        }
      });
    });
  }

  /**
   * Convertir en objet JSON
   * @returns {Object} Représentation JSON de la recette
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      ingredients: this.ingredients,
      instructions: this.instructions,
      prep_time: this.prep_time,
      cook_time: this.cook_time,
      servings: this.servings,
      difficulty: this.difficulty,
      user_id: this.user_id,
      is_shared: this.is_shared,
      share_message: this.share_message,
      allow_comments: this.allow_comments,
      show_author_info: this.show_author_info,
      shared_at: this.shared_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
      // Informations de l'utilisateur (si disponibles)
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  }
}

export default Recipe;
