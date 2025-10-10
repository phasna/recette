import mysql from "mysql2/promise";

// Configuration de la base de données
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "recipe_app",
};

async function createSharedRecipeTest() {
  let connection;

  try {
    console.log("🔗 Connexion à la base de données...");
    connection = await mysql.createConnection(dbConfig);

    // Vérifier s'il y a déjà des recettes
    console.log("🔍 Vérification des recettes existantes...");
    const [recipes] = await connection.execute("SELECT * FROM recipes LIMIT 1");

    if (recipes.length === 0) {
      console.log("❌ Aucune recette trouvée. Créons d'abord une recette...");

      // Créer un utilisateur de test s'il n'existe pas
      const [users] = await connection.execute("SELECT * FROM users LIMIT 1");

      let userId;
      if (users.length === 0) {
        console.log("👤 Création d'un utilisateur de test...");
        await connection.execute(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          ["testuser", "test@example.com", "password123"]
        );
        const [newUsers] = await connection.execute(
          "SELECT id FROM users WHERE email = ?",
          ["test@example.com"]
        );
        userId = newUsers[0].id;
      } else {
        userId = users[0].id;
      }

      // Créer une recette de test
      console.log("🍳 Création d'une recette de test...");
      await connection.execute(
        `INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cooking_time, servings, difficulty, user_id, is_shared, share_message, allow_comments, show_author_info, shared_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          "Pâtes Carbonara Test",
          "Une délicieuse recette de pâtes carbonara pour tester le partage",
          "Pâtes, œufs, parmesan, lardons, poivre",
          "1. Cuire les pâtes\n2. Mélanger les œufs avec le parmesan\n3. Ajouter les lardons\n4. Mélanger le tout",
          15,
          10,
          4,
          "Facile",
          userId,
          1, // is_shared = true
          "Découvrez cette délicieuse recette de pâtes carbonara !",
          1, // allow_comments = true
          1, // show_author_info = true
        ]
      );

      console.log("✅ Recette de test créée et partagée !");
    } else {
      // Marquer une recette existante comme partagée
      console.log("📝 Marquage d'une recette existante comme partagée...");
      await connection.execute(
        `UPDATE recipes 
         SET is_shared = 1, 
             share_message = ?, 
             allow_comments = 1, 
             show_author_info = 1, 
             shared_at = NOW() 
         WHERE id = ?`,
        ["Découvrez cette délicieuse recette partagée !", recipes[0].id]
      );

      console.log(`✅ Recette "${recipes[0].title}" marquée comme partagée !`);
    }

    // Vérifier les recettes partagées
    console.log("🔍 Vérification des recettes partagées...");
    const [sharedRecipes] = await connection.execute(
      "SELECT r.*, u.username FROM recipes r LEFT JOIN users u ON r.user_id = u.id WHERE r.is_shared = 1"
    );

    console.log(`📊 ${sharedRecipes.length} recettes partagées trouvées :`);
    sharedRecipes.forEach((recipe) => {
      console.log(
        `  - ID: ${recipe.id}, Titre: ${recipe.title}, Auteur: ${
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

createSharedRecipeTest();
