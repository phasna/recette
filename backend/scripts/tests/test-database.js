const mysql = require("mysql2");
const config = require("./config");

/**
 * Test de connexion à la base de données MySQL
 */
async function testDatabaseConnection() {
  console.log("🧪 Test de connexion à la base de données MySQL...\n");

  try {
    // Test de connexion
    console.log("1️⃣ Test de connexion...");
    console.log(`   Host: ${config.database.host}`);
    console.log(`   Port: ${config.database.port}`);
    console.log(`   User: ${config.database.user}`);
    console.log(`   Database: ${config.database.database}`);

    const connection = mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
    });

    // Test de connexion
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error("❌ Erreur de connexion:", err.message);
          reject(err);
        } else {
          console.log("✅ Connexion MySQL réussie !");
          resolve();
        }
      });
    });

    // Test de création de base de données
    console.log("\n2️⃣ Test de création de base de données...");
    await new Promise((resolve, reject) => {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${config.database.database}`,
        (err) => {
          if (err) {
            console.error("❌ Erreur création DB:", err.message);
            reject(err);
          } else {
            console.log(
              `✅ Base de données '${config.database.database}' créée ou existante`
            );
            resolve();
          }
        }
      );
    });

    // Test de sélection de base de données
    console.log("\n3️⃣ Test de sélection de base de données...");
    await new Promise((resolve, reject) => {
      connection.query(`USE ${config.database.database}`, (err) => {
        if (err) {
          console.error("❌ Erreur sélection DB:", err.message);
          reject(err);
        } else {
          console.log(
            `✅ Base de données '${config.database.database}' sélectionnée`
          );
          resolve();
        }
      });
    });

    // Test de création de table
    console.log("\n4️⃣ Test de création de table...");
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        prep_time INT,
        cook_time INT,
        servings INT,
        difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT 'Facile',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await new Promise((resolve, reject) => {
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error("❌ Erreur création table:", err.message);
          reject(err);
        } else {
          console.log("✅ Table 'recipes' créée ou existante");
          resolve();
        }
      });
    });

    // Test d'insertion
    console.log("\n5️⃣ Test d'insertion de données...");
    const testRecipe = {
      title: "Test de connexion",
      description: "Recette de test pour la connexion DB",
      ingredients: "Ingrédient test",
      instructions: "Instructions test",
      prep_time: 10,
      cook_time: 20,
      servings: 2,
      difficulty: "Facile",
    };

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO recipes SET ?",
        testRecipe,
        (err, result) => {
          if (err) {
            console.error("❌ Erreur insertion:", err.message);
            reject(err);
          } else {
            console.log(
              "✅ Données insérées avec succès (ID:",
              result.insertId,
              ")"
            );
            resolve();
          }
        }
      );
    });

    // Test de sélection
    console.log("\n6️⃣ Test de sélection de données...");
    await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM recipes", (err, results) => {
        if (err) {
          console.error("❌ Erreur sélection:", err.message);
          reject(err);
        } else {
          console.log(`✅ ${results.length} recette(s) trouvée(s)`);
          if (results.length > 0) {
            console.log(
              "   Dernière recette:",
              results[results.length - 1].title
            );
          }
          resolve();
        }
      });
    });

    // Fermer la connexion
    connection.end();

    console.log("\n🎉 Tous les tests de base de données sont passés !");
    console.log("✅ MySQL fonctionne correctement sur le port 3306");
    console.log("✅ Base de données 'recipe_app' prête");
    console.log("✅ Table 'recipes' opérationnelle");

    return true;
  } catch (error) {
    console.error(
      "\n❌ Erreur lors du test de base de données:",
      error.message
    );

    console.log("\n🔧 Solutions possibles :");
    console.log("1. Vérifiez que MySQL est démarré");
    console.log("2. Vérifiez les paramètres dans config.js");
    console.log("3. Vérifiez que le port 3306 est libre");
    console.log("4. Vérifiez les permissions utilisateur");

    return false;
  }
}

// Exécuter le test si le script est appelé directement
if (require.main === module) {
  testDatabaseConnection();
}

module.exports = testDatabaseConnection;
