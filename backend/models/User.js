import db from "../database.js";

/**
 * Modèle de données pour un utilisateur
 * Classe orientée objet avec validation et méthodes utilitaires
 */
class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.username = data.username || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.first_name = data.first_name || "";
    this.last_name = data.last_name || "";
    this.country = data.country || "";
    this.avatar_url = data.avatar_url || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  /**
   * Valider les données de l'utilisateur
   * @returns {Object} Résultat de la validation
   */
  validate() {
    const errors = [];

    // Validation du nom d'utilisateur
    if (!this.username || this.username.trim() === "") {
      errors.push({
        field: "username",
        message: "Le nom d'utilisateur est requis",
      });
    } else if (this.username.length < 3) {
      errors.push({
        field: "username",
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
      });
    } else if (this.username.length > 50) {
      errors.push({
        field: "username",
        message: "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
      });
    }

    // Validation de l'email
    if (!this.email || this.email.trim() === "") {
      errors.push({
        field: "email",
        message: "L'email est requis",
      });
    } else if (!this.isValidEmail(this.email)) {
      errors.push({
        field: "email",
        message: "L'email n'est pas valide",
      });
    }

    // Validation du mot de passe
    if (!this.password || this.password.trim() === "") {
      errors.push({
        field: "password",
        message: "Le mot de passe est requis",
      });
    } else if (this.password.length < 6) {
      errors.push({
        field: "password",
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    // Validation du prénom
    if (this.first_name && this.first_name.length > 50) {
      errors.push({
        field: "first_name",
        message: "Le prénom ne peut pas dépasser 50 caractères",
      });
    }

    // Validation du nom de famille
    if (this.last_name && this.last_name.length > 50) {
      errors.push({
        field: "last_name",
        message: "Le nom de famille ne peut pas dépasser 50 caractères",
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Valider l'email
   * @param {string} email - Email à valider
   * @returns {boolean} True si l'email est valide
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Cloner l'utilisateur
   * @returns {User} Nouvelle instance de User
   */
  clone() {
    return new User({
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      country: this.country,
      avatar_url: this.avatar_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    });
  }

  /**
   * Obtenir le nom complet
   * @returns {string} Nom complet de l'utilisateur
   */
  getFullName() {
    if (this.first_name && this.last_name) {
      return `${this.first_name} ${this.last_name}`;
    } else if (this.first_name) {
      return this.first_name;
    } else if (this.last_name) {
      return this.last_name;
    } else {
      return this.username;
    }
  }

  /**
   * Obtenir les initiales
   * @returns {string} Initiales de l'utilisateur
   */
  getInitials() {
    let initials = "";
    if (this.first_name) {
      initials += this.first_name.charAt(0).toUpperCase();
    }
    if (this.last_name) {
      initials += this.last_name.charAt(0).toUpperCase();
    }
    if (!initials && this.username) {
      initials = this.username.charAt(0).toUpperCase();
    }
    return initials;
  }

  /**
   * Obtenir les données publiques (sans mot de passe)
   * @returns {Object} Données publiques de l'utilisateur
   */
  getPublicData() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      country: this.country,
      avatar_url: this.avatar_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  /**
   * Convertir en objet JSON
   * @returns {Object} Représentation JSON de l'utilisateur
   */
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      country: this.country,
      avatar_url: this.avatar_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  /**
   * Créer un nouvel utilisateur dans la base de données
   * @param {string} hashedPassword - Mot de passe hashé
   * @returns {Promise} Promise avec l'ID de l'utilisateur créé
   */
  async create(hashedPassword) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (username, email, password, first_name, last_name, country, avatar_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        this.username,
        this.email,
        hashedPassword,
        this.first_name,
        this.last_name,
        this.country,
        this.avatar_url,
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
   * Mettre à jour un utilisateur dans la base de données
   * @param {string|null} hashedPassword - Mot de passe hashé (optionnel)
   * @returns {Promise} Promise avec le résultat de la mise à jour
   */
  async update(hashedPassword = null) {
    return new Promise((resolve, reject) => {
      let query = `
        UPDATE users 
        SET username = ?, email = ?, first_name = ?, last_name = ?, country = ?, avatar_url = ?
      `;
      let values = [
        this.username,
        this.email,
        this.first_name,
        this.last_name,
        this.country,
        this.avatar_url,
      ];

      if (hashedPassword) {
        query += ", password = ?";
        values.push(hashedPassword);
      }

      query += " WHERE id = ?";
      values.push(this.id);

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
   * Supprimer un utilisateur de la base de données
   * @returns {Promise} Promise avec le résultat de la suppression
   */
  async delete() {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id = ?";

      const db = require("../database.js").default;
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
   * Récupérer un utilisateur par ID (méthode statique)
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<User|null>} Promise avec l'utilisateur ou null
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT id, username, email, first_name, last_name, country, avatar_url, created_at FROM users WHERE id = ?";

      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          resolve(new User(results[0]));
        }
      });
    });
  }

  /**
   * Récupérer un utilisateur par username ou email (méthode statique)
   * @param {string} loginField - Username ou email
   * @returns {Promise<User|null>} Promise avec l'utilisateur ou null (inclut le mot de passe)
   */
  static async findByLoginField(loginField) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ? OR email = ?";

      db.query(query, [loginField, loginField], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          resolve(new User(results[0]));
        }
      });
    });
  }

  /**
   * Vérifier si un utilisateur existe déjà avec le même username ou email (méthode statique)
   * @param {string} username - Username
   * @param {string} email - Email
   * @returns {Promise<boolean>} Promise avec true si l'utilisateur existe
   */
  static async exists(username, email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM users WHERE username = ? OR email = ?";

      db.query(query, [username, email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  /**
   * Récupérer tous les utilisateurs (méthode statique)
   * @returns {Promise<Array>} Promise avec la liste des utilisateurs
   */
  static async findAll() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT id, username, email, first_name, last_name, country, avatar_url, created_at FROM users ORDER BY created_at DESC";

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.map((user) => new User(user)));
        }
      });
    });
  }
}

export default User;
