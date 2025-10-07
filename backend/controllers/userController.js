import db from "../database.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const userController = {
  /**
   * Obtenir tous les utilisateurs (admin seulement)
   */
  getAllUsers: (req, res) => {
    const query =
      "SELECT id, username, email, first_name, last_name, avatar_url, created_at FROM users ORDER BY created_at DESC";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur lors de la récupération des utilisateurs",
          error: err.message,
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length,
      });
    });
  },

  /**
   * Obtenir un utilisateur par ID
   */
  getUserById: (req, res) => {
    const { id } = req.params;
    const query =
      "SELECT id, username, email, first_name, last_name, avatar_url, created_at FROM users WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur lors de la récupération de l'utilisateur",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        data: results[0],
      });
    });
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
      const checkQuery = "SELECT id FROM users WHERE username = ? OR email = ?";
      db.query(
        checkQuery,
        [user.username, user.email],
        async (err, results) => {
          if (err) {
            console.error(
              "Erreur lors de la vérification de l'utilisateur:",
              err
            );
            return res.status(500).json({
              success: false,
              message: "Erreur lors de la vérification de l'utilisateur",
              error: err.message,
            });
          }

          if (results.length > 0) {
            return res.status(409).json({
              success: false,
              message:
                "Un utilisateur avec ce nom d'utilisateur ou cet email existe déjà",
            });
          }

          // Hasher le mot de passe
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);

          // Insérer l'utilisateur
          const insertQuery = `
          INSERT INTO users (username, email, password, first_name, last_name, avatar_url)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

          db.query(
            insertQuery,
            [
              user.username,
              user.email,
              hashedPassword,
              user.first_name,
              user.last_name,
              user.avatar_url,
            ],
            (err, result) => {
              if (err) {
                console.error(
                  "Erreur lors de la création de l'utilisateur:",
                  err
                );
                return res.status(500).json({
                  success: false,
                  message: "Erreur lors de la création de l'utilisateur",
                  error: err.message,
                });
              }

              // Générer un token JWT
              const token = jwt.sign(
                { userId: result.insertId, username: user.username },
                JWT_SECRET,
                { expiresIn: "7d" }
              );

              res.status(201).json({
                success: true,
                message: "Utilisateur créé avec succès",
                data: {
                  id: result.insertId,
                  username: user.username,
                  email: user.email,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  avatar_url: user.avatar_url,
                },
                token: token,
              });
            }
          );
        }
      );
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
      const query = "SELECT * FROM users WHERE username = ? OR email = ?";
      db.query(query, [loginField, loginField], async (err, results) => {
        if (err) {
          console.error("Erreur lors de la connexion:", err);
          return res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion",
            error: err.message,
          });
        }

        if (results.length === 0) {
          return res.status(401).json({
            success: false,
            message: "Nom d'utilisateur ou mot de passe incorrect",
          });
        }

        const user = results[0];

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
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar_url: user.avatar_url,
          },
          token: token,
        });
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
      const { id } = req.params;
      const userData = req.body;
      const user = new User({ ...userData, id });

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
      if (user.password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(user.password, saltRounds);
      }

      const updateQuery = `
        UPDATE users 
        SET username = ?, email = ?, first_name = ?, last_name = ?, avatar_url = ?
        ${hashedPassword ? ", password = ?" : ""}
        WHERE id = ?
      `;

      const values = [
        user.username,
        user.email,
        user.first_name,
        user.last_name,
        user.avatar_url,
        ...(hashedPassword ? [hashedPassword] : []),
        id,
      ];

      db.query(updateQuery, values, (err, result) => {
        if (err) {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
          return res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour de l'utilisateur",
            error: err.message,
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "Utilisateur non trouvé",
          });
        }

        res.json({
          success: true,
          message: "Utilisateur mis à jour avec succès",
          data: {
            id: parseInt(id),
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar_url: user.avatar_url,
          },
        });
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
  deleteUser: (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de l'utilisateur:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur lors de la suppression de l'utilisateur",
          error: err.message,
        });
      }

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
    });
  },

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  getProfile: (req, res) => {
    const userId = req.user.userId;
    const query =
      "SELECT id, username, email, first_name, last_name, avatar_url, created_at FROM users WHERE id = ?";

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        return res.status(500).json({
          success: false,
          message: "Erreur lors de la récupération du profil",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      res.json({
        success: true,
        data: results[0],
      });
    });
  },
};

export default userController;
