import mysql from "mysql2/promise";
import config from "./config.js";

async function checkRecipesStatus() {
  let connection;

  try {
    console.log("🔗 Connexion à la base de données...");
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
    });

    console.log("🔍 Vérification de toutes les recettes...");
    const [recipes] = await connection.execute(
      "SELECT r.id, r.title, r.is_shared, r.share_message, r.shared_at, u.username FROM recipes r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.id"
    );

    console.log(`📊 ${recipes.length} recettes trouvées :`);
    recipes.forEach((recipe) => {
      const status = recipe.is_shared ? "✅ PARTAGÉE" : "❌ NON PARTAGÉE";
      const shareInfo = recipe.is_shared
        ? ` | Message: "${recipe.share_message}" | Partagée le: ${recipe.shared_at}`
        : "";

      console.log(
        `  - ID: ${recipe.id} | Titre: "${recipe.title}" | ${status}${shareInfo}`
      );
    });

    // Vérifier spécifiquement les recettes partagées
    const [sharedRecipes] = await connection.execute(
      "SELECT COUNT(*) as count FROM recipes WHERE is_shared = 1"
    );

    console.log(`\n🎯 Résumé :`);
    console.log(`  - Total recettes : ${recipes.length}`);
    console.log(`  - Recettes partagées : ${sharedRecipes[0].count}`);
    console.log(
      `  - Recettes non partagées : ${recipes.length - sharedRecipes[0].count}`
    );
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Connexion fermée");
    }
  }
}

checkRecipesStatus();
