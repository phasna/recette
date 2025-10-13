import db from "../database.js";

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║      🏆 CLASSEMENTS ET BADGES - VISUALISATION 🎖️        ║");
console.log("╚══════════════════════════════════════════════════════════╝");
console.log("");

async function visualizeData() {
  try {
    // ==========================================
    // CLASSEMENT PAR SCORE GLOBAL
    // ==========================================
    console.log("🏆 CLASSEMENT PAR SCORE GLOBAL");
    console.log("━".repeat(60));
    console.log("");

    const topByScore = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          u.username,
          u.total_recipes,
          u.total_followers,
          u.total_following,
          u.total_badges,
          u.community_score,
          (SELECT COUNT(*) FROM recipe_comments WHERE user_id = u.id) as comments_count
         FROM users u
         WHERE u.total_recipes > 0 OR u.total_followers > 0 OR u.total_following > 0
         ORDER BY u.community_score DESC`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    topByScore.forEach((user, index) => {
      const rank =
        index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : `#${index + 1}`;
      console.log(`${rank} ${user.username}`);
      console.log(`   ⭐ Score: ${user.community_score}`);
      console.log(`   🍳 Recettes: ${user.total_recipes}`);
      console.log(
        `   👥 Abonnés: ${user.total_followers} | Abonnements: ${user.total_following}`
      );
      console.log(`   🎖️  Badges: ${user.total_badges}`);
      console.log(`   💬 Commentaires: ${user.comments_count}`);
      console.log("");
    });

    // ==========================================
    // CLASSEMENT PAR RECETTES
    // ==========================================
    console.log("🍳 CLASSEMENT PAR NOMBRE DE RECETTES");
    console.log("━".repeat(60));
    console.log("");

    const topByRecipes = await new Promise((resolve, reject) => {
      db.query(
        `SELECT username, total_recipes
         FROM users
         WHERE total_recipes > 0
         ORDER BY total_recipes DESC`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    topByRecipes.forEach((user, index) => {
      const rank =
        index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : `#${index + 1}`;
      console.log(`${rank} ${user.username} - ${user.total_recipes} recettes`);
    });

    // ==========================================
    // CLASSEMENT PAR ABONNÉS
    // ==========================================
    console.log("\n👥 CLASSEMENT PAR NOMBRE D'ABONNÉS");
    console.log("━".repeat(60));
    console.log("");

    const topByFollowers = await new Promise((resolve, reject) => {
      db.query(
        `SELECT username, total_followers
         FROM users
         WHERE total_followers > 0
         ORDER BY total_followers DESC`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    topByFollowers.forEach((user, index) => {
      const rank =
        index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : `#${index + 1}`;
      console.log(`${rank} ${user.username} - ${user.total_followers} abonnés`);
    });

    // ==========================================
    // CLASSEMENT PAR BADGES
    // ==========================================
    console.log("\n🎖️  CLASSEMENT PAR NOMBRE DE BADGES");
    console.log("━".repeat(60));
    console.log("");

    const topByBadges = await new Promise((resolve, reject) => {
      db.query(
        `SELECT username, total_badges
         FROM users
         WHERE total_badges > 0
         ORDER BY total_badges DESC`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (topByBadges.length > 0) {
      topByBadges.forEach((user, index) => {
        const rank =
          index === 0
            ? "🥇"
            : index === 1
            ? "🥈"
            : index === 2
            ? "🥉"
            : `#${index + 1}`;
        console.log(`${rank} ${user.username} - ${user.total_badges} badges`);
      });
    } else {
      console.log("   Aucun utilisateur n'a encore de badges");
    }

    // ==========================================
    // DÉTAILS DES BADGES PAR UTILISATEUR
    // ==========================================
    console.log("\n🎖️  BADGES OBTENUS PAR CHAQUE UTILISATEUR");
    console.log("━".repeat(60));
    console.log("");

    const userBadges = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          u.username,
          b.icon,
          b.name,
          b.level,
          b.color,
          ub.earned_at
         FROM user_badges ub
         JOIN users u ON ub.user_id = u.id
         JOIN badges b ON ub.badge_id = b.id
         ORDER BY u.username, b.level`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (userBadges.length > 0) {
      let currentUser = "";
      userBadges.forEach((badge) => {
        if (badge.username !== currentUser) {
          currentUser = badge.username;
          console.log(`\n👤 ${badge.username}:`);
        }
        const date = new Date(badge.earned_at).toLocaleDateString("fr-FR");
        console.log(`   ${badge.icon} ${badge.name}`);
        console.log(
          `      └─ Niveau ${badge.level} | ${badge.color} | Obtenu le ${date}`
        );
      });
    } else {
      console.log("   Aucun badge n'a encore été gagné");
    }

    // ==========================================
    // PROCHAINS BADGES À DÉBLOQUER
    // ==========================================
    console.log("\n\n📈 PROCHAINS BADGES À DÉBLOQUER (par utilisateur)");
    console.log("━".repeat(60));

    const users = await new Promise((resolve, reject) => {
      db.query("SELECT id, username FROM users ORDER BY id", (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    for (const user of users) {
      console.log(`\n👤 ${user.username}:`);

      const nextBadges = await new Promise((resolve, reject) => {
        db.query(
          `SELECT 
            b.icon,
            b.name,
            b.requirement_value as target,
            CASE b.requirement_type
              WHEN 'recipes_count' THEN u.total_recipes
              WHEN 'followers_count' THEN u.total_followers
              WHEN 'following_count' THEN u.total_following
              WHEN 'comments_count' THEN (
                SELECT COUNT(*) FROM recipe_comments WHERE user_id = u.id
              )
              ELSE 0
            END as current_progress,
            b.requirement_type
           FROM badges b
           CROSS JOIN users u
           WHERE u.id = ?
           AND b.id NOT IN (
             SELECT badge_id FROM user_badges WHERE user_id = ?
           )
           HAVING current_progress < target
           ORDER BY target - current_progress
           LIMIT 3`,
          [user.id, user.id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      if (nextBadges.length > 0) {
        nextBadges.forEach((badge) => {
          const percentage = Math.round(
            (badge.current_progress / badge.target) * 100
          );
          const bar =
            "█".repeat(Math.floor(percentage / 10)) +
            "░".repeat(10 - Math.floor(percentage / 10));
          console.log(`   ${badge.icon} ${badge.name}`);
          console.log(
            `      └─ [${bar}] ${percentage}% (${badge.current_progress}/${badge.target})`
          );
        });
      } else {
        console.log("   🏆 Tous les badges débloqués !");
      }
    }

    // ==========================================
    // RECETTES POPULAIRES
    // ==========================================
    console.log("\n\n🔥 RECETTES LES PLUS POPULAIRES");
    console.log("━".repeat(60));
    console.log("");

    const popularRecipes = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          r.title,
          u.username as author,
          rs.favorites_count,
          rs.comments_count,
          rs.average_rating,
          (rs.favorites_count * 3 + rs.comments_count * 2 + rs.views_count * 0.1) as popularity_score
         FROM recipes r
         JOIN users u ON r.user_id = u.id
         JOIN recipe_stats rs ON r.id = rs.recipe_id
         WHERE r.is_shared = 1
         ORDER BY popularity_score DESC
         LIMIT 5`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    popularRecipes.forEach((recipe, index) => {
      const rank =
        index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : `#${index + 1}`;
      const rating = recipe.average_rating
        ? parseFloat(recipe.average_rating)
        : 0;

      console.log(`${rank} "${recipe.title}" par ${recipe.author}`);
      console.log(`   💯 Score: ${Math.round(recipe.popularity_score)}`);
      console.log(`   ❤️  Favoris: ${recipe.favorites_count}`);
      console.log(`   💬 Commentaires: ${recipe.comments_count}`);
      console.log(`   ⭐ Note: ${rating.toFixed(1)}/5.0`);
      console.log("");
    });

    // ==========================================
    // ACTIVITÉ RÉCENTE
    // ==========================================
    console.log("💬 ACTIVITÉ RÉCENTE (Derniers commentaires)");
    console.log("━".repeat(60));
    console.log("");

    const recentComments = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          u.username,
          r.title as recipe_title,
          rc.comment_text,
          rc.rating,
          rc.created_at
         FROM recipe_comments rc
         JOIN users u ON rc.user_id = u.id
         JOIN recipes r ON rc.recipe_id = r.id
         ORDER BY rc.created_at DESC
         LIMIT 5`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    recentComments.forEach((comment) => {
      const stars = comment.rating ? "⭐".repeat(comment.rating) : "";
      const date = new Date(comment.created_at).toLocaleString("fr-FR");
      console.log(`👤 ${comment.username} sur "${comment.recipe_title}"`);
      console.log(
        `   ${stars} ${comment.rating ? `${comment.rating}/5` : "Sans note"}`
      );
      console.log(`   "${comment.comment_text}"`);
      console.log(`   📅 ${date}`);
      console.log("");
    });

    // ==========================================
    // STATISTIQUES GLOBALES
    // ==========================================
    console.log("📊 STATISTIQUES GLOBALES DE LA COMMUNAUTÉ");
    console.log("━".repeat(60));
    console.log("");

    const globalStats = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          (SELECT COUNT(*) FROM users WHERE total_recipes > 0) as active_users,
          (SELECT COUNT(*) FROM recipes WHERE is_shared = 1) as shared_recipes,
          (SELECT COUNT(*) FROM recipe_comments) as total_comments,
          (SELECT COUNT(*) FROM user_follows) as total_follows,
          (SELECT COUNT(*) FROM user_badges) as total_badges_earned,
          (SELECT SUM(total_badges) FROM users) as total_badges_sum`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        }
      );
    });

    console.log(`👥 Cuisiniers actifs: ${globalStats.active_users}`);
    console.log(`📢 Recettes partagées: ${globalStats.shared_recipes}`);
    console.log(`💬 Commentaires: ${globalStats.total_comments}`);
    console.log(`🤝 Relations de suivi: ${globalStats.total_follows}`);
    console.log(`🎖️  Badges gagnés: ${globalStats.total_badges_earned}`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ VISUALISATION TERMINÉE !");
    console.log("=".repeat(60));
    console.log(
      "\n🌐 Maintenant, démarrez le frontend pour voir tout ça dans l'interface !"
    );
    console.log("\nCommandes:");
    console.log("   cd frontend && npm start\n");
    console.log("Puis allez sur: http://localhost:3000");
    console.log("Cliquez sur: 🌟 Communauté\n");

    db.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    db.end();
    process.exit(1);
  }
}

visualizeData();
