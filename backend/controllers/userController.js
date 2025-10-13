import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const userController = {
  /**
   * Obtenir tous les utilisateurs (admin seulement)
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();

      res.json({
        success: true,
        data: users.map((user) => user.getPublicData()),
        count: users.length,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des utilisateurs",
        error: err.message,
      });
    }
  },

  /**
   * Obtenir un utilisateur par ID
   */
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        data: user.getPublicData(),
      });
    } catch (err) {
      console.error("Erreur lors de la récupération de l'utilisateur:", err);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de l'utilisateur",
        error: err.message,
      });
    }
  },

  /**
   * Créer un nouvel utilisateur (inscription)
   */
  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const user = new User(userData);

      // Validation
      const validation = user.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: validation.errors,
        });
      }

      // Vérifier si l'utilisateur existe déjà
      const userExists = await User.exists(user.username, user.email);
      if (userExists) {
        return res.status(409).json({
          success: false,
          message:
            "Un utilisateur avec ce nom d'utilisateur ou cet email existe déjà",
        });
      }

      // Hasher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Créer l'utilisateur
      const userId = await user.create(hashedPassword);

      // Générer un token JWT
      const token = jwt.sign(
        { userId: userId, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: user.getPublicData(),
        token: token,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      });
    }
  },

  /**
   * Connexion d'un utilisateur
   */
  loginUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if ((!username && !email) || !password) {
        return res.status(400).json({
          success: false,
          message: "Nom d'utilisateur/email et mot de passe requis",
        });
      }

      // Rechercher l'utilisateur par username ou email
      const loginField = username || email;
      const user = await User.findByLoginField(loginField);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }

      // Générer un token JWT
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Connexion réussie",
        data: user.getPublicData(),
        token: token,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la connexion",
        error: error.message,
      });
    }
  },

  /**
   * Mettre à jour un utilisateur
   */
  updateUser: async (req, res) => {
    try {
      const userId = req.user.userId; // Récupéré depuis le middleware d'authentification
      const userData = req.body;

      // Récupérer l'utilisateur existant
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Mettre à jour les propriétés
      user.username = userData.username || user.username;
      user.email = userData.email || user.email;
      user.first_name = userData.first_name || user.first_name;
      user.last_name = userData.last_name || user.last_name;
      user.country = userData.country || user.country;
      user.avatar_url = userData.avatar_url || user.avatar_url;

      // Validation
      const validation = user.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Données invalides",
          errors: validation.errors,
        });
      }

      // Hasher le mot de passe si fourni
      let hashedPassword = null;
      if (userData.password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      }

      // Mettre à jour l'utilisateur
      const result = await user.update(hashedPassword);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: user.getPublicData(),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error: error.message,
      });
    }
  },

  /**
   * Supprimer un utilisateur
   */
  deleteUser: async (req, res) => {
    try {
      const userId = req.user.userId; // Récupéré depuis le middleware d'authentification

      // Récupérer l'utilisateur existant
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Supprimer l'utilisateur
      const result = await user.delete();

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de l'utilisateur",
        error: err.message,
      });
    }
  },

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        data: user.getPublicData(),
      });
    } catch (err) {
      console.error("Erreur lors de la récupération du profil:", err);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du profil",
        error: err.message,
      });
    }
  },
};

export default userController;
