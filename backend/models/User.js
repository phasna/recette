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
      avatar_url: this.avatar_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default User;
