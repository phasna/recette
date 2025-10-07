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

// Ajouter un index pour améliorer les performances
const addIndexQuery = `
  CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
  CREATE INDEX IF NOT EXISTS idx_favorites_recipe_id ON favorites(recipe_id);
`;

db.query(addIndexQuery, (err) => {
  if (err) {
    console.error("Erreur lors de la création des index:", err);
  } else {
    console.log("✅ Index créés pour la table favorites");
  }
});

// Fermer la connexion
db.end((err) => {
  if (err) {
    console.error("Erreur lors de la fermeture de la connexion:", err);
  } else {
    console.log("✅ Connexion fermée avec succès");
  }
});
