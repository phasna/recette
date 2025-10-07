import mysql from "mysql2";
import config from "./config.js";

// Créer la connexion à la base de données
const db = mysql.createConnection({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Créer la table users d'abord
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

db.query(createUsersTableQuery, (err) => {
  if (err) {
    console.error("Erreur lors de la création de la table users:", err);
  } else {
    console.log("✅ Table users créée ou déjà existante");
  }
});

// Créer la table des recettes si elle n'existe pas
const createRecipesTableQuery = `
  CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INT,
    cook_time INT,
    servings INT,
    difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT 'Facile',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  )
`;

db.query(createRecipesTableQuery, (err) => {
  if (err) {
    console.error("Erreur lors de la création de la table recipes:", err);
  } else {
    console.log("✅ Table recipes créée ou déjà existante");
  }
});

// Créer la table favorites
const createFavoritesTableQuery = `
  CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_recipe (user_id, recipe_id)
  )
`;

db.query(createFavoritesTableQuery, (err) => {
  if (err) {
    console.error("Erreur lors de la création de la table favorites:", err);
  } else {
    console.log("✅ Table favorites créée ou déjà existante");
  }
});

export default db;
