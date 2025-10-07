import mysql from "mysql2";
import config from "./config.js";

const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

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

// Créer la table recipes
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

// Ajouter les index pour améliorer les performances
const addIndexes = () => {
  const indexes = [
    "CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_favorites_recipe_id ON favorites(recipe_id)",
  ];

  indexes.forEach((indexQuery, i) => {
    db.query(indexQuery, (err) => {
      if (err) {
        console.error(`Erreur lors de la création de l'index ${i + 1}:`, err);
      } else {
        console.log(`✅ Index ${i + 1} créé`);
      }
    });
  });
};

// Attendre un peu avant de créer les index
setTimeout(addIndexes, 1000);

// Fermer la connexion après un délai
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error("Erreur lors de la fermeture de la connexion:", err);
    } else {
      console.log("✅ Connexion fermée avec succès");
    }
  });
}, 2000);
