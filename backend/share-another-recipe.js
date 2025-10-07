import mysql from "mysql2/promise";
import config from "./config.js";

async function shareAnotherRecipe() {
  let connection;

  try {
    console.log("🔗 Connexion à la base de données...");
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
    });

    // Choisir une recette non partagée (par exemple ID 2 "Salade César")
    const recipeId = 2;

    console.log(`📝 Partage de la recette ID ${recipeId}...`);

    await connection.execute(
      `UPDATE recipes 
       SET is_shared = 1, 
           share_message = ?, 
           allow_comments = 1, 
           show_author_info = 1, 
           shared_at = NOW() 
       WHERE id = ?`,
      [
        "Une délicieuse salade César maison ! Découvrez cette recette fraîche et savoureuse.",
        recipeId,
      ]
    );

    console.log(`✅ Recette ID ${recipeId} marquée comme partagée !`);

    // Vérifier le résultat
    const [sharedRecipes] = await connection.execute(
      "SELECT r.*, u.username FROM recipes r LEFT JOIN users u ON r.user_id = u.id WHERE r.is_shared = 1"
    );

    console.log(`\n📊 ${sharedRecipes.length} recettes partagées maintenant :`);
    sharedRecipes.forEach((recipe) => {
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

shareAnotherRecipe();
