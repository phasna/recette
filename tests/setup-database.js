#!/usr/bin/env node

/**
 * Script de configuration automatique de la base de données
 * Aide à configurer MySQL pour l'application de gestion des recettes
 */

const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Configuration par défaut
const DEFAULT_CONFIG = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "recipe_app",
};

/**
 * Tester différentes configurations de connexion
 */
async function testConnection(config) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err) {
        resolve({ success: false, error: err.message });
      } else {
        connection.end();
        resolve({ success: true });
      }
    });
  });
}

/**
 * Configuration interactive
 */
async function interactiveSetup() {
  console.log("🔧 Configuration de la base de données MySQL\n");

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  try {
    console.log("Veuillez entrer les informations de connexion MySQL :\n");

    const host =
      (await question(`Host (${DEFAULT_CONFIG.host}): `)) ||
      DEFAULT_CONFIG.host;
    const port =
      (await question(`Port (${DEFAULT_CONFIG.port}): `)) ||
      DEFAULT_CONFIG.port;
    const user =
      (await question(`Utilisateur (${DEFAULT_CONFIG.user}): `)) ||
      DEFAULT_CONFIG.user;
    const password = await question("Mot de passe (laissez vide si aucun): ");
    const database =
      (await question(`Base de données (${DEFAULT_CONFIG.database}): `)) ||
      DEFAULT_CONFIG.database;

    rl.close();

    const config = { host, port: parseInt(port), user, password, database };

    console.log("\n🧪 Test de connexion...");
    const result = await testConnection(config);

    if (result.success) {
      console.log("✅ Connexion réussie !");

      // Créer la base de données
      console.log("\n📦 Création de la base de données...");
      await createDatabase(config);

      // Mettre à jour la configuration
      console.log("\n⚙️ Mise à jour de la configuration...");
      await updateConfig(config);

      console.log("\n🎉 Configuration terminée avec succès !");
      console.log("✅ Votre application est prête à être utilisée");
    } else {
      console.log("❌ Échec de la connexion:", result.error);
      console.log("\n🔧 Solutions possibles :");
      console.log("1. Vérifiez que MySQL est démarré");
      console.log("2. Vérifiez le nom d'utilisateur et le mot de passe");
      console.log("3. Vérifiez que le port 3306 est libre");
      console.log("4. Consultez DATABASE_SETUP.md pour plus d'aide");
    }
  } catch (error) {
    console.error("❌ Erreur lors de la configuration:", error.message);
  }
}

/**
 * Créer la base de données et les tables
 */
async function createDatabase(config) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);

    // Créer la base de données
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${config.database}`,
      (err) => {
        if (err) {
          console.error("❌ Erreur création DB:", err.message);
          reject(err);
          return;
        }

        console.log(`✅ Base de données '${config.database}' créée`);

        // Sélectionner la base de données
        connection.query(`USE ${config.database}`, (err) => {
          if (err) {
            console.error("❌ Erreur sélection DB:", err.message);
            reject(err);
            return;
          }

          // Créer la table recipes
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

          connection.query(createTableQuery, (err) => {
            if (err) {
              console.error("❌ Erreur création table:", err.message);
              reject(err);
              return;
            }

            console.log("✅ Table 'recipes' créée");

            // Insérer des données d'exemple
            const sampleData = [
              {
                title: "Pâtes Carbonara",
                description: "Un classique italien crémeux et savoureux",
                ingredients:
                  "400g de spaghetti\n200g de pancetta\n4 œufs\n100g de parmesan",
                instructions:
                  "1. Faire cuire les pâtes\n2. Faire revenir la pancetta\n3. Mélanger les œufs et le parmesan\n4. Servir immédiatement",
                prep_time: 15,
                cook_time: 15,
                servings: 4,
                difficulty: "Moyen",
              },
            ];

            connection.query(
              "INSERT IGNORE INTO recipes SET ?",
              sampleData[0],
              (err) => {
                if (err) {
                  console.error("❌ Erreur insertion données:", err.message);
                  reject(err);
                  return;
                }

                console.log("✅ Données d'exemple insérées");
                connection.end();
                resolve();
              }
            );
          });
        });
      }
    );
  });
}

/**
 * Mettre à jour le fichier de configuration
 */
async function updateConfig(config) {
  const configPath = path.join(__dirname, "backend", "config.js");

  const configContent = `module.exports = {
  database: {
    host: "${config.host}",
    port: ${config.port},
    user: "${config.user}",
    password: "${config.password}",
    database: "${config.database}",
  },
  port: 5000,
};
`;

  try {
    fs.writeFileSync(configPath, configContent);
    console.log("✅ Configuration sauvegardée dans backend/config.js");
  } catch (error) {
    console.error("❌ Erreur sauvegarde config:", error.message);
  }
}

/**
 * Configuration automatique avec valeurs par défaut
 */
async function autoSetup() {
  console.log("🚀 Configuration automatique de la base de données\n");

  const configs = [
    { ...DEFAULT_CONFIG, password: "" },
    { ...DEFAULT_CONFIG, password: "root" },
    { ...DEFAULT_CONFIG, password: "password" },
    { ...DEFAULT_CONFIG, password: "admin" },
    { ...DEFAULT_CONFIG, user: "recipe_user", password: "recipe_password" },
  ];

  for (const config of configs) {
    console.log(`🧪 Test avec ${config.user}@${config.host}:${config.port}...`);
    const result = await testConnection(config);

    if (result.success) {
      console.log("✅ Connexion réussie !");

      try {
        await createDatabase(config);
        await updateConfig(config);

        console.log("\n🎉 Configuration automatique réussie !");
        console.log("✅ Votre application est prête à être utilisée");
        return;
      } catch (error) {
        console.error("❌ Erreur lors de la configuration:", error.message);
      }
    } else {
      console.log("❌ Échec:", result.error);
    }
  }

  console.log("\n❌ Aucune configuration automatique n'a fonctionné");
  console.log("🔧 Lancez la configuration interactive :");
  console.log("node setup-database.js --interactive");
}

// Point d'entrée
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--interactive") || args.includes("-i")) {
    await interactiveSetup();
  } else {
    await autoSetup();
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testConnection, createDatabase, updateConfig };
