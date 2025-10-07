/**
 * Script de diagnostic détaillé pour les favoris
 * Teste toutes les étapes du processus
 */

import mysql from "mysql2/promise";
import config from "./backend/config.js";

console.log("🔍 DIAGNOSTIC COMPLET DES FAVORIS\n");
console.log("=" .repeat(50));

async function diagnosticComplet() {
  let connection;
  
  try {
    // 1. Test de connexion à MySQL
    console.log("\n1️⃣ Test de connexion MySQL...");
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
    });
    console.log("✅ Connexion MySQL réussie");

    // 2. Vérifier l'existence de la table favorites
    console.log("\n2️⃣ Vérification de la table 'favorites'...");
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'favorites'"
    );
    
    if (tables.length > 0) {
      console.log("✅ Table 'favorites' existe");
      
      // Afficher la structure
      const [structure] = await connection.query(
        "DESCRIBE favorites"
      );
      console.log("\n📋 Structure de la table :");
      console.table(structure);
    } else {
      console.log("❌ Table 'favorites' n'existe pas");
      console.log("   Exécutez : node backend/add-favorites-table.js");
      return;
    }

    // 3. Vérifier les données existantes
    console.log("\n3️⃣ Vérification des données...");
    const [favoritesCount] = await connection.query(
      "SELECT COUNT(*) as count FROM favorites"
    );
    console.log(`📊 Nombre de favoris dans la base : ${favoritesCount[0].count}`);

    const [recipesCount] = await connection.query(
      "SELECT COUNT(*) as count FROM recipes"
    );
    console.log(`📝 Nombre de recettes dans la base : ${recipesCount[0].count}`);

    const [usersCount] = await connection.query(
      "SELECT COUNT(*) as count FROM users"
    );
    console.log(`👥 Nombre d'utilisateurs dans la base : ${usersCount[0].count}`);

    // 4. Test d'insertion (simulation)
    console.log("\n4️⃣ Test de compatibilité d'insertion...");
    
    if (usersCount[0].count > 0 && recipesCount[0].count > 0) {
      const [users] = await connection.query("SELECT id FROM users LIMIT 1");
      const [recipes] = await connection.query("SELECT id FROM recipes LIMIT 1");
      
      if (users.length > 0 && recipes.length > 0) {
        const userId = users[0].id;
        const recipeId = recipes[0].id;
        
        console.log(`✅ Test avec user_id=${userId} et recipe_id=${recipeId}`);
        
        // Vérifier si déjà existant
        const [existing] = await connection.query(
          "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?",
          [userId, recipeId]
        );
        
        if (existing.length > 0) {
          console.log("   ℹ️  Cette combinaison existe déjà dans les favoris");
        } else {
          console.log("   ℹ️  Cette combinaison peut être ajoutée aux favoris");
        }
      }
    } else {
      console.log("⚠️  Pas assez de données pour tester (besoin d'au moins 1 utilisateur et 1 recette)");
    }

    // 5. Test du serveur backend
    console.log("\n5️⃣ Test du serveur backend...");
    try {
      const response = await fetch("http://localhost:3000/api/test");
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Serveur backend accessible");
        console.log(`   Message : ${data.message}`);
      } else {
        console.log("❌ Serveur backend répond avec erreur:", response.status);
      }
    } catch (error) {
      console.log("❌ Serveur backend non accessible");
      console.log("   Assurez-vous qu'il est démarré : cd backend && npm start");
    }

    console.log("\n" + "=".repeat(50));
    console.log("\n✅ DIAGNOSTIC TERMINÉ\n");
    
    console.log("📝 PROCHAINES ÉTAPES :");
    console.log("1. Assurez-vous d'être connecté dans l'application");
    console.log("2. Ouvrez la console du navigateur (Cmd+Option+J)");
    console.log("3. Cliquez sur le bouton ❤️ d'une recette");
    console.log("4. Observez les messages dans la console");
    console.log("\nSi vous voyez une erreur, envoyez-moi le message complet !\n");

  } catch (error) {
    console.error("❌ ERREUR:", error.message);
    console.log("\nVérifiez :");
    console.log("- MySQL est démarré (MAMP, XAMPP, ou MySQL local)");
    console.log("- Les identifiants dans backend/config.js sont corrects");
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

diagnosticComplet();

