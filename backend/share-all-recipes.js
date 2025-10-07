import mysql from "mysql2/promise";
import config from "./config.js";

async function shareAllRecipes() {
  let connection;

  try {
    console.log("🔗 Connexion à la base de données...");
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
    });

    // Récupérer toutes les recettes non partagées
    console.log("🔍 Recherche des recettes non partagées...");
    const [nonSharedRecipes] = await connection.execute(
      "SELECT * FROM recipes WHERE is_shared = 0 OR is_shared IS NULL"
    );

    console.log(
      `📋 ${nonSharedRecipes.length} recettes non partagées trouvées`
    );

    if (nonSharedRecipes.length === 0) {
      console.log("✅ Toutes les recettes sont déjà partagées !");
      return;
    }

    // Partager chaque recette
    for (const recipe of nonSharedRecipes) {
      const shareMessage = `Découvrez cette délicieuse recette : ${recipe.title} ! Une création culinaire à ne pas manquer.`;

      await connection.execute(
        `UPDATE recipes 
         SET is_shared = 1, 
             share_message = ?, 
             allow_comments = 1, 
             show_author_info = 1, 
             shared_at = NOW() 
         WHERE id = ?`,
        [shareMessage, recipe.id]
      );

      console.log(
        `✅ Recette "${recipe.title}" (ID: ${recipe.id}) marquée comme partagée`
      );
    }

    // Vérifier le résultat final
    const [allSharedRecipes] = await connection.execute(
      "SELECT r.*, u.username FROM recipes r LEFT JOIN users u ON r.user_id = u.id WHERE r.is_shared = 1 ORDER BY r.id"
    );

    console.log(
      `\n🎉 Résultat final : ${allSharedRecipes.length} recettes partagées :`
    );
    allSharedRecipes.forEach((recipe) => {
      console.log(
        `  - ID: ${recipe.id}, Titre: "${recipe.title}", Auteur: ${
          recipe.username || "Anonyme"
        }`
      );
    });
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Connexion fermée");
    }
  }
}

shareAllRecipes();
