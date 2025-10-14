import db from "../../database.js";

console.log("🚀 Création des tables communautaires...\n");

const tables = [
  {
    name: "user_follows",
    sql: `CREATE TABLE IF NOT EXISTS user_follows (
      id INT AUTO_INCREMENT PRIMARY KEY,
      follower_id INT NOT NULL,
      followed_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_follow (follower_id, followed_id),
      INDEX idx_follower (follower_id),
      INDEX idx_followed (followed_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
  {
    name: "recipe_comments",
    sql: `CREATE TABLE IF NOT EXISTS recipe_comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      recipe_id INT NOT NULL,
      user_id INT NOT NULL,
      comment_text TEXT NOT NULL,
      rating INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_recipe (recipe_id),
      INDEX idx_user (user_id),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
  {
    name: "comment_likes",
    sql: `CREATE TABLE IF NOT EXISTS comment_likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      comment_id INT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (comment_id) REFERENCES recipe_comments(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_comment_like (comment_id, user_id),
      INDEX idx_comment (comment_id),
      INDEX idx_user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
  {
    name: "badges",
    sql: `CREATE TABLE IF NOT EXISTS badges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      icon VARCHAR(255),
      color VARCHAR(50) DEFAULT 'gray',
      level INT DEFAULT 1,
      requirement_type VARCHAR(50) NOT NULL,
      requirement_value INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_requirement (requirement_type, requirement_value)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
  {
    name: "user_badges",
    sql: `CREATE TABLE IF NOT EXISTS user_badges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      badge_id INT NOT NULL,
      earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_badge (user_id, badge_id),
      INDEX idx_user (user_id),
      INDEX idx_badge (badge_id),
      INDEX idx_earned_at (earned_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
  {
    name: "recipe_stats",
    sql: `CREATE TABLE IF NOT EXISTS recipe_stats (
      recipe_id INT PRIMARY KEY,
      views_count INT DEFAULT 0,
      favorites_count INT DEFAULT 0,
      comments_count INT DEFAULT 0,
      average_rating DECIMAL(3,2) DEFAULT 0.00,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
      INDEX idx_views (views_count),
      INDEX idx_favorites (favorites_count),
      INDEX idx_rating (average_rating),
      INDEX idx_comments (comments_count)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  },
];

async function createTables() {
  for (const table of tables) {
    try {
      await new Promise((resolve, reject) => {
        db.query(table.sql, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      console.log(`✅ Table '${table.name}' créée`);
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log(`⚠️  Table '${table.name}' existe déjà`);
      } else {
        console.error(`❌ Erreur table '${table.name}':`, error.message);
      }
    }
  }

  // Ajouter les colonnes à users
  console.log("\n📝 Ajout des colonnes à users...");
  const userColumns = [
    "ADD COLUMN IF NOT EXISTS bio TEXT",
    "ADD COLUMN IF NOT EXISTS cooking_level VARCHAR(50) DEFAULT 'Débutant'",
    "ADD COLUMN IF NOT EXISTS total_recipes INT DEFAULT 0",
    "ADD COLUMN IF NOT EXISTS total_followers INT DEFAULT 0",
    "ADD COLUMN IF NOT EXISTS total_following INT DEFAULT 0",
    "ADD COLUMN IF NOT EXISTS total_badges INT DEFAULT 0",
    "ADD COLUMN IF NOT EXISTS community_score INT DEFAULT 0",
  ];

  for (const col of userColumns) {
    try {
      await new Promise((resolve, reject) => {
        db.query(`ALTER TABLE users ${col}`, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      console.log(`✅ Colonne ajoutée`);
    } catch (error) {
      if (error.message.includes("Duplicate column")) {
        console.log(`⚠️  Colonne existe déjà`);
      } else {
        console.error(`❌ Erreur:`, error.message);
      }
    }
  }

  // Insérer les badges
  console.log("\n🎖️  Insertion des badges...");
  const badges = [
    [
      "Premier Pas",
      "Créez votre première recette",
      "🍳",
      "bronze",
      1,
      "recipes_count",
      1,
    ],
    [
      "Chef Maison",
      "Partagez 5 recettes",
      "👨‍🍳",
      "silver",
      2,
      "recipes_count",
      5,
    ],
    [
      "Cordon Bleu",
      "Partagez 10 recettes",
      "🎖️",
      "gold",
      3,
      "recipes_count",
      10,
    ],
    [
      "Grand Chef",
      "Partagez 25 recettes",
      "👑",
      "platinum",
      4,
      "recipes_count",
      25,
    ],
    [
      "Maître Cuisinier",
      "Partagez 50 recettes",
      "⭐",
      "diamond",
      5,
      "recipes_count",
      50,
    ],
    [
      "Populaire",
      "Obtenez 10 abonnés",
      "📢",
      "bronze",
      1,
      "followers_count",
      10,
    ],
    [
      "Influenceur",
      "Obtenez 50 abonnés",
      "🌟",
      "silver",
      2,
      "followers_count",
      50,
    ],
    [
      "Star de la Cuisine",
      "Obtenez 100 abonnés",
      "💫",
      "gold",
      3,
      "followers_count",
      100,
    ],
    [
      "Commentateur",
      "Laissez 10 commentaires",
      "💬",
      "bronze",
      1,
      "comments_count",
      10,
    ],
    [
      "Critique Culinaire",
      "Laissez 50 commentaires",
      "📝",
      "silver",
      2,
      "comments_count",
      50,
    ],
    [
      "Expert Gastronome",
      "Laissez 100 commentaires",
      "🍷",
      "gold",
      3,
      "comments_count",
      100,
    ],
    [
      "Social",
      "Suivez 10 cuisiniers",
      "🤝",
      "bronze",
      1,
      "following_count",
      10,
    ],
    [
      "Explorateur",
      "Suivez 50 cuisiniers",
      "🔍",
      "silver",
      2,
      "following_count",
      50,
    ],
    [
      "Favoris Lover",
      "Ajoutez 25 recettes aux favoris",
      "❤️",
      "bronze",
      1,
      "favorites_count",
      25,
    ],
    [
      "Collectionneur",
      "Ajoutez 100 recettes aux favoris",
      "📚",
      "gold",
      2,
      "favorites_count",
      100,
    ],
  ];

  for (const badge of badges) {
    try {
      await new Promise((resolve, reject) => {
        db.query(
          "INSERT IGNORE INTO badges (name, description, icon, color, level, requirement_type, requirement_value) VALUES (?, ?, ?, ?, ?, ?, ?)",
          badge,
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    } catch (error) {
      console.error(`❌ Erreur badge:`, error.message);
    }
  }

  // Compter les badges
  const count = await new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) as count FROM badges", (err, result) => {
      if (err) reject(err);
      else resolve(result[0].count);
    });
  });

  console.log(`✅ ${count} badges dans la base\n`);

  // Initialiser les stats pour les recettes existantes
  console.log("📊 Initialisation des stats des recettes...");
  await new Promise((resolve, reject) => {
    db.query(
      "INSERT IGNORE INTO recipe_stats (recipe_id, views_count, favorites_count, comments_count, average_rating) SELECT id, 0, 0, 0, 0.00 FROM recipes",
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
  console.log("✅ Stats initialisées\n");

  console.log("🎉 Configuration terminée!\n");
  console.log("Vous pouvez maintenant:");
  console.log("  ✓ Suivre d'autres utilisateurs");
  console.log("  ✓ Commenter les recettes");
  console.log("  ✓ Gagner des badges");
  console.log("  ✓ Voir les classements\n");

  db.end();
  process.exit(0);
}

createTables().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  db.end();
  process.exit(1);
});

