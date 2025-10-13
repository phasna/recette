import db from "../database.js";

console.log("🎬 CRÉATION DE DONNÉES DE DÉMONSTRATION - Communauté\n");
console.log("=".repeat(60));

async function createDemoData() {
  try {
    // 1. Créer des relations de suivi entre utilisateurs
    console.log("\n1️⃣  Création de relations de suivi...");

    // Phasna suit testuser et Phasna1
    const follows = [
      [2, 1], // Phasna (2) suit testuser (1)
      [2, 3], // Phasna (2) suit Phasna1 (3)
      [1, 2], // testuser (1) suit Phasna (2)
      [3, 2], // Phasna1 (3) suit Phasna (2)
    ];

    for (const [follower, followed] of follows) {
      try {
        await new Promise((resolve, reject) => {
          db.query(
            "INSERT IGNORE INTO user_follows (follower_id, followed_id) VALUES (?, ?)",
            [follower, followed],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
        console.log(`✅ User ${follower} suit User ${followed}`);
      } catch (error) {
        if (!error.message.includes("Duplicate")) {
          console.log(`⚠️  Relation déjà existante`);
        }
      }
    }

    // 2. Ajouter des commentaires de test
    console.log("\n2️⃣  Ajout de commentaires de test...");

    const comments = [
      [1, 1, "Délicieuse recette ! J'adore les pâtes carbonara 🍝", 5],
      [1, 2, "Très fraîche et légère, parfaite pour l'été !", 4],
      [3, 1, "Recette simple et rapide, merci pour le partage !", 5],
      [3, 3, "Excellente ! Toute la famille a adoré 😋", 5],
      [2, 4, "Bon concept, j'ai fait quelques modifications", 4],
      [1, 3, "Crémeux à souhait ! Un régal", 5],
    ];

    for (const [userId, recipeId, text, rating] of comments) {
      try {
        await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO recipe_comments (user_id, recipe_id, comment_text, rating) VALUES (?, ?, ?, ?)",
            [userId, recipeId, text, rating],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
        console.log(
          `✅ Commentaire ajouté sur recette ${recipeId} par user ${userId}`
        );
      } catch (error) {
        console.log(`⚠️  Erreur commentaire:`, error.message);
      }
    }

    // 3. Mettre à jour les statistiques des utilisateurs
    console.log("\n3️⃣  Mise à jour des statistiques...");

    // Mettre à jour total_followers
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u SET total_followers = (
          SELECT COUNT(*) FROM user_follows WHERE followed_id = u.id
        )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ total_followers mis à jour");

    // Mettre à jour total_following
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u SET total_following = (
          SELECT COUNT(*) FROM user_follows WHERE follower_id = u.id
        )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ total_following mis à jour");

    // Mettre à jour total_recipes (déjà fait mais on s'assure)
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u SET total_recipes = (
          SELECT COUNT(*) FROM recipes WHERE user_id = u.id
        )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ total_recipes mis à jour");

    // 4. Calculer les scores communautaires
    console.log("\n4️⃣  Calcul des scores communautaires...");

    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u 
         LEFT JOIN (
           SELECT user_id, COUNT(*) as comments_count 
           FROM recipe_comments 
           GROUP BY user_id
         ) c ON u.id = c.user_id
         SET community_score = 
           (u.total_recipes * 10) + 
           (u.total_followers * 5) + 
           (u.total_badges * 20) + 
           (COALESCE(c.comments_count, 0) * 2)`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Scores communautaires calculés");

    // 5. Attribuer des badges automatiquement
    console.log("\n5️⃣  Attribution des badges...");

    // Badges basés sur le nombre de recettes
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT IGNORE INTO user_badges (user_id, badge_id)
         SELECT u.id, b.id
         FROM users u
         JOIN badges b ON b.requirement_type = 'recipes_count'
         WHERE u.total_recipes >= b.requirement_value`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Badges de recettes attribués");

    // Badges basés sur le nombre de followers
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT IGNORE INTO user_badges (user_id, badge_id)
         SELECT u.id, b.id
         FROM users u
         JOIN badges b ON b.requirement_type = 'followers_count'
         WHERE u.total_followers >= b.requirement_value`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Badges de popularité attribués");

    // Badges basés sur le nombre de commentaires
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT IGNORE INTO user_badges (user_id, badge_id)
         SELECT u.id, b.id
         FROM badges b
         LEFT JOIN (
           SELECT user_id, COUNT(*) as count 
           FROM recipe_comments 
           GROUP BY user_id
         ) c ON 1=1
         CROSS JOIN users u
         WHERE b.requirement_type = 'comments_count' 
         AND COALESCE(c.count, 0) >= b.requirement_value
         AND c.user_id = u.id`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Badges de commentaires attribués");

    // Badges basés sur following
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT IGNORE INTO user_badges (user_id, badge_id)
         SELECT u.id, b.id
         FROM users u
         JOIN badges b ON b.requirement_type = 'following_count'
         WHERE u.total_following >= b.requirement_value`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Badges sociaux attribués");

    // Mettre à jour le total_badges
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE users u 
         SET total_badges = (
           SELECT COUNT(*) FROM user_badges WHERE user_id = u.id
         )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ total_badges mis à jour");

    // 6. Mettre à jour les stats des recettes
    console.log("\n6️⃣  Mise à jour des statistiques des recettes...");

    // Compteur de commentaires
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe_stats rs
         SET comments_count = (
           SELECT COUNT(*) FROM recipe_comments WHERE recipe_id = rs.recipe_id
         )`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Compteur de commentaires mis à jour");

    // Notes moyennes
    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe_stats rs
         SET average_rating = COALESCE((
           SELECT AVG(rating) 
           FROM recipe_comments 
           WHERE recipe_id = rs.recipe_id AND rating IS NOT NULL
         ), 0)`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log("✅ Notes moyennes calculées");

    // 7. Afficher un résumé
    console.log("\n" + "=".repeat(60));
    console.log("📊 RÉSUMÉ DES DONNÉES DE DÉMONSTRATION");
    console.log("=".repeat(60));

    // Stats utilisateurs
    const users = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          username, 
          total_recipes, 
          total_followers, 
          total_following,
          total_badges,
          community_score
         FROM users
         ORDER BY community_score DESC`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    console.log("\n👥 UTILISATEURS:");
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.username}`);
      console.log(`   📊 Stats:`);
      console.log(`      - Recettes: ${user.total_recipes}`);
      console.log(`      - Abonnés: ${user.total_followers}`);
      console.log(`      - Abonnements: ${user.total_following}`);
      console.log(`      - Badges: ${user.total_badges}`);
      console.log(`      - Score: ${user.community_score}`);
    });

    // Badges gagnés
    const userBadges = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          u.username,
          b.icon,
          b.name,
          b.level,
          b.color
         FROM user_badges ub
         JOIN users u ON ub.user_id = u.id
         JOIN badges b ON ub.badge_id = b.id
         ORDER BY u.id, b.level`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    console.log("\n🎖️  BADGES GAGNÉS:");
    let currentUser = "";
    userBadges.forEach((badge) => {
      if (badge.username !== currentUser) {
        currentUser = badge.username;
        console.log(`\n${badge.username}:`);
      }
      console.log(
        `   ${badge.icon} ${badge.name} (${badge.color}, niveau ${badge.level})`
      );
    });

    // Stats recettes
    const recipeStats = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          r.title,
          rs.comments_count,
          rs.average_rating,
          rs.favorites_count
         FROM recipes r
         JOIN recipe_stats rs ON r.id = rs.recipe_id
         WHERE r.is_shared = 1
         ORDER BY (rs.favorites_count * 3 + rs.comments_count * 2) DESC
         LIMIT 5`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    console.log("\n🔥 TOP RECETTES:");
    recipeStats.forEach((recipe, index) => {
      const rating = recipe.average_rating
        ? parseFloat(recipe.average_rating)
        : 0;
      console.log(`\n${index + 1}. ${recipe.title}`);
      console.log(`   💬 ${recipe.comments_count} commentaires`);
      console.log(`   ⭐ ${rating.toFixed(1)} / 5.0`);
      console.log(`   ❤️  ${recipe.favorites_count} favoris`);
    });

    // Commentaires
    const commentsCount = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as count FROM recipe_comments",
        (err, result) => {
          if (err) reject(err);
          else resolve(result[0].count);
        }
      );
    });

    console.log("\n💬 COMMENTAIRES:");
    console.log(`   Total: ${commentsCount} commentaires`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ DONNÉES DE DÉMONSTRATION CRÉÉES !");
    console.log("=".repeat(60));
    console.log("\n🎉 Vous pouvez maintenant :");
    console.log("   1. Démarrer le frontend");
    console.log("   2. Aller dans Communauté");
    console.log("   3. Voir les classements avec des données réelles");
    console.log("   4. Voir les badges attribués");
    console.log("   5. Voir les recettes populaires avec commentaires\n");

    db.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    db.end();
    process.exit(1);
  }
}

createDemoData();
