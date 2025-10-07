/**
 * Script simple pour tester la base de données et les recettes partagées
 */
import mysql from "mysql2/promise";
import db from "./backend/database.js";

async function testDatabase() {
  console.log("🔍 Test de la base de données...\n");

  try {
    // Test de connexion
    console.log("1️⃣ Test de connexion à la base de données...");

    // Vérifier la structure de la table recipes
    console.log("2️⃣ Structure de la table recipes:");
    const [columns] = await db.query("DESCRIBE recipes");
    columns.forEach((col) => {
      console.log(
        `   - ${col.Field}: ${col.Type} ${
          col.Null === "YES" ? "(nullable)" : "(not null)"
        }`
      );
    });

    // Vérifier les recettes partagées
    console.log("\n3️⃣ Recettes partagées:");
    const [sharedRecipes] = await db.query(`
      SELECT r.id, r.title, r.is_shared, r.share_message, r.shared_at, u.username 
      FROM recipes r 
      LEFT JOIN users u ON r.user_id = u.id 
      WHERE r.is_shared = 1
    `);

    if (sharedRecipes.length > 0) {
      console.log(`✅ ${sharedRecipes.length} recettes partagées trouvées:`);
      sharedRecipes.forEach((recipe) => {
        console.log(`   - ID: ${recipe.id}, Titre: "${recipe.title}"`);
        console.log(`     Auteur: ${recipe.username || "Inconnu"}`);
        console.log(`     Message: ${recipe.share_message || "Aucun"}`);
        console.log(`     Partagée le: ${recipe.shared_at || "Date inconnue"}`);
        console.log("");
      });
    } else {
      console.log("❌ Aucune recette partagée trouvée");
    }

    // Vérifier toutes les recettes
    console.log("4️⃣ Toutes les recettes:");
    const [allRecipes] = await db.query(
      "SELECT id, title, is_shared FROM recipes"
    );
    console.log(`📊 ${allRecipes.length} recettes totales:`);
    allRecipes.forEach((recipe) => {
      console.log(
        `   - ID: ${recipe.id}, Titre: "${recipe.title}", Partagée: ${
          recipe.is_shared ? "Oui" : "Non"
        }`
      );
    });
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  } finally {
    process.exit(0);
  }
}

testDatabase();
