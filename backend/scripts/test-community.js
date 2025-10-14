import db from "../database.js";

console.log("🧪 TESTS DE L'ESPACE COMMUNAUTÉ\n");
console.log("=".repeat(60));

async function runTests() {
  const tests = [];

  // Test 1: Tables existent
  console.log("\n1️⃣ TEST : Vérification des tables...");
  const tables = [
    "user_follows",
    "recipe_comments",
    "comment_likes",
    "badges",
    "user_badges",
    "recipe_stats",
  ];

  for (const table of tables) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as count FROM ${table}`, (err, res) => {
          if (err) reject(err);
          else resolve(res[0].count);
        });
      });
      console.log(`   ✅ ${table}: ${result} entrées`);
      tests.push({ name: `Table ${table}`, status: "✅ PASS" });
    } catch (error) {
      console.log(`   ❌ ${table}: ${error.message}`);
      tests.push({ name: `Table ${table}`, status: "❌ FAIL" });
    }
  }

  // Test 2: Colonnes users
  console.log("\n2️⃣ TEST : Colonnes communautaires dans users...");
  const userColumns = [
    "bio",
    "cooking_level",
    "total_recipes",
    "total_followers",
    "total_following",
    "total_badges",
    "community_score",
  ];

  try {
    const columns = await new Promise((resolve, reject) => {
      db.query("DESCRIBE users", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    userColumns.forEach((col) => {
      const exists = columns.some((c) => c.Field === col);
      if (exists) {
        console.log(`   ✅ Colonne '${col}' existe`);
        tests.push({ name: `Colonne users.${col}`, status: "✅ PASS" });
      } else {
        console.log(`   ❌ Colonne '${col}' manquante`);
        tests.push({ name: `Colonne users.${col}`, status: "❌ FAIL" });
      }
    });
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }

  // Test 3: Colonnes recipes (partage)
  console.log("\n3️⃣ TEST : Colonnes de partage dans recipes...");
  const recipeColumns = [
    "is_shared",
    "share_message",
    "allow_comments",
    "show_author_info",
    "shared_at",
  ];

  try {
    const columns = await new Promise((resolve, reject) => {
      db.query("DESCRIBE recipes", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    recipeColumns.forEach((col) => {
      const exists = columns.some((c) => c.Field === col);
      if (exists) {
        console.log(`   ✅ Colonne '${col}' existe`);
        tests.push({ name: `Colonne recipes.${col}`, status: "✅ PASS" });
      } else {
        console.log(`   ❌ Colonne '${col}' manquante`);
        tests.push({ name: `Colonne recipes.${col}`, status: "❌ FAIL" });
      }
    });
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }

  // Test 4: Badges créés
  console.log("\n4️⃣ TEST : Badges disponibles...");
  try {
    const badges = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM badges ORDER BY id", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    if (badges.length >= 15) {
      console.log(`   ✅ ${badges.length} badges créés`);
      tests.push({ name: "Badges créés", status: "✅ PASS" });

      // Afficher quelques badges
      badges.slice(0, 5).forEach((badge) => {
        console.log(
          `      ${badge.icon} ${badge.name} (${badge.color}, niveau ${badge.level})`
        );
      });
      if (badges.length > 5) {
        console.log(`      ... et ${badges.length - 5} autres`);
      }
    } else {
      console.log(`   ⚠️  Seulement ${badges.length} badges (attendu: 15+)`);
      tests.push({ name: "Badges créés", status: "⚠️  WARN" });
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    tests.push({ name: "Badges créés", status: "❌ FAIL" });
  }

  // Test 5: Recettes partagées
  console.log("\n5️⃣ TEST : Recettes partagées...");
  try {
    const stats = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          COUNT(*) as total,
          SUM(is_shared) as shared,
          SUM(allow_comments) as with_comments
        FROM recipes`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res[0]);
        }
      );
    });

    console.log(`   📊 Total de recettes: ${stats.total}`);
    console.log(`   📢 Recettes partagées: ${stats.shared || 0}`);
    console.log(`   💬 Avec commentaires activés: ${stats.with_comments || 0}`);

    if (stats.shared > 0) {
      tests.push({ name: "Recettes partagées", status: "✅ PASS" });

      // Lister les recettes partagées
      const sharedRecipes = await new Promise((resolve, reject) => {
        db.query(
          `SELECT r.id, r.title, u.username 
           FROM recipes r 
           JOIN users u ON r.user_id = u.id 
           WHERE r.is_shared = 1 
           LIMIT 5`,
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      });

      console.log("\n   Exemples de recettes partagées:");
      sharedRecipes.forEach((recipe) => {
        console.log(`      - "${recipe.title}" par ${recipe.username}`);
      });
    } else {
      console.log("   ⚠️  Aucune recette partagée");
      tests.push({ name: "Recettes partagées", status: "⚠️  WARN" });
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    tests.push({ name: "Recettes partagées", status: "❌ FAIL" });
  }

  // Test 6: Stats des recettes
  console.log("\n6️⃣ TEST : Statistiques des recettes...");
  try {
    const stats = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM recipe_stats", (err, res) => {
        if (err) reject(err);
        else resolve(res[0].count);
      });
    });

    const recipes = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM recipes", (err, res) => {
        if (err) reject(err);
        else resolve(res[0].count);
      });
    });

    if (stats === recipes) {
      console.log(
        `   ✅ Stats initialisées pour toutes les recettes (${stats}/${recipes})`
      );
      tests.push({ name: "Recipe stats", status: "✅ PASS" });
    } else {
      console.log(`   ⚠️  Stats manquantes: ${stats}/${recipes} recettes`);
      tests.push({ name: "Recipe stats", status: "⚠️  WARN" });
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    tests.push({ name: "Recipe stats", status: "❌ FAIL" });
  }

  // Test 7: Utilisateurs actifs
  console.log("\n7️⃣ TEST : Utilisateurs dans la base...");
  try {
    const users = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id, username, total_recipes, total_followers 
         FROM users 
         ORDER BY id 
         LIMIT 5`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });

    console.log(`   ✅ ${users.length} utilisateur(s) trouvé(s)`);
    tests.push({ name: "Utilisateurs", status: "✅ PASS" });

    users.forEach((user) => {
      console.log(
        `      - ${user.username} (${user.total_recipes || 0} recettes, ${
          user.total_followers || 0
        } abonnés)`
      );
    });
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    tests.push({ name: "Utilisateurs", status: "❌ FAIL" });
  }

  // Résumé
  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ DES TESTS");
  console.log("=".repeat(60));

  const passed = tests.filter((t) => t.status.includes("✅")).length;
  const failed = tests.filter((t) => t.status.includes("❌")).length;
  const warnings = tests.filter((t) => t.status.includes("⚠️")).length;

  console.log(`\n✅ Tests réussis: ${passed}`);
  console.log(`❌ Tests échoués: ${failed}`);
  console.log(`⚠️  Avertissements: ${warnings}`);
  console.log(`📝 Total: ${tests.length} tests\n`);

  if (failed === 0) {
    console.log("🎉 TOUS LES TESTS SONT OK !");
    console.log("✨ L'espace communauté est prêt à être utilisé !\n");
  } else {
    console.log("⚠️  Des problèmes ont été détectés.");
    console.log("📋 Détails des échecs:\n");
    tests
      .filter((t) => t.status.includes("❌"))
      .forEach((t) => {
        console.log(`   ${t.status} ${t.name}`);
      });
    console.log("");
  }

  db.end();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  db.end();
  process.exit(1);
});

